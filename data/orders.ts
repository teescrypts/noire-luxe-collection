import { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "NLC-001",
    customer: {
      name: "Jasmine Williams",
      email: "jasmine.williams@email.com",
      phone: "+1 (555) 234-5678",
    },
    items: [
      {
        product: {
          id: "1",
          name: "Silky Straight Lace Front",
          slug: "silky-straight-lace-front",
          price: 189,
          description: "Effortlessly sleek 24-inch silky straight wig.",
          longDescription: "",
          images: [
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
          ],
          category: "Lace Front",
          tags: ["straight", "human hair"],
          inStock: true,
          stockCount: 12,
          featured: true,
          rating: 4.8,
          reviewCount: 124,
          hairType: "Human Hair",
          length: "24 inches",
          color: "Natural Black",
        },
        quantity: 1,
      },
    ],
    total: 189,
    status: "delivered",
    type: "delivery",
    shippingAddress: {
      street: "123 Maple Avenue",
      city: "Atlanta",
      state: "GA",
      zip: "30301",
    },
    createdAt: "2024-12-01",
    paymentRef: "pi_mock_001",
  },
  {
    id: "NLC-002",
    customer: {
      name: "Aisha Thompson",
      email: "aisha.thompson@email.com",
      phone: "+1 (555) 345-6789",
    },
    items: [
      {
        product: {
          id: "2",
          name: "Deep Wave Full Lace",
          slug: "deep-wave-full-lace",
          price: 265,
          description:
            "Stunning deep wave pattern with full lace construction.",
          longDescription: "",
          images: [
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
          ],
          category: "Full Lace",
          tags: ["wavy", "human hair"],
          inStock: true,
          stockCount: 8,
          featured: true,
          rating: 4.9,
          reviewCount: 89,
          hairType: "Human Hair",
          length: "22 inches",
          color: "Natural Black",
        },
        quantity: 1,
      },
      {
        product: {
          id: "6",
          name: "Short Bob Lace Front",
          slug: "short-bob-lace-front",
          price: 155,
          description: "Chic and sleek short bob with lace front.",
          longDescription: "",
          images: [
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
          ],
          category: "Lace Front",
          tags: ["straight", "bob"],
          inStock: true,
          stockCount: 20,
          featured: false,
          rating: 4.5,
          reviewCount: 38,
          hairType: "Human Hair",
          length: "12 inches",
          color: "Natural Black",
        },
        quantity: 1,
      },
    ],
    total: 420,
    status: "shipped",
    type: "delivery",
    shippingAddress: {
      street: "456 Oak Street",
      city: "Houston",
      state: "TX",
      zip: "77001",
    },
    createdAt: "2024-12-08",
    paymentRef: "pi_mock_002",
  },
  {
    id: "NLC-003",
    customer: {
      name: "Brianna Carter",
      email: "brianna.carter@email.com",
      phone: "+1 (555) 456-7890",
    },
    items: [
      {
        product: {
          id: "3",
          name: "Body Wave HD Lace",
          slug: "body-wave-hd-lace",
          price: 225,
          description: "Gorgeous body wave with invisible HD lace.",
          longDescription: "",
          images: [
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
          ],
          category: "HD Lace",
          tags: ["wavy", "human hair"],
          inStock: true,
          stockCount: 15,
          featured: true,
          rating: 4.7,
          reviewCount: 203,
          hairType: "Human Hair",
          length: "20 inches",
          color: "Natural Black",
        },
        quantity: 2,
      },
    ],
    total: 450,
    status: "confirmed",
    type: "pickup",
    createdAt: "2024-12-10",
    paymentRef: "pi_mock_003",
  },
  {
    id: "NLC-004",
    customer: {
      name: "Destiny Monroe",
      email: "destiny.monroe@email.com",
      phone: "+1 (555) 567-8901",
    },
    items: [
      {
        product: {
          id: "4",
          name: "Kinky Curly Closure Wig",
          slug: "kinky-curly-closure-wig",
          price: 175,
          description: "Natural kinky curly texture with 4x4 lace closure.",
          longDescription: "",
          images: [
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
          ],
          category: "Closure",
          tags: ["curly", "human hair"],
          inStock: true,
          stockCount: 6,
          featured: false,
          rating: 4.6,
          reviewCount: 67,
          hairType: "Human Hair",
          length: "18 inches",
          color: "Natural Black",
        },
        quantity: 1,
      },
    ],
    total: 175,
    status: "pending",
    type: "delivery",
    shippingAddress: {
      street: "789 Pine Road",
      city: "Chicago",
      state: "IL",
      zip: "60601",
    },
    createdAt: "2024-12-11",
    paymentRef: "pi_mock_004",
  },
];

export const getOrderById = (id: string) => orders.find((o) => o.id === id);

export const getOrdersByStatus = (status: Order["status"]) =>
  orders.filter((o) => o.status === status);

export const orderStats = {
  total: orders.length,
  pending: orders.filter((o) => o.status === "pending").length,
  confirmed: orders.filter((o) => o.status === "confirmed").length,
  shipped: orders.filter((o) => o.status === "shipped").length,
  delivered: orders.filter((o) => o.status === "delivered").length,
  revenue: orders.reduce((sum, o) => sum + o.total, 0),
};
