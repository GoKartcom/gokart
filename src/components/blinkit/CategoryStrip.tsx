import { Link } from "react-router-dom";

const categories = [
  { name: "Dairy & Breakfast", icon: "🥛", color: "bg-blue-50" },
  { name: "Fruits & Vegetables", icon: "🥬", color: "bg-green-50" },
  { name: "Snacks & Munchies", icon: "🍿", color: "bg-yellow-50" },
  { name: "Cold Drinks & Juices", icon: "🧃", color: "bg-orange-50" },
  { name: "Instant & Frozen", icon: "🍜", color: "bg-red-50" },
  { name: "Tea, Coffee & More", icon: "☕", color: "bg-amber-50" },
  { name: "Bakery & Biscuits", icon: "🍪", color: "bg-pink-50" },
  { name: "Sweet Tooth", icon: "🍫", color: "bg-purple-50" },
  { name: "Atta, Rice & Dal", icon: "🍚", color: "bg-lime-50" },
  { name: "Dry Fruits & Masala", icon: "🥜", color: "bg-amber-100" },
];

export function CategoryStrip() {
  return (
    <div className="bg-card border-b border-border py-4">
      <div className="container mx-auto">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/products"
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform`}>
                {category.icon}
              </div>
              <span className="text-xs text-center font-medium text-foreground line-clamp-2 max-w-[80px]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
