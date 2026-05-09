"use server";

import stripe from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Product from "@/models/Product";

export async function createPaymentIntent(data: {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingCost: number;
  customerEmail: string;
}) {
  await connectDB();

  // Fetch products and calculate total server-side
  // Never trust client-side prices
  let subtotal = 0;
  const lineItems = [];

  for (const item of data.items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`Product not found: ${item.productId}`);
    if (!product.inStock || product.stockCount < item.quantity) {
      throw new Error(
        `${product.name} is out of stock or has insufficient quantity`,
      );
    }

    subtotal += product.price * item.quantity;
    lineItems.push({
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.images[0] ?? "",
    });
  }

  const total = subtotal + data.shippingCost;

  // Stripe expects amount in cents
  const amountInCents = Math.round(total * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    metadata: {
      customerEmail: data.customerEmail,
      itemCount: data.items.length.toString(),
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret!,
    paymentIntentId: paymentIntent.id,
    total,
    subtotal,
    lineItems,
  };
}

export async function getPaymentIntent(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return {
    id: paymentIntent.id,
    status: paymentIntent.status,
    amount: paymentIntent.amount / 100,
  };
}
