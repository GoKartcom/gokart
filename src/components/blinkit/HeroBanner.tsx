import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Fresh Fruits",
    subtitle: "Up to 40% off",
    description: "Farm fresh fruits delivered to your door",
    bg: "from-orange-100 to-orange-50",
    textColor: "text-orange-900",
    icon: "🍎",
  },
  {
    id: 2,
    title: "Daily Essentials",
    subtitle: "Flat ₹50 off",
    description: "On orders above ₹500",
    bg: "from-green-100 to-green-50",
    textColor: "text-green-900",
    icon: "🥬",
  },
  {
    id: 3,
    title: "Dairy Products",
    subtitle: "Buy 2 Get 1 Free",
    description: "Fresh milk, curd & more",
    bg: "from-blue-100 to-blue-50",
    textColor: "text-blue-900",
    icon: "🥛",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  return (
    <div className="container mx-auto py-4">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`w-full flex-shrink-0 bg-gradient-to-r ${banner.bg} p-8 md:p-12`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                    {banner.subtitle}
                  </span>
                  <h2 className={`text-3xl md:text-4xl font-bold ${banner.textColor}`}>
                    {banner.title}
                  </h2>
                  <p className={`${banner.textColor} opacity-80`}>{banner.description}</p>
                  <Link to="/products">
                    <Button className="mt-2 bg-primary hover:bg-accent text-primary-foreground">
                      Shop Now
                    </Button>
                  </Link>
                </div>
                <div className="text-8xl md:text-9xl hidden sm:block">{banner.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-primary" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
