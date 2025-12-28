
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, MapPin } from 'lucide-react';
import { STORE_CONFIG } from '../constants';
import { useApp } from '../AppContext';

const Header: React.FC = () => {
  const { cart } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <Link to="/" className="flex flex-col">
          <span className="text-xl font-bold text-blue-600 tracking-tight">{STORE_CONFIG.name}</span>
          <div className="flex items-center text-[10px] text-gray-500">
            <MapPin size={10} className="mr-1" />
            {STORE_CONFIG.location}
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-gray-700">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search items..." 
          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </header>
  );
};

export default Header;
