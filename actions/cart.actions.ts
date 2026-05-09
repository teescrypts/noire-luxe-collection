"use server";

import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Product from "@/models/Product";

// Cart lives in localStorage on the client for guests
// For logged-in users we validate cart items against real DB
// before checkout to ensure prices and stock are accurate

export async function validateCart(
  items: {
    productId: string;
    quantity: number;
  }[],
) {
  await connectDB();

  const validated = [];
  const errors: string[] = [];

  for (const item of items) {
    const product = (await Product.findById(item.productId).lean()) as any;

    if (!product) {
      errors.push(`Product no longer available`);
      continue;
    }

    if (!product.inStock || product.stockCount === 0) {
      errors.push(`${product.name} is out of stock`);
      continue;
    }

    if (product.stockCount < item.quantity) {
      errors.push(
        `Only ${product.stockCount} units of ${product.name} available`,
      );
      validated.push({
        productId: product._id.toString(),
        quantity: product.stockCount,
        product: JSON.parse(JSON.stringify(product)),
      });
      continue;
    }

    validated.push({
      productId: product._id.toString(),
      quantity: item.quantity,
      product: JSON.parse(JSON.stringify(product)),
    });
  }

  return { validated, errors };
}

export async function getCartProducts(productIds: string[]) {
  await connectDB();

  const products = await Product.find({ _id: { $in: productIds } }).lean();

  return JSON.parse(JSON.stringify(products));
}
