"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";
import { SerializedProduct } from "@/types/serialized";
import { sendLowStockAlertEmail } from "@/actions/email.actions";
import { validateProduct } from "@/lib/validation";

// ── Helpers ───────────────────────────────────────────────

async function requireAdmin() {
  return getCurrentUser().then((user) => {
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    return user;
  });
}

function serializeProduct(product: any) {
  return JSON.parse(JSON.stringify(product));
}

// ── Public actions ────────────────────────────────────────

export async function getProducts(category?: string, page = 1, limit = 9) {
  await connectDB();

  const query: Record<string, any> =
    category && category !== "All" ? { category } : {};

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments(query),
  ]);

  return {
    products: serializeProduct(products),
    total,
    page,
    totalPages: Math.ceil(total / limit),
    limit,
  };
}

export async function getFeaturedProducts(): Promise<SerializedProduct[]> {
  await connectDB();
  const products = await Product.find({ featured: true, inStock: true })
    .limit(6)
    .lean();
  return serializeProduct(products);
}

export async function getProductBySlug(
  slug: string,
): Promise<SerializedProduct | null> {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return null;
  return serializeProduct(product);
}

export async function getProductById(id: string) {
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) return null;
  return serializeProduct(product);
}

export async function searchProducts(query: string, page = 1, limit = 9) {
  await connectDB();

  const filter = {
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { tags: { $in: [new RegExp(query, "i")] } },
    ],
  };

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products: serializeProduct(products),
    total,
    page,
    totalPages: Math.ceil(total / limit),
    limit,
  };
}

// ── Admin actions ─────────────────────────────────────────

export async function createProduct(data: {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  hairType: string;
  length: string;
  color: string;
  bundleType?: "single" | "pack";
  bundleLengths?: { length: string; quantity: number }[];
}) {
  await requireAdmin();

  const { valid, errors } = validateProduct(data);
  if (!valid) throw new Error(errors[0].message);

  await connectDB();

  const slug = slugify(data.name, { lower: true, strict: true });

  // Make slug unique if needed
  const existing = await Product.findOne({ slug });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const product = await Product.create({
    ...data,
    slug: finalSlug,
  });

  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath("/dashboard/products");

  return serializeProduct(product);
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    price: number;
    originalPrice: number;
    description: string;
    longDescription: string;
    images: string[];
    category: string;
    tags: string[];
    inStock: boolean;
    stockCount: number;
    featured: boolean;
    hairType: string;
    length: string;
    color: string;
    bundleType: "single" | "pack";
    bundleLengths: { length: string; quantity: number }[];
  }>,
) {
  await requireAdmin();

  if (data.name || data.price || data.stockCount) {
    const { valid, errors } = validateProduct({
      name: data.name ?? "",
      price: data.price ?? 0,
      stockCount: data.stockCount ?? 0,
      description: data.description ?? "",
      category: data.category ?? "",
      length: data.length ?? "",
    });
    if (!valid) throw new Error(errors[0].message);
  }

  await connectDB();

  // Regenerate slug if name changed
  if (data.name) {
    const slug = slugify(data.name, { lower: true, strict: true });
    const existing = await Product.findOne({ slug, _id: { $ne: id } });
    (data as any).slug = existing ? `${slug}-${Date.now()}` : slug;
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true },
  ).lean();

  if (!product) throw new Error("Product not found");

  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath(`/products/${(product as any).slug}`);
  revalidatePath("/dashboard/products");

  return serializeProduct(product);
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await connectDB();

  const product = await Product.findByIdAndDelete(id).lean();
  if (!product) throw new Error("Product not found");

  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath("/dashboard/products");

  return { success: true };
}

export async function updateProductStock(id: string, stockCount: number) {
  await requireAdmin();
  await connectDB();

  const product = (await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        stockCount,
        inStock: stockCount > 0,
      },
    },
    { new: true },
  ).lean()) as any;

  if (!product) throw new Error("Product not found");

  // Send low stock alert if threshold reached
  if (stockCount <= 2 && stockCount > 0) {
    try {
      await sendLowStockAlertEmail({
        productName: product.name,
        stockCount,
        productSlug: product.slug,
      });
    } catch (error) {
      console.error("Low stock email error:", error);
    }
  }

  revalidatePath("/shop");
  revalidatePath("/dashboard/products");

  return serializeProduct(product);
}

export async function getLowStockProducts(threshold = 2) {
  await requireAdmin();
  await connectDB();

  const products = await Product.find({ stockCount: { $lte: threshold } })
    .sort({ stockCount: 1 })
    .lean();

  return serializeProduct(products);
}
