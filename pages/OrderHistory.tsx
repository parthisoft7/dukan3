
import React from 'react';
import { useApp } from '../AppContext';
import { Package, ChevronRight, Clock } from 'lucide-react';

const OrderHistory: React.FC = () => {
  const { orders } = useApp();

  return (
    <div className="p-4 flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500 min-h-screen pb-20">
      <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
          <div className="bg-gray-100 p-6 rounded-full">
            <Package size={48} className="text-gray-300" />
          </div>
          <p className="font-medium">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-0.5">Order #{order.id}</div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock size={10} /> {new Date(order.date).toLocaleDateString()}
                  </div>
                </div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  order.status === 'Success' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {order.status}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-3 overflow-hidden">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img key={i} src={item.image} className="inline-block h-10 w-10 rounded-full border-2 border-white object-cover" />
                  ))}
                  {order.items.length > 3 && (
                    <div className="inline-block h-10 w-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">
                    {order.items[0].name} {order.items.length > 1 ? `& ${order.items.length - 1} more` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">₹{order.total}</p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-gray-400 border-t border-gray-50 pt-3">
                View Details <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
