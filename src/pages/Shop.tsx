import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/blinkit/Header";
import { CategoryStrip } from "@/components/blinkit/CategoryStrip";
import { HeroBanner } from "@/components/blinkit/HeroBanner";
import { ProductSection } from "@/components/blinkit/ProductSection";
import { BlinkitFooter } from "@/components/blinkit/Footer";
import { Button } from "@/components/ui/button";
import { QuickReorder } from "@/components/blinkit/QuickReorder";
import { OffersCarousel } from "@/components/blinkit/OffersCarousel";
import { BottomNav } from "@/components/blinkit/BottomNav";
import { DeliveryBanner } from "@/components/blinkit/DeliveryBanner";

// Dairy & Breakfast Products
import dairyMilk from "@/assets/products/dairy-milk.jpg";
import dairyPaneer from "@/assets/products/dairy-paneer.jpg";
import dairyEggs from "@/assets/products/dairy-eggs.jpg";
import dairyButter from "@/assets/products/dairy-butter.jpg";
import dairyCurd from "@/assets/products/dairy-curd.jpg";
import dairyCheese from "@/assets/products/dairy-cheese.jpg";

// Fruits & Vegetables
import vegTomatoes from "@/assets/products/veg-tomatoes.jpg";
import vegPotatoes from "@/assets/products/veg-potatoes.jpg";
import vegOnions from "@/assets/products/veg-onions.jpg";
import vegCapsicum from "@/assets/products/veg-capsicum.jpg";
import vegCarrots from "@/assets/products/veg-carrots.jpg";
import vegSpinach from "@/assets/products/veg-spinach.jpg";
import fruitBananas from "@/assets/products/fruit-bananas.jpg";
import fruitApples from "@/assets/products/fruit-apples.jpg";
import fruitOranges from "@/assets/products/fruit-oranges.jpg";
import fruitMangoes from "@/assets/products/fruit-mangoes.jpg";
import fruitGrapes from "@/assets/products/fruit-grapes.jpg";
import fruitPomegranate from "@/assets/products/fruit-pomegranate.jpg";

// Snacks & Munchies
import snackMixture from "@/assets/products/snack-mixture.jpg";
import snackChips from "@/assets/products/snack-chips.jpg";
import snackBiscuits from "@/assets/products/snack-biscuits.jpg";

// Cold Drinks & Juices
import drinkJuice from "@/assets/products/drink-juice.jpg";

// Tea, Coffee & More
import drinkTea from "@/assets/products/drink-tea.jpg";

// Bakery & Biscuits
import bakeryBread from "@/assets/products/bakery-bread.jpg";

// Atta, Rice & Dal
import stapleRice from "@/assets/products/staple-rice.jpg";
import stapleAtta from "@/assets/products/staple-atta.jpg";
import stapleDal from "@/assets/products/staple-dal.jpg";

// Dry Fruits & Masala
import dryfruitMix from "@/assets/products/dryfruit-mix.jpg";

// Instant & Frozen
import instantNoodles from "@/assets/products/instant-noodles.jpg";

// Sweet Tooth
import sweetChocolate from "@/assets/products/sweet-chocolate.jpg";

// Category-specific product data
const categoryProducts = {
  "dairy-breakfast": [
    { id: 1, name: "Fresh Milk", price: 28, originalPrice: 32, image: dairyMilk, unit: "500ml", discount: 12 },
    { id: 2, name: "Fresh Paneer", price: 108, originalPrice: 120, image: dairyPaneer, unit: "200g", discount: 10 },
    { id: 3, name: "Farm Fresh Eggs", price: 76, originalPrice: 90, image: dairyEggs, unit: "12 pcs", discount: 15 },
    { id: 4, name: "Amul Butter", price: 52, originalPrice: 58, image: dairyButter, unit: "100g", discount: 10 },
    { id: 5, name: "Fresh Curd", price: 32, originalPrice: 38, image: dairyCurd, unit: "400g", discount: 15 },
    { id: 6, name: "Cheese Slices", price: 85, originalPrice: 95, image: dairyCheese, unit: "10 slices", discount: 10 },
  ],
  "fruits-vegetables": [
    { id: 7, name: "Fresh Tomatoes", price: 26, originalPrice: 32, image: vegTomatoes, unit: "500g", discount: 18 },
    { id: 8, name: "Fresh Potatoes", price: 27, originalPrice: 32, image: vegPotatoes, unit: "1 kg", discount: 15 },
    { id: 9, name: "Red Onions", price: 36, originalPrice: 42, image: vegOnions, unit: "1 kg", discount: 14 },
    { id: 10, name: "Green Capsicum", price: 32, originalPrice: 38, image: vegCapsicum, unit: "250g", discount: 16 },
    { id: 11, name: "Fresh Carrots", price: 40, originalPrice: 48, image: vegCarrots, unit: "500g", discount: 16 },
    { id: 12, name: "Organic Spinach", price: 32, originalPrice: 38, image: vegSpinach, unit: "250g", discount: 16 },
    { id: 13, name: "Fresh Bananas", price: 40, image: fruitBananas, unit: "1 dozen" },
    { id: 14, name: "Red Apples", price: 108, originalPrice: 130, image: fruitApples, unit: "4 pcs", discount: 17 },
    { id: 15, name: "Sweet Oranges", price: 72, originalPrice: 85, image: fruitOranges, unit: "1 kg", discount: 15 },
    { id: 16, name: "Alphonso Mangoes", price: 135, originalPrice: 160, image: fruitMangoes, unit: "2 pcs", discount: 16 },
    { id: 17, name: "Fresh Grapes", price: 81, originalPrice: 100, image: fruitGrapes, unit: "500g", discount: 19 },
    { id: 18, name: "Pomegranate", price: 63, originalPrice: 75, image: fruitPomegranate, unit: "1 pc", discount: 16 },
  ],
  "snacks-munchies": [
    { id: 19, name: "Haldiram Mixture", price: 45, originalPrice: 55, image: snackMixture, unit: "200g", discount: 18 },
    { id: 20, name: "Classic Chips", price: 20, originalPrice: 25, image: snackChips, unit: "100g", discount: 20 },
    { id: 21, name: "Cream Biscuits", price: 25, originalPrice: 30, image: snackBiscuits, unit: "Pack of 4", discount: 17 },
    { id: 22, name: "Masala Mixture", price: 50, originalPrice: 60, image: snackMixture, unit: "250g", discount: 17 },
    { id: 23, name: "Salted Chips", price: 30, originalPrice: 35, image: snackChips, unit: "150g", discount: 14 },
    { id: 24, name: "Parle-G Biscuits", price: 15, image: snackBiscuits, unit: "Pack" },
  ],
  "cold-drinks-juices": [
    { id: 25, name: "Fresh Orange Juice", price: 65, originalPrice: 80, image: drinkJuice, unit: "500ml", discount: 19 },
    { id: 26, name: "Mixed Fruit Juice", price: 55, originalPrice: 65, image: drinkJuice, unit: "500ml", discount: 15 },
    { id: 27, name: "Apple Juice", price: 70, originalPrice: 85, image: drinkJuice, unit: "500ml", discount: 18 },
    { id: 28, name: "Mango Juice", price: 50, originalPrice: 60, image: drinkJuice, unit: "500ml", discount: 17 },
    { id: 29, name: "Pomegranate Juice", price: 85, originalPrice: 100, image: drinkJuice, unit: "500ml", discount: 15 },
    { id: 30, name: "Coconut Water", price: 35, originalPrice: 40, image: drinkJuice, unit: "300ml", discount: 12 },
  ],
  "instant-frozen": [
    { id: 31, name: "Maggi Noodles", price: 14, image: instantNoodles, unit: "Pack" },
    { id: 32, name: "Cup Noodles", price: 45, originalPrice: 55, image: instantNoodles, unit: "1 cup", discount: 18 },
    { id: 33, name: "Pasta Pack", price: 55, originalPrice: 65, image: instantNoodles, unit: "200g", discount: 15 },
    { id: 34, name: "Instant Soup", price: 35, originalPrice: 40, image: instantNoodles, unit: "Pack", discount: 12 },
    { id: 35, name: "Ready to Eat Poha", price: 45, originalPrice: 55, image: instantNoodles, unit: "Pack", discount: 18 },
    { id: 36, name: "Frozen Parathas", price: 85, originalPrice: 100, image: bakeryBread, unit: "5 pcs", discount: 15 },
  ],
  "tea-coffee": [
    { id: 37, name: "Masala Chai Powder", price: 120, originalPrice: 140, image: drinkTea, unit: "250g", discount: 14 },
    { id: 38, name: "Green Tea", price: 180, originalPrice: 220, image: drinkTea, unit: "100 bags", discount: 18 },
    { id: 39, name: "Filter Coffee", price: 150, originalPrice: 175, image: drinkTea, unit: "200g", discount: 14 },
    { id: 40, name: "Instant Coffee", price: 250, originalPrice: 300, image: drinkTea, unit: "100g", discount: 17 },
    { id: 41, name: "Darjeeling Tea", price: 200, originalPrice: 240, image: drinkTea, unit: "100g", discount: 17 },
    { id: 42, name: "Assam Tea", price: 160, originalPrice: 190, image: drinkTea, unit: "250g", discount: 16 },
  ],
  "bakery-biscuits": [
    { id: 43, name: "Fresh Bread", price: 40, originalPrice: 45, image: bakeryBread, unit: "400g", discount: 11 },
    { id: 44, name: "Whole Wheat Bread", price: 50, originalPrice: 58, image: bakeryBread, unit: "400g", discount: 14 },
    { id: 45, name: "Butter Cookies", price: 120, originalPrice: 140, image: snackBiscuits, unit: "300g", discount: 14 },
    { id: 46, name: "Marie Biscuits", price: 35, originalPrice: 42, image: snackBiscuits, unit: "Pack", discount: 17 },
    { id: 47, name: "Pav Buns", price: 20, originalPrice: 25, image: bakeryBread, unit: "4 pcs", discount: 20 },
    { id: 48, name: "Croissant", price: 60, originalPrice: 75, image: bakeryBread, unit: "2 pcs", discount: 20 },
  ],
  "sweet-tooth": [
    { id: 49, name: "Dairy Milk", price: 40, originalPrice: 45, image: sweetChocolate, unit: "50g", discount: 11 },
    { id: 50, name: "Dark Chocolate", price: 120, originalPrice: 140, image: sweetChocolate, unit: "100g", discount: 14 },
    { id: 51, name: "KitKat", price: 25, originalPrice: 30, image: sweetChocolate, unit: "Pack", discount: 17 },
    { id: 52, name: "Gulab Jamun", price: 150, originalPrice: 180, image: sweetChocolate, unit: "1 kg", discount: 17 },
    { id: 53, name: "Rasgulla", price: 120, originalPrice: 145, image: sweetChocolate, unit: "500g", discount: 17 },
    { id: 54, name: "Soan Papdi", price: 80, originalPrice: 95, image: sweetChocolate, unit: "250g", discount: 16 },
  ],
  "atta-rice-dal": [
    { id: 55, name: "Basmati Rice", price: 180, originalPrice: 210, image: stapleRice, unit: "1 kg", discount: 14 },
    { id: 56, name: "Whole Wheat Atta", price: 55, originalPrice: 65, image: stapleAtta, unit: "1 kg", discount: 15 },
    { id: 57, name: "Toor Dal", price: 140, originalPrice: 165, image: stapleDal, unit: "1 kg", discount: 15 },
    { id: 58, name: "Moong Dal", price: 150, originalPrice: 175, image: stapleDal, unit: "1 kg", discount: 14 },
    { id: 59, name: "Chana Dal", price: 90, originalPrice: 108, image: stapleDal, unit: "1 kg", discount: 17 },
    { id: 60, name: "Multigrain Atta", price: 75, originalPrice: 88, image: stapleAtta, unit: "1 kg", discount: 15 },
  ],
  "dryfruits-masala": [
    { id: 61, name: "Mixed Dry Fruits", price: 450, originalPrice: 520, image: dryfruitMix, unit: "500g", discount: 13 },
    { id: 62, name: "Almonds", price: 350, originalPrice: 400, image: dryfruitMix, unit: "250g", discount: 12 },
    { id: 63, name: "Cashews", price: 400, originalPrice: 460, image: dryfruitMix, unit: "250g", discount: 13 },
    { id: 64, name: "Raisins", price: 120, originalPrice: 140, image: dryfruitMix, unit: "200g", discount: 14 },
    { id: 65, name: "Garam Masala", price: 75, originalPrice: 90, image: dryfruitMix, unit: "100g", discount: 17 },
    { id: 66, name: "Kitchen King", price: 55, originalPrice: 65, image: dryfruitMix, unit: "100g", discount: 15 },
  ],
};

// Deal of the Day - best offers from all categories
const dealOfTheDay = [
  { id: 1, name: "Fresh Milk", price: 28, originalPrice: 32, image: dairyMilk, unit: "500ml", discount: 12 },
  { id: 7, name: "Fresh Tomatoes", price: 26, originalPrice: 32, image: vegTomatoes, unit: "500g", discount: 18 },
  { id: 3, name: "Farm Fresh Eggs", price: 76, originalPrice: 90, image: dairyEggs, unit: "12 pcs", discount: 15 },
  { id: 4, name: "Amul Butter", price: 52, originalPrice: 58, image: dairyButter, unit: "100g", discount: 10 },
  { id: 14, name: "Red Apples", price: 108, originalPrice: 130, image: fruitApples, unit: "4 pcs", discount: 17 },
  { id: 43, name: "Fresh Bread", price: 40, originalPrice: 45, image: bakeryBread, unit: "400g", discount: 11 },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Refs for each category section
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCategorySelect = (categoryId: string) => {
    // Navigate to dedicated category page
    if (categoryId) {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <DeliveryBanner />
      <Header />
      
      {/* Back Button */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto py-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CategoryStrip onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      <main className="space-y-4">
        <HeroBanner />
        
        {/* Offers Carousel */}
        <div className="container mx-auto px-4">
          <OffersCarousel />
        </div>
        
        {/* Quick Reorder */}
        <div className="container mx-auto px-4">
          <QuickReorder />
        </div>
        
        {/* Deal of the Day - Always visible at top */}
        <ProductSection title="🔥 Deal of the Day" products={dealOfTheDay} />
        
        {/* All Category Sections */}
        <div ref={(el) => sectionRefs.current["dairy-breakfast"] = el} id="dairy-breakfast">
          <ProductSection title="🥛 Dairy & Breakfast" products={categoryProducts["dairy-breakfast"]} />
        </div>
        
        <div ref={(el) => sectionRefs.current["fruits-vegetables"] = el} id="fruits-vegetables">
          <ProductSection title="🥬 Fresh Vegetables" products={categoryProducts["fruits-vegetables"].slice(0, 6)} />
          <ProductSection title="🍎 Fresh Fruits" products={categoryProducts["fruits-vegetables"].slice(6)} />
        </div>
        
        <div ref={(el) => sectionRefs.current["snacks-munchies"] = el} id="snacks-munchies">
          <ProductSection title="🍿 Snacks & Munchies" products={categoryProducts["snacks-munchies"]} />
        </div>
        
        <div ref={(el) => sectionRefs.current["cold-drinks-juices"] = el} id="cold-drinks-juices">
          <ProductSection title="🧃 Cold Drinks & Juices" products={categoryProducts["cold-drinks-juices"]} />
        </div>
        
        <div ref={(el) => sectionRefs.current["instant-frozen"] = el} id="instant-frozen">
          <ProductSection title="🍜 Instant & Frozen" products={categoryProducts["instant-frozen"]} />
        </div>
        
        <div ref={(el) => sectionRefs.current["tea-coffee"] = el} id="tea-coffee">
          <ProductSection title="☕ Tea, Coffee & More" products={categoryProducts["tea-coffee"]} />
        </div>
        
        <div ref={(el) => sectionRefs.current["bakery-biscuits"] = el} id="bakery-biscuits">
          <ProductSection title="🍪 Bakery & Biscuits" products={categoryProducts["bakery-biscuits"]} />
        </div>
        
        <div ref={(el) => sectionRefs.current["sweet-tooth"] = el} id="sweet-tooth">
          <ProductSection title="🍫 Sweet Tooth" products={categoryProducts["sweet-tooth"]} />
        </div>
        
        <div ref={(el) => sectionRefs.current["atta-rice-dal"] = el} id="atta-rice-dal">
          <ProductSection title="🍚 Atta, Rice & Dal" products={categoryProducts["atta-rice-dal"]} />
        </div>
        
        <div ref={(el) => sectionRefs.current["dryfruits-masala"] = el} id="dryfruits-masala">
          <ProductSection title="🥜 Dry Fruits & Masala" products={categoryProducts["dryfruits-masala"]} />
        </div>
      </main>
      <BlinkitFooter />
      <BottomNav />
    </div>
  );
};

function getCategoryTitle(categoryId: string): string {
  const titles: Record<string, string> = {
    "dairy-breakfast": "🥛 Dairy & Breakfast",
    "fruits-vegetables": "🥬 Fruits & Vegetables",
    "snacks-munchies": "🍿 Snacks & Munchies",
    "cold-drinks-juices": "🧃 Cold Drinks & Juices",
    "instant-frozen": "🍜 Instant & Frozen",
    "tea-coffee": "☕ Tea, Coffee & More",
    "bakery-biscuits": "🍪 Bakery & Biscuits",
    "sweet-tooth": "🍫 Sweet Tooth",
    "atta-rice-dal": "🍚 Atta, Rice & Dal",
    "dryfruits-masala": "🥜 Dry Fruits & Masala",
  };
  return titles[categoryId] || "Products";
}

export default Shop;
