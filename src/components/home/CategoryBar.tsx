import { Milk, Apple, Carrot, Wheat, Egg, Fish, Beef, Cookie, Package } from "lucide-react";

const categories = [
  { id: "dairy", name: "Dairy", icon: Milk, color: "bg-blue-100 text-blue-600" },
  { id: "fruits", name: "Fruits", icon: Apple, color: "bg-red-100 text-red-600" },
  { id: "vegetables", name: "Vegetables", icon: Carrot, color: "bg-orange-100 text-orange-600" },
  { id: "grains", name: "Grains", icon: Wheat, color: "bg-amber-100 text-amber-600" },
  { id: "eggs", name: "Eggs", icon: Egg, color: "bg-yellow-100 text-yellow-600" },
  { id: "seafood", name: "Seafood", icon: Fish, color: "bg-cyan-100 text-cyan-600" },
  { id: "meat", name: "Meat", icon: Beef, color: "bg-pink-100 text-pink-600" },
  { id: "snacks", name: "Snacks", icon: Cookie, color: "bg-purple-100 text-purple-600" },
  { id: "pantry", name: "Pantry", icon: Package, color: "bg-green-100 text-green-600" },
];

interface CategoryBarProps {
  onCategorySelect?: (categoryId: string) => void;
}

const CategoryBar = ({ onCategorySelect }: CategoryBarProps) => {
  return (
    <div className="w-full bg-card border-y border-border py-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect?.(category.id)}
                className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl hover:bg-secondary transition-all duration-200 flex-shrink-0 group"
              >
                <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-foreground whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
