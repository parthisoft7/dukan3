
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';
import Support from './pages/Support';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen pb-20">
          <Header />
          <main className="flex-1 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
