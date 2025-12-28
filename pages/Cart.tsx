
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';
import { useApp } from '../AppContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, totalAmount } = useApp();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center animate-in fade-in duration-500">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <ShoppingBag size={64} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-[250px]">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/products" 
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-100 active:scale-95 transition-transform"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300 pb-28">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <span className="text-gray-400 text-sm font-medium">{cart.length} items</span>
      </div>

      <div className="flex flex-col gap-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-50 transition-all">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col flex-1 py-0.5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800 text-sm leading-tight pr-2">{item.name}</h3>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-blue-600 font-bold mb-auto">₹{item.price}</p>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400">
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-blue-600">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-gray-900 font-black text-sm">₹{item.price * item.quantity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offers / Coupons */}
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 active:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 text-orange-600 p-2 rounded-xl">
            <ShoppingBag size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">Coupons</p>
            <p className="text-[10px] text-gray-400">Apply to get more discount</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </div>

      {/* Bill Summary */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Bill Summary</h3>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Item Total</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Delivery Fee</span>
            <span className="text-green-600 font-bold uppercase text-[10px] bg-green-50 px-2 py-0.5 rounded-full">Free</span>
          </div>
          <div className="border-t border-gray-100 my-2 pt-4 flex justify-between">
            <span className="font-bold text-gray-900">Grand Total</span>
            <span className="font-black text-blue-600 text-xl">₹{totalAmount}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-[74px] left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40">
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-blue-200 active:scale-[0.98] transition-all"
        >
          Checkout <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
