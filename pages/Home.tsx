
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';
import { useApp } from '../AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useApp();
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <section className="px-4 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-100">
          <div className="relative z-10 flex flex-col justify-center h-full max-w-[70%]">
            <h2 className="text-2xl font-bold leading-tight mb-2">Summer Essentials Under ₹10!</h2>
            <p className="text-xs text-blue-100 mb-4 font-medium">Daily essentials delivered from local stores in Tambaram.</p>
            <Link 
              to="/products" 
              className="w-max bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
            >
              Shop Now <ArrowRight size={14} />
            </Link>
          </div>
          <Zap className="absolute -right-4 -bottom-4 text-white/10 w-40 h-40" />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="flex justify-around bg-white py-4 shadow-sm border-y border-gray-50">
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
            <Zap size={18} />
          </div>
          <span className="text-[9px] font-bold text-gray-600 uppercase">Fast Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 bg-green-50 text-green-600 rounded-full">
            <ShieldCheck size={18} />
          </div>
          <span className="text-[9px] font-bold text-gray-600 uppercase">Secure UPI</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-full">
            <Truck size={18} />
          </div>
          <span className="text-[9px] font-bold text-gray-600 uppercase">Local Store</span>
        </div>
      </section>

      {/* Categories Horizontal */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Categories</h3>
          <Link to="/products" className="text-xs font-bold text-blue-600">See All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {['Snacks', 'Beverages', 'Home', 'Diary', 'Stationery'].map((cat) => (
            <div key={cat} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-3 active:bg-blue-50 transition-colors">
                <img src={`https://picsum.photos/seed/${cat}/100/100`} alt={cat} className="w-full h-full object-contain rounded-lg" />
              </div>
              <span className="text-[10px] font-bold text-gray-700">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Popular Deals</h3>
          <Link to="/products" className="text-xs font-bold text-blue-600">View More</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
