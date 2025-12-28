
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, Phone, Home, ShoppingBag, Clock, MapPin, ClipboardCheck } from 'lucide-react';
import { useApp } from '../AppContext';
import { STORE_CONFIG } from '../constants';

const OrderSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useApp();
  
  const order = useMemo(() => orders.find(o => o.id === id), [orders, id]);

  // Generate an estimated delivery time (e.g., 30-45 minutes from now)
  const deliveryEstimate = useMemo(() => {
    const now = new Date();
    const minTime = new Date(now.getTime() + 30 * 60000);
    const maxTime = new Date(now.getTime() + 50 * 60000);
    
    const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formatTime(minTime)} - ${formatTime(maxTime)}`;
  }, []);

  const handleWhatsApp = () => {
    if (!order) return;

    const itemsList = order.items
      .map(item => `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`)
      .join('\n');

    const message = `*📦 New Order Confirmed!*
----------------------------
*Order ID:* ${order.id}
*Customer:* ${order.customer.name}
*Mobile:* ${order.customer.mobile}
*Address:* ${order.customer.address}

*Order Items:*
${itemsList}

*Total Amount:* ₹${order.total}
*Payment Status:* Paid via UPI

*Estimated Delivery:* ${deliveryEstimate}
----------------------------
Thank you for shopping with *${STORE_CONFIG.name}*!`;

    // Opens WhatsApp directed to the store's number with the full order summary
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <ClipboardCheck size={48} className="text-red-500" />
        </div>
        <h1 className="text-xl font-bold mb-2">Order Not Found</h1>
        <p className="text-gray-500 mb-6">We couldn't find the details for this order ID.</p>
        <Link to="/" className="text-blue-600 font-bold underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-in fade-in duration-700">
      {/* Success Header */}
      <div className="bg-blue-600 text-white pt-12 pb-16 px-6 flex flex-col items-center justify-center rounded-b-[48px] shadow-xl shadow-blue-100">
        <div className="bg-white/20 p-5 rounded-full mb-6 animate-bounce">
          <CheckCircle2 size={56} className="text-white" />
        </div>
        <h1 className="text-3xl font-black mb-2">Order Success!</h1>
        <div className="bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          <p className="text-white text-xs font-bold uppercase tracking-widest">Order ID: {id}</p>
        </div>
      </div>

      <div className="p-4 -mt-10 flex flex-col gap-5">
        {/* Delivery Estimate Card */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Clock size={18} /> Estimated Delivery
            </h3>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">Today</span>
          </div>
          <p className="text-2xl font-black mb-1">{deliveryEstimate}</p>
          <p className="text-xs text-blue-100 opacity-80">Our rider will reach Tambaram shortly.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-gray-800 border-b border-gray-50 pb-3">
            <ShoppingBag size={18} className="text-blue-600" />
            <h3 className="font-bold">Order Summary</h3>
          </div>
          <div className="flex flex-col gap-3">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm items-start">
                <div className="flex-1 pr-4">
                  <span className="text-gray-600 font-medium">{item.name}</span>
                  <span className="text-gray-400 text-xs block">Qty: {item.quantity}</span>
                </div>
                <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-gray-50 pt-4 mt-2 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Paid</span>
              <span className="font-black text-blue-600 text-2xl">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address Brief */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2 text-gray-800">
            <MapPin size={18} className="text-blue-600" />
            <h3 className="font-bold">Delivering To</h3>
          </div>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">{order.customer.address}</p>
        </div>

        {/* Primary Call to Action */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="text-center mb-2">
            <h3 className="font-bold text-gray-800">Confirm your order</h3>
            <p className="text-xs text-gray-400">Please send this summary to the shop via WhatsApp</p>
          </div>
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-100 active:scale-[0.98] transition-all"
          >
            <MessageSquare size={24} /> CONFIRM ON WHATSAPP
          </button>
          
          <div className="flex gap-4 mt-2">
            <a 
              href={`tel:${STORE_CONFIG.contactMobile}`}
              className="flex-1 bg-gray-50 text-gray-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:bg-gray-100 transition-colors text-sm"
            >
              <Phone size={18} className="text-blue-600" /> Call Store
            </a>
            <Link 
              to="/"
              className="flex-1 bg-gray-50 text-gray-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:bg-gray-100 transition-colors text-sm"
            >
              <Home size={18} /> Home
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center py-6">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 size={12} className="text-green-500" /> Verified Order
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
