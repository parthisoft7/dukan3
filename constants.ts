
import { Product, StoreConfig } from './types';

export const STORE_CONFIG: StoreConfig = {
  name: "Dukaan Chennai",
  upiId: "parthi101089-2@okaxis",
  upiName: "Parthiban D",
  location: "Tambaram, Chennai, Tamil Nadu",
  contactMobile: "+919876543210", // Example mobile
  whatsappNumber: "919876543210" // Format for WhatsApp link
};

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Filter Coffee",
    price: 10,
    description: "Traditional South Indian Filter Coffee. Freshly brewed and aromatic.",
    category: "Beverages",
    image: "https://picsum.photos/seed/coffee/400/400",
    rating: 4.8,
    stock: 50
  },
  {
    id: "2",
    name: "Parle-G Biscuit Small",
    price: 5,
    description: "The world's largest selling biscuit brand. Perfect tea-time snack.",
    category: "Snacks",
    image: "https://picsum.photos/seed/biscuit/400/400",
    rating: 4.9,
    stock: 100
  },
  {
    id: "3",
    name: "Aavin Milk Sachet (Single)",
    price: 2,
    description: "Fresh milk sample sachet for quick use.",
    category: "Dairy",
    image: "https://picsum.photos/seed/milk/400/400",
    rating: 4.5,
    stock: 200
  },
  {
    id: "4",
    name: "Premium Agarbatti (Stick)",
    price: 1,
    description: "Hand-rolled incense sticks with divine sandalwood fragrance.",
    category: "Home",
    image: "https://picsum.photos/seed/incense/400/400",
    rating: 4.7,
    stock: 500
  },
  {
    id: "5",
    name: "Dairy Milk Chocolate (Bite)",
    price: 10,
    description: "Small bite-sized Cadbury Dairy Milk for instant sweetness.",
    category: "Snacks",
    image: "https://picsum.photos/seed/choco/400/400",
    rating: 4.9,
    stock: 150
  },
  {
    id: "6",
    name: "Nataraj 2B Pencil",
    price: 5,
    description: "Classic smooth writing pencil for students and artists.",
    category: "Stationery",
    image: "https://picsum.photos/seed/pencil/400/400",
    rating: 4.6,
    stock: 300
  }
];
