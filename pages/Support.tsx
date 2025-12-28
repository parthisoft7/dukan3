
import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, Instagram, Facebook, HelpCircle } from 'lucide-react';
import { STORE_CONFIG } from '../constants';

const Support: React.FC = () => {
  const handleWhatsApp = () => {
    const text = `Hi ${STORE_CONFIG.name}, I have a query regarding my recent visit to your online store.`;
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in duration-500 min-h-screen pb-20">
      <div className="flex flex-col items-center text-center py-6">
        <div className="bg-blue-50 p-4 rounded-3xl mb-4">
          <HelpCircle size={48} className="text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">How can we help?</h1>
        <p className="text-gray-500 text-sm px-8">We are available 24/7 to assist you with your orders and queries.</p>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={handleWhatsApp}
          className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 active:bg-green-50 transition-colors"
        >
          <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
            <MessageCircle size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-800">WhatsApp Us</h3>
            <p className="text-xs text-gray-400">Average response time: 5 mins</p>
          </div>
        </button>

        <a 
          href={`tel:${STORE_CONFIG.contactMobile}`}
          className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 active:bg-blue-50 transition-colors"
        >
          <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
            <Phone size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-800">Call Support</h3>
            <p className="text-xs text-gray-400">Talk to our customer executive</p>
          </div>
        </a>

        <div className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl">
            <MapPin size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-800">Our Location</h3>
            <p className="text-xs text-gray-400">{STORE_CONFIG.location}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-gray-800 mb-4 ml-2">Follow Us</h3>
        <div className="flex gap-4">
          <button className="flex-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
            <Instagram size={20} className="text-pink-500" />
            <span className="text-[10px] font-bold uppercase">Instagram</span>
          </button>
          <button className="flex-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
            <Facebook size={20} className="text-blue-600" />
            <span className="text-[10px] font-bold uppercase">Facebook</span>
          </button>
          <button className="flex-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
            <Mail size={20} className="text-red-500" />
            <span className="text-[10px] font-bold uppercase">Email</span>
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Version 1.0.4 - Made with ❤️ in Chennai</p>
      </div>
    </div>
  );
};

export default Support;
