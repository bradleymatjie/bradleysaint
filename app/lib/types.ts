export interface CollaborationItem {
  slug: string;
  name: string;
  price: string;
  soldOut: boolean;
  imageUrl: string;
}

export interface Product {
  id: string; // Optional unique identifier (e.g., for routing/database)
  slug: string; // Optional URL-friendly slug (e.g., for dynamic routes)
  name: string; // Product name (e.g., 'CUSTOM TEE', 'CLASSIC PRINT')
  price: string; // Formatted price as string (e.g., 'R427.42')
  category: string; // Optional category (e.g., 'T-SHIRTS', 'HOODIES', 'LONG SLEEVE')
  soldOut: boolean; // Optional sold-out status (default: false)
  imageUrl: string; // Optional image URL (local or external)
  description: string; // Optional description for product details
}