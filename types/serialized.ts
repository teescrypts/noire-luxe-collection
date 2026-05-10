// These represent MongoDB documents after serialization
// _id is a string, dates are ISO strings

export interface SerializedBundleLength {
  length: string;
  quantity: number;
}

export interface SerializedProduct {
  _id: string;
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
  bundleLengths?: SerializedBundleLength[];
  createdAt: string;
  updatedAt: string;
}

export interface SerializedOrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  length: string;
}

export interface SerializedOrder {
  _id: string;
  orderNumber: string;
  customer: {
    userId?: string;
    name: string;
    email: string;
    phone: string;
  };
  items: SerializedOrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  type: "delivery" | "pickup";
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  shippingMethod?: string;
  paymentRef: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SerializedBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  revenue: number;
}

export interface SerializedStoreInfo {
  storeName: string;
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
  supportHours: string;
}

export interface SerializedSettings {
  storeInfo: SerializedStoreInfo;
  shippingRates: {
    id: string;
    name: string;
    description: string;
    price: number;
    enabled: boolean;
  }[];
  pickup: {
    enabled: boolean;
    address: string;
    city: string;
    state: string;
    zip: string;
    instructions: string;
  };
  freeShipping: {
    enabled: boolean;
    threshold: number;
  };
}
