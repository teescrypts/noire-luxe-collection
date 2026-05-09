import mongoose from "mongoose";
import slugify from "slugify";

const MONGODB_URI = "mongodb://localhost:27017/noire-luxe";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    price: Number,
    description: String,
    longDescription: String,
    images: [String],
    category: String,
    tags: [String],
    inStock: Boolean,
    stockCount: Number,
    featured: Boolean,
    rating: Number,
    reviewCount: Number,
    hairType: String,
    length: String,
    color: String,
    bundleType: String,
    bundleLengths: [{ length: String, quantity: Number }],
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product ?? mongoose.model("Product", ProductSchema);

const productsData = [
  // ── BUNDLES ───────────────────────────────────────────
  {
    name: 'Straight Luxe Bundles 20"',
    price: 200,
    description:
      'Three bundle pack of silky Straight Luxe human hair — 20" x 3.',
    longDescription:
      "This listing is for a full 3-bundle pack of our premium Straight Luxe human hair, each bundle measuring 20 inches. The sleek straight texture is smooth, shiny and incredibly versatile. Can be washed, styled and treated just like your natural hair.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    ],
    category: "Bundles",
    tags: ["bundles", "straight luxe", "human hair"],
    inStock: true,
    stockCount: 2,
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    hairType: "Human Hair",
    length: '20"',
    color: "Natural Black",
    bundleType: "pack",
    bundleLengths: [
      { length: '20"', quantity: 1 },
      { length: '20"', quantity: 1 },
      { length: '20"', quantity: 1 },
    ],
  },
  {
    name: 'Straight Luxe Bundles 22"',
    price: 355,
    description:
      'Three bundle pack of silky Straight Luxe human hair — 22" x 3.',
    longDescription:
      "A full 3-bundle pack of our premium Straight Luxe human hair, each bundle measuring 22 inches. This length gives you that effortlessly glamorous look — long enough to style but easy to manage.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    ],
    category: "Bundles",
    tags: ["bundles", "straight luxe", "human hair"],
    inStock: true,
    stockCount: 1,
    featured: true,
    rating: 4.8,
    reviewCount: 54,
    hairType: "Human Hair",
    length: '22"',
    color: "Natural Black",
    bundleType: "pack",
    bundleLengths: [
      { length: '22"', quantity: 1 },
      { length: '22"', quantity: 1 },
      { length: '22"', quantity: 1 },
    ],
  },

  // ── CLOSURE WIGS ──────────────────────────────────────
  {
    name: 'Luxe Wave Closure Wig 20"',
    price: 320,
    description:
      'Gorgeous 20" Luxe Wave closure wig with a natural 4x4 lace closure.',
    longDescription:
      "Our 20-inch Luxe Wave Closure Wig features a 4x4 lace closure for a natural-looking part at the crown. The luxe wave pattern adds beautiful volume and movement. Pre-plucked hairline with baby hairs for the most realistic finish.",
    images: ["https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800"],
    category: "Closure Wigs",
    tags: ["closure wig", "luxe wave", "human hair"],
    inStock: true,
    stockCount: 1,
    featured: false,
    rating: 4.8,
    reviewCount: 29,
    hairType: "Human Hair",
    length: '20"',
    color: "Natural Black",
  },
  {
    name: 'Luxe Wave Closure Wig 22"',
    price: 360,
    description:
      'Stunning 22" Luxe Wave closure wig with a natural 4x4 lace closure.',
    longDescription:
      "Our 22-inch Luxe Wave Closure Wig is one of our most popular styles. The 4x4 lace closure sits perfectly at the crown. The luxe wave pattern flows beautifully and holds its pattern wash after wash.",
    images: ["https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800"],
    category: "Closure Wigs",
    tags: ["closure wig", "luxe wave", "human hair"],
    inStock: true,
    stockCount: 1,
    featured: true,
    rating: 4.7,
    reviewCount: 43,
    hairType: "Human Hair",
    length: '22"',
    color: "Natural Black",
  },
  {
    name: 'Luxe Wave Closure Wig 24"',
    price: 400,
    description:
      'Luxurious 24" Luxe Wave closure wig for a dramatic, full look.',
    longDescription:
      "Our 24-inch Luxe Wave Closure Wig is for the woman who loves length and volume. The extra length makes the luxe wave pattern even more dramatic and eye-catching. Full, thick bundles from root to tip.",
    images: ["https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800"],
    category: "Closure Wigs",
    tags: ["closure wig", "luxe wave", "human hair"],
    inStock: true,
    stockCount: 1,
    featured: false,
    rating: 4.9,
    reviewCount: 18,
    hairType: "Human Hair",
    length: '24"',
    color: "Natural Black",
  },

  // ── FRONTAL WIGS ──────────────────────────────────────
  {
    name: 'Luxe Wave Frontal Wig 20"',
    price: 300,
    description:
      'Beautiful 20" Luxe Wave frontal wig with ear to ear 13x4 lace.',
    longDescription:
      "Our 20-inch Luxe Wave Frontal Wig features a 13x4 lace frontal for a completely natural hairline from ear to ear. The luxe wave texture is full of life and bounce. Pre-plucked with baby hairs for an undetectable install.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    ],
    category: "Frontal Wigs",
    tags: ["frontal wig", "luxe wave", "human hair"],
    inStock: true,
    stockCount: 2,
    featured: true,
    rating: 4.9,
    reviewCount: 67,
    hairType: "Human Hair",
    length: '20"',
    color: "Natural Black",
  },
  {
    name: 'Luxe Wave Frontal Wig 22"',
    price: 360,
    description:
      'Stunning 22" Luxe Wave frontal wig with ear to ear 13x4 lace.',
    longDescription:
      "Our 22-inch Luxe Wave Frontal Wig is one of our bestsellers. The 13x4 lace frontal gives you maximum styling freedom. The luxe wave texture is lush, full and absolutely gorgeous.",
    images: ["https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800"],
    category: "Frontal Wigs",
    tags: ["frontal wig", "luxe wave", "human hair"],
    inStock: true,
    stockCount: 1,
    featured: true,
    rating: 4.9,
    reviewCount: 89,
    hairType: "Human Hair",
    length: '22"',
    color: "Natural Black",
  },
];

async function seedProducts() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing products
  await Product.deleteMany({});
  console.log("✓ Cleared existing products");

  const withSlugs = productsData.map((p) => ({
    ...p,
    slug: slugify(p.name, { lower: true, strict: true }),
  }));

  await Product.insertMany(withSlugs);
  console.log(`✓ ${withSlugs.length} products seeded successfully`);

  console.log("\nInventory summary:");
  console.log("  Bundles:       2 products");
  console.log("  Closure Wigs:  3 products");
  console.log("  Frontal Wigs:  2 products");
  console.log("  Total:         7 products");

  await mongoose.disconnect();
}

seedProducts().catch(console.error);
