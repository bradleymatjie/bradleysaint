import { Product } from "./types";
import { mockProducts } from "./products"
// Helper to fetch by ID
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((p) => p.id === id);
};