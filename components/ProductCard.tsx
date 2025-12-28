
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full group active:scale-95 transition-transform">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center text-[10px] font-bold text-gray-800 shadow-sm">
          <Star size={10} className="text-yellow-400 mr-0.5 fill-current" />
          {product.rating}
        </div>
      </Link>
      
      <div className="p-3 flex flex-col flex-1">
        <div className="mb-1 text-[10px] uppercase font-bold text-blue-500 tracking-wider">
          {product.category}
        </div>
        <Link to={`/product/${product.id}`} className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 leading-tight flex-1">
          {product.name}
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            <span className="text-[9px] text-gray-400 line-through">₹{Math.round(product.price * 1.2)}</span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200 active:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
