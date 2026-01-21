import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Banner images
import bannerFruits from "@/assets/banners/banner-fruits.jpg";
import bannerVegetables from "@/assets/banners/banner-vegetables.jpg";
import bannerDairy from "@/assets/banners/banner-dairy.jpg";
import bannerSnacks from "@/assets/banners/banner-snacks.jpg";

const banners = [
  {
    id: 1,
    title: "Fresh Fruits",
    subtitle: "Up to 40% off",
    description: "Farm fresh fruits delivered to your door in minutes",
    image: bannerFruits,
    link: "/category/fruits-vegetables",
    overlayColor: "from-orange-900/70 via-orange-900/40 to-transparent",
  },
  {
    id: 2,
    title: "Farm Fresh Vegetables",
    subtitle: "Flat ₹50 off",
    description: "Organic vegetables straight from the farm",
    image: bannerVegetables,
    link: "/category/fruits-vegetables",
    overlayColor: "from-green-900/70 via-green-900/40 to-transparent",
  },
  {
    id: 3,
    title: "Dairy & Breakfast",
    subtitle: "Buy 2 Get 1 Free",
    description: "Fresh milk, paneer, eggs & more",
    image: bannerDairy,
    link: "/category/dairy-breakfast",
    overlayColor: "from-blue-900/70 via-blue-900/40 to-transparent",
  },
  {
    id: 4,
    title: "Snacks & Munchies",
    subtitle: "Upto 30% off",
    description: "Chips, namkeen, biscuits for every craving",
    image: bannerSnacks,
    link: "/category/snacks-munchies",
    overlayColor: "from-purple-900/70 via-purple-900/40 to-transparent",
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
              className="w-full flex-shrink-0 relative h-[200px] md:h-[300px] lg:h-[350px]"
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.overlayColor}`} />
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center p-6 md:p-10 lg:p-12">
                <div className="space-y-2 md:space-y-3 max-w-md">
                  <span className="inline-block bg-primary text-primary-foreground text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                    {banner.subtitle}
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base drop-shadow">
                    {banner.description}
                  </p>
                  <Link to={banner.link}>
                    <Button className="mt-2 bg-primary hover:bg-accent text-primary-foreground shadow-lg">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-md transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-md transition-all"
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
                i === current ? "w-6 bg-primary" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
