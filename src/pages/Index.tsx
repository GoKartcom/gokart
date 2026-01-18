import { Header } from "@/components/blinkit/Header";
import { CategoryStrip } from "@/components/blinkit/CategoryStrip";
import { HeroBanner } from "@/components/blinkit/HeroBanner";
import { ProductSection } from "@/components/blinkit/ProductSection";
import { BlinkitFooter } from "@/components/blinkit/Footer";
import tomatoesImg from "@/assets/product-tomatoes.jpg";
import spinachImg from "@/assets/product-spinach.jpg";

// Sample product data
const dealOfTheDay = [
  { id: 1, name: "Fresh Tomatoes", price: 29, originalPrice: 45, image: tomatoesImg, unit: "500g", discount: 35 },
  { id: 2, name: "Organic Spinach", price: 35, originalPrice: 50, image: spinachImg, unit: "250g", discount: 30 },
  { id: 3, name: "Farm Fresh Eggs", price: 85, originalPrice: 100, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200", unit: "12 pcs", discount: 15 },
  { id: 4, name: "Amul Butter", price: 55, originalPrice: 60, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200", unit: "100g", discount: 8 },
  { id: 5, name: "Fresh Milk", price: 28, originalPrice: 32, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200", unit: "500ml", discount: 12 },
  { id: 6, name: "Brown Bread", price: 45, originalPrice: 50, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200", unit: "400g", discount: 10 },
];

const freshFruits = [
  { id: 7, name: "Fresh Bananas", price: 45, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200", unit: "1 dozen" },
  { id: 8, name: "Red Apples", price: 120, originalPrice: 150, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200", unit: "4 pcs", discount: 20 },
  { id: 9, name: "Sweet Oranges", price: 80, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=200", unit: "1 kg" },
  { id: 10, name: "Fresh Grapes", price: 90, originalPrice: 110, image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=200", unit: "500g", discount: 18 },
  { id: 11, name: "Ripe Mangoes", price: 150, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=200", unit: "2 pcs" },
  { id: 12, name: "Fresh Pomegranate", price: 70, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200", unit: "1 pc" },
];

const vegetables = [
  { id: 13, name: "Fresh Potatoes", price: 30, image: "https://images.unsplash.com/photo-1518977676601-b53f82ber?w=200", unit: "1 kg" },
  { id: 14, name: "Green Capsicum", price: 35, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200", unit: "250g" },
  { id: 15, name: "Fresh Onions", price: 40, image: "https://images.unsplash.com/photo-1508747703725-719f12aa10b6?w=200", unit: "1 kg" },
  { id: 16, name: "Carrots", price: 45, originalPrice: 55, image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=200", unit: "500g", discount: 18 },
  { id: 17, name: "Fresh Cucumber", price: 25, image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=200", unit: "500g" },
  { id: 18, name: "Lady Finger", price: 50, image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=200", unit: "250g" },
];

const dairy = [
  { id: 19, name: "Fresh Paneer", price: 120, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200", unit: "200g" },
  { id: 20, name: "Greek Yogurt", price: 65, originalPrice: 80, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200", unit: "400g", discount: 19 },
  { id: 21, name: "Cheese Slices", price: 95, image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=200", unit: "10 slices" },
  { id: 22, name: "Amul Curd", price: 35, image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=200", unit: "400g" },
  { id: 23, name: "Fresh Cream", price: 45, image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=200", unit: "200ml" },
  { id: 24, name: "Lassi", price: 40, image: "https://images.unsplash.com/photo-1626200926407-6e2f23feca3d?w=200", unit: "250ml" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryStrip />
      <main>
        <HeroBanner />
        <ProductSection title="🔥 Deal of the Day" products={dealOfTheDay} />
        <ProductSection title="🍎 Fresh Fruits" products={freshFruits} />
        <ProductSection title="🥬 Fresh Vegetables" products={vegetables} />
        <ProductSection title="🥛 Dairy & Breakfast" products={dairy} />
      </main>
      <BlinkitFooter />
    </div>
  );
};

export default Index;
