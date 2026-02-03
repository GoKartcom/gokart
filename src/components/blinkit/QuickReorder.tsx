import { RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

// Simulated past orders
const recentItems = [
  { id: 1, name: "Fresh Milk", price: 28, unit: "500ml" },
  { id: 7, name: "Fresh Tomatoes", price: 26, unit: "500g" },
  { id: 3, name: "Farm Fresh Eggs", price: 76, unit: "12 pcs" },
  { id: 43, name: "Fresh Bread", price: 40, unit: "400g" },
];

export function QuickReorder() {
  const { addToCart } = useCart();

  const handleReorder = () => {
    recentItems.forEach((item) => {
      addToCart({
        productId: item.id,
        name: item.name,
        price: item.price,
        image: "",
        unit: item.unit,
        vendor: "Local Vendor",
      });
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3 border border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-full">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Your Last Order</p>
            <p className="text-[10px] text-muted-foreground">{recentItems.length} items • ₹{recentItems.reduce((sum, item) => sum + item.price, 0)}</p>
          </div>
        </div>
        <Button 
          size="sm" 
          className="h-7 text-xs gap-1"
          onClick={handleReorder}
        >
          <RefreshCw className="h-3 w-3" />
          Reorder
        </Button>
      </div>
    </div>
  );
}
