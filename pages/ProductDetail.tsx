
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Star, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useApp } from '../AppContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id);
  
  if (!product) return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <p>Product not found</p>
      <button onClick={() => navigate('/')} className="text-blue-600 mt-2 font-bold underline">Go Home</button>
    </div>
  );

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col bg-white min-h-screen animate-in fade-in duration-300">
      {/* Product Image Header */}
      <div className="relative aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-md active:scale-90 transition-transform"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-md active:scale-90 transition-transform">
            <Share2 size={24} className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-6 -mt-6 bg-white rounded-t-[32px] relative shadow-[-4px_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-1 mb-2">
          <div className="bg-blue-100 text-blue-700 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {product.category}
          </div>
          <div className="flex items-center bg-yellow-50 text-yellow-700 text-[10px] px-3 py-1 rounded-full font-bold">
            <Star size={10} className="fill-current mr-1" /> {product.rating}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
        
        <div className="flex items-end gap-2 mb-6">
          <span className="text-3xl font-black text-blue-600">₹{product.price}</span>
          <span className="text-lg text-gray-400 line-through mb-1">₹{Math.round(product.price * 1.2)}</span>
          <span className="text-green-600 text-xs font-bold mb-1.5 ml-1">20% OFF</span>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-2">About Product</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.description} High-quality selection directly from local shops in Tambaram. Guaranteed freshness and fast delivery to your doorstep.
          </p>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl mb-8">
          <span className="font-bold text-gray-700">Quantity</span>
          <div className="flex items-center gap-4 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Minus size={20} />
            </button>
            <span className="font-bold w-6 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="p-1.5 text-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => addToCart(product, quantity)}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 font-bold py-3.5 rounded-2xl active:bg-blue-50 transition-colors"
        >
          <ShoppingCart size={20} /> Add to Cart
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-200 active:bg-blue-700 transition-transform active:scale-[0.98]"
        >
          Buy Now <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
