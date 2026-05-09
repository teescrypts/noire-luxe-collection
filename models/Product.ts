import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBundleLength {
  length: string;
  quantity: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
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
  rating: number;
  reviewCount: number;
  hairType: string;
  length: string;
  color: string;
  bundleType?: "single" | "pack";
  bundleLengths?: IBundleLength[];
  createdAt: Date;
  updatedAt: Date;
}

const BundleLengthSchema = new Schema<IBundleLength>(
  {
    length: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    tags: [{ type: String }],
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, required: true, min: 0 },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    hairType: { type: String, default: "Human Hair" },
    length: { type: String, required: true },
    color: { type: String, default: "Natural Black" },
    bundleType: { type: String, enum: ["single", "pack"] },
    bundleLengths: [BundleLengthSchema],
  },
  { timestamps: true },
);

const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
