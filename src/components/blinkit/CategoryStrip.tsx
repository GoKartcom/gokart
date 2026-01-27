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
  { id: "dairy-breakfast", name: "Dairy & Breakfast", image: dairyMilk },
  { id: "fruits-vegetables", name: "Fruits & Vegetables", image: vegTomatoes },
  { id: "snacks-munchies", name: "Snacks & Munchies", image: snackChips },
  { id: "cold-drinks-juices", name: "Cold Drinks & Juices", image: drinkJuice },
  { id: "instant-frozen", name: "Instant & Frozen", image: instantNoodles },
  { id: "tea-coffee", name: "Tea, Coffee & More", image: drinkTea },
  { id: "bakery-biscuits", name: "Bakery & Biscuits", image: bakeryBread },
  { id: "sweet-tooth", name: "Sweet Tooth", image: sweetChocolate },
  { id: "atta-rice-dal", name: "Atta, Rice & Dal", image: stapleRice },
  { id: "dryfruits-masala", name: "Dry Fruits & Masala", image: dryfruitMix },
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
    <div className="bg-card border-b border-border py-4">
      <div className="container mx-auto">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center gap-2 min-w-[80px] group transition-all ${
                selectedCategory === category.id ? "scale-105" : ""
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform border-2 ${
                selectedCategory === category.id 
                  ? "border-primary shadow-md" 
                  : "border-transparent"
              }`}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`text-xs text-center font-medium line-clamp-2 max-w-[80px] ${
                selectedCategory === category.id 
                  ? "text-primary font-semibold" 
                  : "text-foreground"
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
