
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, User, Phone, MapPin, CreditCard, 
  ShieldCheck, ExternalLink, Info, ShoppingBag, 
  ChevronDown, ChevronUp 
} from 'lucide-react';
import { useApp } from '../AppContext';
import { STORE_CONFIG } from '../constants';

const Checkout: React.FC = () => {
  const { cart, totalAmount, placeOrder } = useApp();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  // Auto-fill from last order if exists
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders);
        if (orders.length > 0) {
          const last = orders[0].customer;
          setFormData({
            name: last.name || '',
            mobile: last.mobile || '',
            address: last.address || ''
          });
        }
      } catch (e) {
        console.error("Failed to parse orders", e);
      }
    }
    
    // If cart is empty, redirect back
    if (cart.length === 0 && !currentOrderId) {
      navigate('/cart');
    }
  }, [cart, currentOrderId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getUpiLink = (orderId: string) => {
    const formattedAmount = Number(totalAmount).toFixed(2);
    const pa = STORE_CONFIG.upiId;
    const pn = STORE_CONFIG.upiName;
    const tn = `Order ${orderId}`;
    return `upi://pay?pa=${pa}&pn=${encodeURIComponent(pn)}&am=${formattedAmount}&cu=INR&tn=${encodeURIComponent(tn)}`;
  };

  // Fix: Added the missing confirmPaymentManually function
  const confirmPaymentManually = () => {
    if (currentOrderId) {
      navigate(`/order-success/${currentOrderId}`);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.address) {
      return;
    }

    setIsLoading(true);
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setCurrentOrderId(orderId);

    // 1. Save order to local history
    placeOrder({
      id: orderId,
      date: new Date().toISOString(),
      items: [...cart],
      total: totalAmount,
      status: 'Pending',
      customer: formData
    });

    // 2. Trigger UPI intent
    const upiUrl = getUpiLink(orderId);
    window.location.href = upiUrl;

    // 3. Show fallback modal after a delay
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentModal(true);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-40 animate-in fade-in duration-300">
      <div className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Checkout</h1>
      </div>

      <form ref={formRef} onSubmit={handlePayment} className="p-4 flex flex-col gap-5">
        
        {/* Order Summary Dropdown */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button 
            type="button"
            onClick={() => setShowSummary(!showSummary)}
            className="w-full p-5 flex items-center justify-between active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                <ShoppingBag size={18} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-gray-800">Order Summary</h3>
                <p className="text-[10px] text-gray-400 font-medium">{cart.length} items to be delivered</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-blue-600">₹{totalAmount}</span>
              {showSummary ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </button>
          
          {showSummary && (
            <div className="px-5 pb-5 border-t border-gray-50 pt-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-3">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">{item.name} <span className="text-gray-300 ml-1">x{item.quantity}</span></span>
                    <span className="font-bold text-gray-700">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-sm">Amount Payable</span>
                  <span className="font-black text-blue-600 text-sm">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <User size={18} className="text-blue-600" /> Delivery Details
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Receiver Name</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Parthiban" 
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative">
                <input 
                  required
                  type="tel" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210" 
                  pattern="[0-9]{10}"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-xs">
                  +91
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <MapPin size={18} className="text-blue-600" /> Full Address
          </h3>
          <textarea 
            required
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House No, Street, Area, Tambaram, Chennai..." 
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
          ></textarea>
        </div>

        {/* Payment Selection */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <CreditCard size={18} className="text-blue-600" /> Payment Method
          </h3>
          <div className="p-4 border-2 border-blue-600 bg-blue-50/50 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-lg border border-gray-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="w-10 h-6 object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">UPI (GPay / PhonePe)</p>
                <p className="text-[10px] text-gray-500">Secure instant payment</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full border-4 border-blue-600 bg-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-600 shrink-0" />
            <p className="text-[10px] text-green-700 font-medium leading-tight">
              100% Secure Transaction. Your payment is protected.
            </p>
          </div>
        </div>

        {/* Fixed Footer CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-40 shadow-[0_-4px_30px_rgba(0,0,0,0.08)] rounded-t-[32px]">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</span>
              <span className="text-xl font-black text-gray-900">₹{totalAmount}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">
              <ShieldCheck size={10} /> Secure
            </div>
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-blue-400' : 'bg-blue-600'} text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-blue-200 active:scale-[0.98] transition-all overflow-hidden relative`}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Opening Payment Apps...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                PLACE ORDER & PAY ₹{totalAmount}
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Payment Processing Fallback Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 flex flex-col items-center animate-in slide-in-from-bottom-10 duration-500 shadow-2xl relative">
            <div className="w-12 h-1 bg-gray-100 rounded-full mb-8 sm:hidden"></div>
            
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <ExternalLink size={40} className="text-blue-600 animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-3 text-gray-900 tracking-tight">Completing Payment</h2>
            <p className="text-gray-500 text-sm text-center mb-10 px-6 leading-relaxed">
              We've redirected you to your UPI app. Please finish the payment there and return here.
            </p>

            <div className="flex flex-col w-full gap-4">
              <button 
                onClick={() => window.location.href = getUpiLink(currentOrderId)}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-blue-100"
              >
                Retry UPI Redirect
              </button>
              
              <button 
                onClick={confirmPaymentManually}
                className="w-full bg-green-50 text-green-700 font-bold py-4 rounded-2xl active:bg-green-100 transition-colors border border-green-100"
              >
                I've paid, take me to receipt
              </button>
              
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="w-full text-gray-400 font-bold py-3 text-xs uppercase tracking-widest mt-2"
              >
                Cancel & Edit Info
              </button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
              <ShieldCheck size={14} className="text-green-500" /> Secure SSL Encryption
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
