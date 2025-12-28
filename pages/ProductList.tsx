
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const ProductList: React.FC = () => {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="flex flex-col gap-4 p-4 min-h-screen">
      <div className="flex items-center justify-between sticky top-[110px] z-40 bg-gray-50/90 backdrop-blur-md py-2 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 flex-1 mr-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-blue-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm text-gray-500">
          <Filter size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="font-medium">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
