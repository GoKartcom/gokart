import { useNavigate } from "react-router-dom";
import dairyMilk from "@/assets/products/dairy-milk.jpg";
import vegTomatoes from "@/assets/products/veg-tomatoes.jpg";
import snackChips from "@/assets/products/snack-chips.jpg";
import drinkJuice from "@/assets/products/drink-juice.jpg";
import instantNoodles from "@/assets/products/instant-noodles.jpg";
import drinkTea from "@/assets/products/drink-tea.jpg";
import bakeryBread from "@/assets/products/bakery-bread.jpg";
import sweetChocolate from "@/assets/products/sweet-chocolate.jpg";
import stapleRice from "@/assets/products/staple-rice.jpg";
import dryfruitMix from "@/assets/products/dryfruit-mix.jpg";

interface CategoryStripProps {
  onCategorySelect?: (categoryId: string) => void;
  selectedCategory?: string | null;
}

const categories = [
  { id: "dairy-breakfast", name: "Dairy", image: dairyMilk },
  { id: "fruits-vegetables", name: "Fruits & Veggies", image: vegTomatoes },
  { id: "snacks-munchies", name: "Snacks", image: snackChips },
  { id: "cold-drinks-juices", name: "Drinks", image: drinkJuice },
  { id: "instant-frozen", name: "Instant", image: instantNoodles },
  { id: "tea-coffee", name: "Tea & Coffee", image: drinkTea },
  { id: "bakery-biscuits", name: "Bakery", image: bakeryBread },
  { id: "sweet-tooth", name: "Sweets", image: sweetChocolate },
  { id: "atta-rice-dal", name: "Staples", image: stapleRice },
  { id: "dryfruits-masala", name: "Dry Fruits", image: dryfruitMix },
  { id: "pharmacy", name: "Pharmacy", icon: "💊" },
  { id: "electrical", name: "Electrical", icon: "⚡" },
  { id: "meat-chicken", name: "Meat & Chicken", icon: "🍗" },
  { id: "kirana", name: "Kirana Store", icon: "🏪" },
  { id: "pet-care", name: "Pet Care", icon: "🐾" },
  { id: "baby-care", name: "Baby Care", icon: "👶" },
];

export function CategoryStrip({ onCategorySelect, selectedCategory }: CategoryStripProps) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId === selectedCategory ? "" : categoryId);
    } else {
      // Navigate to category page if no handler provided
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="bg-card border-b border-border py-2">
      <div className="container mx-auto px-2">
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center gap-0.5 min-w-[48px] md:min-w-[52px] group transition-all ${
                selectedCategory === category.id ? "scale-105" : ""
              }`}
            >
              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform border ${
                selectedCategory === category.id 
                  ? "border-primary shadow-md" 
                  : "border-border"
              } ${'icon' in category ? 'bg-secondary' : ''}`}>
                {'image' in category ? (
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg">{category.icon}</span>
                )}
              </div>
              <span className={`text-[9px] md:text-[10px] text-center font-medium line-clamp-1 max-w-[48px] md:max-w-[52px] ${
                selectedCategory === category.id 
                  ? "text-primary font-semibold" 
                  : "text-muted-foreground"
              }`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
