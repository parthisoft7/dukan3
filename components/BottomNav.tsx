
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ClipboardList, MessageCircle } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/' },
    { icon: <Grid size={22} />, label: 'Products', path: '/products' },
    { icon: <ClipboardList size={22} />, label: 'Orders', path: '/orders' },
    { icon: <MessageCircle size={22} />, label: 'Support', path: '/support' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-3 px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.label}
            to={item.path} 
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
          >
            {item.icon}
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
