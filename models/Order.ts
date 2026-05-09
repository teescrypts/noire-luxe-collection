import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
  length: string;
}

export interface IShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  customer: {
    userId?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
  };
  items: IOrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  type: "delivery" | "pickup";
  shippingAddress?: IShippingAddress;
  shippingMethod?: string;
  paymentRef: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
    length: { type: String },
  },
  { _id: false },
);

const ShippingAddressSchema = new Schema<IShippingAddress>(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["delivery", "pickup"],
      required: true,
    },
    shippingAddress: ShippingAddressSchema,
    shippingMethod: { type: String },
    paymentRef: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true },
);

// Auto generate order number
// OrderSchema.pre("save", async function () {
//   if (this.isNew) {
//     const count = await mongoose.models.Order.countDocuments();
//     this.orderNumber = `NLC-${String(count + 1).padStart(3, "0")}`;
//   }
// });

const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
