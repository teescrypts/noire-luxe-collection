import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShippingRate {
  id: string;
  name: string;
  description: string;
  price: number;
  enabled: boolean;
}

export interface IPickupSettings {
  enabled: boolean;
  address: string;
  city: string;
  state: string;
  zip: string;
  instructions: string;
}

export interface IStoreInfo {
  storeName: string;
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
  supportHours: string;
}

export interface INotificationSettings {
  newOrder: boolean;
  lowStock: boolean;
  orderUpdate: boolean;
  newsletter: boolean;
}

export interface ISettings extends Document {
  storeInfo: IStoreInfo;
  shippingRates: IShippingRate[];
  pickup: IPickupSettings;
  notifications: INotificationSettings;
  freeShipping: {
    enabled: boolean;
    threshold: number;
  };
}

const ShippingRateSchema = new Schema<IShippingRate>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    enabled: { type: Boolean, default: true },
  },
  { _id: false },
);

const SettingsSchema = new Schema<ISettings>(
  {
    storeInfo: {
      storeName: { type: String, default: "Noire Luxe Collection" },
      email: { type: String, default: "hello@noireluxe.com" },
      phone: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      supportHours: { type: String, default: "Mon–Fri, 9am–6pm EST" },
    },
    shippingRates: {
      type: [ShippingRateSchema],
      default: [
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
    },
    pickup: {
      enabled: { type: Boolean, default: true },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      instructions: {
        type: String,
        default: "We will contact you to arrange a convenient pickup time.",
      },
    },
    notifications: {
      newOrder: { type: Boolean, default: true },
      lowStock: { type: Boolean, default: true },
      orderUpdate: { type: Boolean, default: false },
      newsletter: { type: Boolean, default: true },
    },
    freeShipping: {
      enabled: { type: Boolean, default: false },
      threshold: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

const Settings: Model<ISettings> =
  mongoose.models.Settings ??
  mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
