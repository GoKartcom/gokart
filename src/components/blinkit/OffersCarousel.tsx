import { useState, useEffect } from "react";
import { Tag, Zap, Gift, Percent } from "lucide-react";

const offers = [
  { id: 1, text: "🎉 Flat ₹100 off on orders above ₹500", color: "bg-primary/10 text-primary", icon: Tag },
  { id: 2, text: "⚡ Free delivery on your first 3 orders", color: "bg-blinkit-green/10 text-blinkit-green", icon: Zap },
  { id: 3, text: "🎁 Use code KLICKIT20 for 20% off", color: "bg-accent/10 text-accent", icon: Gift },
  { id: 4, text: "💰 Upto 40% off on fresh vegetables", color: "bg-blinkit-yellow/10 text-blinkit-dark", icon: Percent },
];

export function OffersCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const offer = offers[current];
  const Icon = offer.icon;

  return (
    <div className={`${offer.color} rounded-lg px-3 py-2 transition-all duration-300`}>
      <div className="flex items-center justify-center gap-2">
        <Icon className="h-4 w-4" />
        <p className="text-xs font-medium">{offer.text}</p>
      </div>
    </div>
  );
}
