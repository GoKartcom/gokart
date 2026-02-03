import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  discount?: number;
  vendor?: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  unit,
  discount,
  vendor = "Local Vendor",
}: ProductCardProps) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find((item) => item.productId === id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    setIsAdding(true);
    addToCart({
      productId: id,
      name,
      price,
      image,
      unit,
      vendor,
      offer: discount,
    });
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-2 hover:shadow-card transition-all group relative">
      {discount && (
        <div className="absolute top-1 left-1 z-10">
          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
            {discount}% OFF
          </span>
        </div>
      )}

      {/* Image - ultra compact on mobile */}
      <div className="relative aspect-square mb-1 rounded-md overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-blinkit-green font-medium">⚡ 10 MINS</span>
        </div>

        <h3 className="font-medium text-foreground text-xs line-clamp-2 min-h-[28px] leading-tight">
          {name}
        </h3>

        <p className="text-[10px] text-muted-foreground">{unit}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm">₹{price}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-[10px] text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <Button
              size="sm"
              variant="outline"
              className="h-6 px-2 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
              onClick={handleAdd}
              disabled={isAdding}
            >
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-0.5 bg-primary rounded">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-primary-foreground hover:bg-accent"
                onClick={handleDecrease}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-primary-foreground font-semibold w-4 text-center text-xs">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-primary-foreground hover:bg-accent"
                onClick={handleIncrease}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
