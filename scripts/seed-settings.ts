import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/noire-luxe";

const SettingsSchema = new mongoose.Schema(
  {
    storeInfo: {
      storeName: String,
      email: String,
      phone: String,
      instagram: String,
      facebook: String,
      supportHours: String,
    },
    shippingRates: [
      {
        id: String,
        name: String,
        description: String,
        price: Number,
        enabled: Boolean,
      },
    ],
    pickup: {
      enabled: Boolean,
      address: String,
      city: String,
      state: String,
      zip: String,
      instructions: String,
    },
    notifications: {
      newOrder: Boolean,
      lowStock: Boolean,
      orderUpdate: Boolean,
      newsletter: Boolean,
    },
    freeShipping: {
      enabled: Boolean,
      threshold: Number,
    },
  },
  { timestamps: true },
);

const Settings =
  mongoose.models.Settings ?? mongoose.model("Settings", SettingsSchema);

async function seedSettings() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const existing = await Settings.findOne();
  if (existing) {
    console.log("Settings already exist — skipping seed");
    await mongoose.disconnect();
    return;
  }

  await Settings.create({
    storeInfo: {
      storeName: "Noire Luxe Collection",
      email: "hello@noireluxe.com",
      phone: "+1 (555) 000-0000",
      instagram: "https://instagram.com/noireluxe",
      facebook: "https://facebook.com/noireluxe",
      supportHours: "Mon–Fri, 9am–6pm EST",
    },
    shippingRates: [
      {
        id: "standard",
        name: "Standard Shipping",
        description: "5–7 business days",
        price: 12,
        enabled: true,
      },
      {
        id: "express",
        name: "Express Shipping",
        description: "2–3 business days",
        price: 25,
        enabled: true,
      },
      {
        id: "overnight",
        name: "Overnight Shipping",
        description: "Next business day",
        price: 45,
        enabled: true,
      },
    ],
    pickup: {
      enabled: true,
      address: "",
      city: "",
      state: "",
      zip: "",
      instructions:
        "We will contact you to arrange a convenient pickup time. Orders are typically ready within 1–2 business days.",
    },
    notifications: {
      newOrder: true,
      lowStock: true,
      orderUpdate: false,
      newsletter: true,
    },
    freeShipping: {
      enabled: false,
      threshold: 0,
    },
  });

  console.log("✓ Default settings seeded successfully");
  await mongoose.disconnect();
}

seedSettings().catch(console.error);
