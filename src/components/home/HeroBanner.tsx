import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Fresh Vegetables",
    subtitle: "Farm to table in 15 minutes",
    description: "Get the freshest vegetables delivered to your doorstep",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80",
    cta: "Shop Now",
    link: "/products?category=vegetables",
    gradient: "from-green-600/90 to-green-800/90",
  },
  {
    id: 2,
    title: "Exotic Fruits",
    subtitle: "Handpicked daily",
    description: "Premium quality fruits from the best orchards",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&q=80",
    cta: "Explore",
    link: "/products?category=fruits",
    gradient: "from-orange-600/90 to-red-600/90",
  },
  {
    id: 3,
    title: "Dairy Essentials",
    subtitle: "Fresh & Pure",
    description: "Milk, cheese, butter and more delivered fresh",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80",
    cta: "Order Now",
    link: "/products?category=dairy",
    gradient: "from-blue-600/90 to-cyan-600/90",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full"
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
          
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-lg text-white">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4">
                <Clock className="w-4 h-4" />
                {banner.subtitle}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">
                {banner.title}
              </h1>
              <p className="text-base md:text-lg opacity-90 mb-6">{banner.description}</p>
              <div className="flex items-center gap-4">
                <Link to={banner.link}>
                  <Button
                    size="lg"
                    className="bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg"
                  >
                    {banner.cta}
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4" />
                  <span>Free delivery over ₹199</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
