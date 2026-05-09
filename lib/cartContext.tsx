"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SerializedProduct } from '@/types/serialized';

interface CartItem {
  product:  SerializedProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: SerializedProduct, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("noire-cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("noire-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: SerializedProduct, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => {
        const prevId = (i.product as SerializedProduct)._id;
        return prevId === product._id;
      });
      if (existing) {
        return prev.map((i) => {
          const prevId = (i.product as SerializedProduct)._id;
          return prevId === product._id
            ? { ...i, quantity: i.quantity + quantity }
            : i;
        });
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) =>
    setItems((prev) =>
      prev.filter((i) => (i.product as SerializedProduct)._id !== productId),
    );

  const updateQty = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        (i.product as SerializedProduct)._id === productId
          ? { ...i, quantity }
          : i,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
