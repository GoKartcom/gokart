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
    <div className="bg-card rounded-xl border border-border p-3 hover:shadow-card transition-all group relative">
      {discount && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        </div>
      )}

      {/* Image - compact on mobile */}
      <div className="relative aspect-[4/3] md:aspect-[4/3] mb-1 md:mb-2 rounded-lg overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <span className="text-xs text-blinkit-green font-medium">⚡ 8 MINS</span>
        </div>

        <h3 className="font-medium text-foreground text-sm line-clamp-2 min-h-[40px]">
          {name}
        </h3>

        <p className="text-xs text-muted-foreground">{unit}</p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">₹{price}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
              onClick={handleAdd}
              disabled={isAdding}
            >
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-1 bg-primary rounded-md">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-primary-foreground hover:bg-accent"
                onClick={handleDecrease}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-primary-foreground font-semibold w-6 text-center">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-primary-foreground hover:bg-accent"
                onClick={handleIncrease}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
