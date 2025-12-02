'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { CollaborationItem } from '@/app/lib/types';

export default function Collaboration() {
  const collaborationItems: CollaborationItem[] = [
    {
      slug: 'custom-tee',
      name: 'CUSTOM TEE',
      price: 'R427.42',
      soldOut: false,
      imageUrl: '/Bradley-Saint.png',
    },
    {
      slug: 'designer-long-sleeve',
      name: 'DESIGNER LONG SLEEVE',
      price: 'R598.46',
      soldOut: false,
      imageUrl: 'https://velocityrecords.com/cdn/shop/products/shirt_front_1080x.jpg?v=1621977506',
    },
    {
      slug: 'premium-print-tee',
      name: 'PREMIUM PRINT TEE',
      price: 'R512.94',
      soldOut: false,
      imageUrl: 'https://images.unsplash.com/photo-1613480838954-10d9f4de0128?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      slug: 'classic-hoodie',
      name: 'CLASSIC HOODIE',
      price: 'R855.01',
      soldOut: false,
      imageUrl: 'https://printify.com/wp-content/uploads/2023/03/Choose-the-Right-Printing-Method-Direct-to-Garment.png',
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-black">COLLABORATION</h2>
          <Link href="/products" className="flex items-center gap-2 text-xs sm:text-sm font-bold hover:underline">
            SEE MORE <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {collaborationItems.map((item) => (
            <Link key={item.slug} href={`/products/${item.slug}`} className="group block">
              <div className={`relative overflow-hidden rounded-md border border-white/20 hover:border-white/50 transition-colors ${item.soldOut ? 'opacity-50' : ''}`}>
                <div className="aspect-square relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  {item.soldOut && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-xs sm:text-sm mb-1">{item.name}</h3>
                  <span className="text-sm sm:text-base font-bold block">{item.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}