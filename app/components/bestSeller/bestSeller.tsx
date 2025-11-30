"use client"
import { useState } from 'react';

export default function BestSeller() {
  const [currentFilter, setCurrentFilter] = useState('ALL');

  const bestSellers = [
    { name: 'CLASSIC PRINT', price: 'R427.63', category: 'T-SHIRTS' },
    { name: 'HOODIE', price: 'R855.43', category: 'HOODIES' },
    { name: 'GRAPHIC TEE', price: 'R478.96', category: 'T-SHIRTS' },
    { name: 'PREMIUM TEE', price: 'R564.52', category: 'T-SHIRTS' },
    { name: 'CUSTOM PRINT', price: 'R461.85', category: 'T-SHIRTS' },
    { name: 'OVERSIZED TEE', price: 'R513.19', category: 'T-SHIRTS' },
    { name: 'STREETWEAR', price: 'R598.75', category: 'T-SHIRTS' },
    { name: 'LONG SLEEVE', price: 'R684.31', category: 'LONG SLEEVE' }
  ];

  const filteredItems = bestSellers.filter(
    (item) => currentFilter === 'ALL' || item.category === currentFilter
  );

  const getButtonClasses = (filter: string) =>
    `px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold ${
      currentFilter === filter
        ? 'bg-black text-white'
        : 'bg-white text-black border border-black'
    }`;

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-black">BEST SELLERS</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentFilter('ALL')}
              className={getButtonClasses('ALL')}
            >
              ALL
            </button>
            <button
              onClick={() => setCurrentFilter('T-SHIRTS')}
              className={getButtonClasses('T-SHIRTS')}
            >
              T-SHIRTS
            </button>
            <button
              onClick={() => setCurrentFilter('HOODIES')}
              className={getButtonClasses('HOODIES')}
            >
              HOODIES
            </button>
            <button
              onClick={() => setCurrentFilter('LONG SLEEVE')}
              className={`hidden sm:block ${getButtonClasses('LONG SLEEVE')}`}
            >
              LONG SLEEVE
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredItems.map((item, index) => (
            <div key={index} className="group cursor-pointer bg-white p-3 sm:p-4">
              <div className="aspect-square bg-gray-100 mb-2 sm:mb-3 overflow-hidden">
                <div className="w-full h-full bg-black flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <div className="text-white text-2xl sm:text-3xl lg:text-4xl">👕</div>
                </div>
              </div>
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-xs sm:text-sm">{item.name}</h3>
                <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}