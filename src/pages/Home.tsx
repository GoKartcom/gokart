import { useNavigate } from "react-router-dom";
import MainNavbar from "@/components/home/MainNavbar";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryBar from "@/components/home/CategoryBar";
import ProductCarousel from "@/components/home/ProductCarousel";
import { Footer } from "@/components/layout/Footer";

// Sample product data
const dealOfTheDay = [
  { id: 1, name: "Organic Tomatoes", price: 45, originalPrice: 60, image: "https://images.unsplash.com/photo-1546470427-227c7369676d?w=400&q=80", unit: "500g", tag: "30% OFF" },
  { id: 2, name: "Fresh Spinach", price: 25, originalPrice: 35, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80", unit: "250g", tag: "Hot Deal" },
  { id: 3, name: "Red Onions", price: 30, originalPrice: 40, image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80", unit: "1kg", tag: "25% OFF" },
  { id: 4, name: "Green Capsicum", price: 35, originalPrice: 50, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80", unit: "500g", tag: "Deal" },
  { id: 5, name: "Carrots", price: 40, originalPrice: 55, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80", unit: "500g", tag: "Fresh" },
  { id: 6, name: "Potatoes", price: 35, originalPrice: 45, image: "https://images.unsplash.com/photo-1518977676601-b53f82ber737?w=400&q=80", unit: "1kg", tag: "Best Price" },
];

const featuredProducts = [
  { id: 7, name: "Fresh Bananas", price: 50, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80", unit: "1 dozen" },
  { id: 8, name: "Red Apples", price: 180, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80", unit: "1kg" },
  { id: 9, name: "Oranges", price: 120, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80", unit: "1kg" },
  { id: 10, name: "Grapes", price: 90, image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80", unit: "500g" },
  { id: 11, name: "Mangoes", price: 150, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80", unit: "1kg" },
  { id: 12, name: "Pomegranate", price: 200, image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400&q=80", unit: "1kg" },
];

const bestSellers = [
  { id: 13, name: "Full Cream Milk", price: 60, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80", unit: "1L", tag: "Bestseller" },
  { id: 14, name: "Farm Eggs", price: 80, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80", unit: "12 pcs", tag: "Bestseller" },
  { id: 15, name: "Fresh Paneer", price: 90, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", unit: "200g", tag: "Top Rated" },
  { id: 16, name: "Curd", price: 45, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", unit: "500g" },
  { id: 17, name: "Butter", price: 55, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80", unit: "100g" },
  { id: 18, name: "Cheese Slices", price: 120, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80", unit: "200g" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />
      
      {/* Hero Banner - Auto sliding */}
      <HeroBanner />
      
      {/* Category Bar */}
      <CategoryBar onCategorySelect={handleCategorySelect} />
      
      {/* Deal of the Day - Auto sliding carousel */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5">
        <ProductCarousel
          title="🔥 Deal of the Day"
          products={dealOfTheDay}
          autoSlide={true}
          slideInterval={3500}
        />
      </div>
      
      {/* Featured Products - Auto sliding carousel */}
      <ProductCarousel
        title="✨ Featured Products"
        products={featuredProducts}
        autoSlide={true}
        slideInterval={4000}
      />
      
      {/* Best Sellers - Auto sliding carousel */}
      <div className="bg-secondary/30">
        <ProductCarousel
          title="🏆 Best Sellers"
          products={bestSellers}
          autoSlide={true}
          slideInterval={4500}
        />
      </div>

      {/* Delivery Promise Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-orange rounded-3xl p-6 md:p-10 text-center text-white shadow-orange">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Lightning Fast Delivery ⚡
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-4">
            Get your groceries delivered in just 10-15 minutes
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</span>
              <span>Fresh Products</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</span>
              <span>Free Delivery ₹199+</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
