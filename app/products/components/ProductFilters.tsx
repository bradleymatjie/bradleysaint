'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/app/lib/types';
import ProductCard from './ProductCard';
import { supabase } from '@/lib/supabaseClient';

interface ProductFiltersProps {
  onProductsChange?: (products: Product[]) => void;
}

export default function ProductFilters({ onProductsChange }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['all']);
  
  const categoryLabels: Record<string, string> = {
    all: 'All',
    't-shirts': 'T-Shirts',
    'hoodies': 'Hoodies',
    'long sleeve': 'Long Sleeve',
  };

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('thevillageproducts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
        } else {
          setProducts(data || []);
          
          // Extract unique categories from products
          const uniqueCategories = ['all', ...new Set(
            data
              ?.map(p => p.category?.toLowerCase())
              .filter(Boolean) as string[]
          )];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error('Error:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p: Product) => 
        p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  // Notify parent when filtered products change
  useEffect(() => {
    if (onProductsChange) {
      onProductsChange(filteredProducts);
    }
  }, [filteredProducts, onProductsChange]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {['All', 'T-Shirts', 'Hoodies', 'Long Sleeve'].map((label) => (
            <div
              key={label}
              className="px-4 py-2 text-sm font-medium rounded-full bg-gray-800 animate-pulse"
            >
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-gray-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-white text-black'
                : 'text-white hover:text-gray-300'
            }`}
          >
            {categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-2">No products found</p>
          <p className="text-gray-500 text-sm">
            {selectedCategory === 'all' 
              ? 'Check back soon for new drops' 
              : `No products in ${categoryLabels[selectedCategory] || selectedCategory} category`}
          </p>
        </div>
      )}
    </div>
  );
}