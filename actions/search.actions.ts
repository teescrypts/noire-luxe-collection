"use server";

import { searchProducts } from "./product.actions";
import { searchBlogPosts } from "./blog.actions";

export interface SearchResults {
  products: any[];
  posts: any[];
  total: number;
}

export async function globalSearch(query: string): Promise<SearchResults> {
  if (!query || query.trim().length < 2) {
    return { products: [], posts: [], total: 0 };
  }

  const [productsData, posts] = await Promise.all([
    searchProducts(query.trim(), 1, 5),
    searchBlogPosts(query.trim()),
  ]);

  return {
    products: productsData.products,
    posts,
    total: productsData.total + posts.length,
  };
}
