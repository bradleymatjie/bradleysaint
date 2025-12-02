// components/ProductCard.tsx
// Reusable ProductCard component for displaying products in grids (e.g., catalog, best sellers, collaboration).
// Matches the site's minimalist black/white aesthetic. Uses Next.js Image for optimization.
// Assumes Product interface from lib/products.ts (with imageUrl, slug, etc.).

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/lib/types';

interface ProductCardProps {
  product: Product;
  className?: string; // Optional for custom wrapping
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className={`block group ${className}`}>
      <div className="relative overflow-hidden rounded-md border border-white/20 hover:border-white/50 transition-all bg-white/10">
        <div className="aspect-square relative">
          <Image
            src={product.imageUrl || '/placeholder-product.jpg'} // Fallback to a local placeholder if no image
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
          {product.soldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-sm uppercase tracking-wide">Sold Out</span>
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4 space-y-2">
          <h3 className="font-bold text-white text-xs sm:text-sm leading-tight">{product.name}</h3>
          {product.category && (
            <p className="text-gray-400 text-xs uppercase tracking-wide">{product.category}</p>
          )}
          <p className="text-white font-bold text-sm sm:text-base">{product.price}</p>
        </div>
      </div>
    </Link>
  );
}