"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SerializedProduct } from "@/types/serialized";

interface ShopContextType {
  selectedCategories: string[];
  selectedLengths: string[];
  selectedTextures: string[];
  priceRange: number[];
  sortBy: string;
  setSelectedCategories: (v: string[]) => void;
  setSelectedLengths: (v: string[]) => void;
  setSelectedTextures: (v: string[]) => void;
  setPriceRange: (v: number[]) => void;
  setSortBy: (v: string) => void;
  clearAll: () => void;
  filterProducts: (products: SerializedProduct[]) => SerializedProduct[];
}

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedTextures, setSelectedTextures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [sortBy, setSortBy] = useState("featured");

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedLengths([]);
    setSelectedTextures([]);
    setPriceRange([0, 500]);
    setSortBy("featured");
  };

  const filterProducts = (products: SerializedProduct[]) => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Length filter
    if (selectedLengths.length > 0) {
      result = result.filter((p) => selectedLengths.includes(p.length));
    }

    // Texture filter
    if (selectedTextures.length > 0) {
      result = result.filter((p) =>
        selectedTextures.some((t) =>
          p.tags.some((tag) => tag.toLowerCase().includes(t.toLowerCase())),
        ),
      );
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sort
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  };

  return (
    <ShopContext.Provider
      value={{
        selectedCategories,
        selectedLengths,
        selectedTextures,
        priceRange,
        sortBy,
        setSelectedCategories,
        setSelectedLengths,
        setSelectedTextures,
        setPriceRange,
        setSortBy,
        clearAll,
        filterProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
