"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";
import { OrderStats, SerializedOrder } from "@/types/serialized";
import { sendShippingUpdateEmail } from "@/actions/email.actions";

function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  return user;
}

// ── Customer actions ──────────────────────────────────────

export async function createOrder(data: {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    productId: string;
    quantity: number;
  }[];
  type: "delivery" | "pickup";
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  shippingMethod?: string;
  shippingCost: number;
  paymentRef: string;
}) {
  await connectDB();

  // Fetch products and validate stock
  const orderItems = [];
  let subtotal = 0;

  for (const item of data.items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`Product not found: ${item.productId}`);
    if (product.stockCount < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.images[0] ?? "",
      length: product.length,
    });

    subtotal += product.price * item.quantity;

    // Reduce stock
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stockCount: -item.quantity },
      $set: { inStock: product.stockCount - item.quantity > 0 },
    });
  }

  const total = subtotal + data.shippingCost;

  // Generate order number directly here
  const count = await Order.countDocuments();
  const orderNumber = `NLC-${String(count + 1).padStart(3, "0")}`;

  const order = await Order.create({
    orderNumber,
    customer: data.customer,
    items: orderItems,
    subtotal,
    shippingCost: data.shippingCost,
    total,
    status: "pending",
    type: data.type,
    shippingAddress: data.shippingAddress,
    shippingMethod: data.shippingMethod,
    paymentRef: data.paymentRef,
    paymentStatus: "pending",
  });

  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard");

  return serialize(order);
}

export async function getOrderByNumber(orderNumber: string) {
  await connectDB();
  const order = await Order.findOne({ orderNumber }).lean();
  if (!order) return null;
  return serialize(order);
}

export async function getOrdersByEmail(email: string) {
  await connectDB();
  const orders = await Order.find({ "customer.email": email.toLowerCase() })
    .sort({ createdAt: -1 })
    .lean();
  return serialize(orders);
}

// ── Admin actions ─────────────────────────────────────────

export async function getAllOrders(
  status?: string,
  page     = 1,
  limit    = 10
) {
  await requireAdmin();
  await connectDB();

  const query: Record<string, any> = {};
  if (status && status !== 'all') query.status = status;

  const [orders, total] = await Promise.all([
    Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Order.countDocuments(query),
  ]);

  return {
    orders:     serialize(orders),
    total,
    page,
    totalPages: Math.ceil(total / limit),
    limit,
  };
}

export async function updateOrderStatus(
  id: string,
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
) {
  await requireAdmin();
  await connectDB();

  const order = (await Order.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true },
  ).lean()) as any;

  if (!order) throw new Error("Order not found");

  // Send email for relevant status changes
  const emailStatuses = ["confirmed", "shipped", "delivered", "cancelled"];
  if (emailStatuses.includes(status)) {
    try {
      await sendShippingUpdateEmail({
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        orderNumber: order.orderNumber,
        status,
      });
    } catch (emailError) {
      console.error("Failed to send status update email:", emailError);
    }
  }

  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard");

  return serialize(order);
}

export async function updatePaymentStatus(
  id: string,
  paymentStatus: "pending" | "paid" | "failed" | "refunded",
  paymentRef?: string,
) {
  await requireAdmin();
  await connectDB();

  const updateData: any = { paymentStatus };
  if (paymentRef) updateData.paymentRef = paymentRef;

  const order = await Order.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true },
  ).lean();

  if (!order) throw new Error("Order not found");

  revalidatePath("/dashboard/orders");

  return serialize(order);
}

export async function getOrderStats(): Promise<OrderStats> {
  await requireAdmin();
  await connectDB();

  const [
    total,
    pending,
    confirmed,
    shipped,
    delivered,
    cancelled,
    revenueResult,
  ] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ status: "pending" }),
    Order.countDocuments({ status: "confirmed" }),
    Order.countDocuments({ status: "shipped" }),
    Order.countDocuments({ status: "delivered" }),
    Order.countDocuments({ status: "cancelled" }),
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
  ]);

  return {
    total,
    pending,
    confirmed,
    shipped,
    delivered,
    cancelled,
    revenue: revenueResult[0]?.total ?? 0,
  };
}

export async function deleteOrder(id: string) {
  await requireAdmin();
  await connectDB();

  const order = await Order.findByIdAndDelete(id).lean();
  if (!order) throw new Error("Order not found");

  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard");

  return { success: true };
}
