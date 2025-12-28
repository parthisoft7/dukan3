
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Success' | 'Processing';
  customer: {
    name: string;
    mobile: string;
    address: string;
  };
}

export interface StoreConfig {
  name: string;
  upiId: string;
  upiName: string;
  location: string;
  contactMobile: string;
  whatsappNumber: string;
}
