import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Clock, Plus, ShoppingCart, Flame, Percent, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import tomatoesImg from "@/assets/product-tomatoes.jpg";
import spinachImg from "@/assets/product-spinach.jpg";

const categories = ["All", "Vegetables", "Fruits", "Leafy Greens", "Organic", "Bestsellers", "Offers"];

const filterOptions = [
  { id: "eatables", label: "Eatables", icon: "🍽️" },
  { id: "fruits", label: "Fruits", icon: "🍎" },
  { id: "green-veggies", label: "Green Veggies", icon: "🥬" },
  { id: "ground-harvested", label: "Ground Harvested", icon: "🥔" },
  { id: "exotic", label: "Exotic", icon: "🥝" },
  { id: "seasonal", label: "Seasonal", icon: "🌸" },
  { id: "daily-essentials", label: "Daily Essentials", icon: "🧅" },
];

const products = [
  // VEGETABLES (prices reduced by 10%)
  { id: 1, name: "Fresh Tomatoes", vendor: "Lakshmi's Farm", price: 22, unit: "kg", rating: 4.8, freshness: "Harvested Today", image: tomatoesImg, category: "Vegetables", isBestseller: true, offer: 20 },
  { id: 2, name: "Fresh Carrots", vendor: "Organic Farms", price: 27, unit: "kg", rating: 4.6, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 3, name: "Green Capsicum", vendor: "Fresh Greens", price: 31, unit: "kg", rating: 4.5, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop", category: "Vegetables", offer: 15 },
  { id: 4, name: "Potatoes", vendor: "Vasai Farms", price: 18, unit: "kg", rating: 4.7, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1518977676601-b53f82ber499?w=400&h=400&fit=crop", category: "Vegetables", isBestseller: true },
  { id: 5, name: "Onions", vendor: "Local Market", price: 16, unit: "kg", rating: 4.8, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop", category: "Vegetables", isBestseller: true },
  { id: 6, name: "Cauliflower", vendor: "Green Valley", price: 25, unit: "piece", rating: 4.6, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 7, name: "Cabbage", vendor: "Organic Farms", price: 20, unit: "piece", rating: 4.5, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop", category: "Vegetables", offer: 10 },
  { id: 8, name: "Brinjal", vendor: "Lakshmi's Farm", price: 22, unit: "kg", rating: 4.4, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 9, name: "Lady Finger (Bhindi)", vendor: "Fresh Greens", price: 29, unit: "kg", rating: 4.6, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 10, name: "Bottle Gourd (Lauki)", vendor: "Vasai Farms", price: 16, unit: "piece", rating: 4.5, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 11, name: "Bitter Gourd (Karela)", vendor: "Organic Farms", price: 31, unit: "kg", rating: 4.3, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 12, name: "Pumpkin", vendor: "Local Market", price: 13, unit: "kg", rating: 4.6, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?w=400&h=400&fit=crop", category: "Vegetables", offer: 25 },
  { id: 13, name: "Green Peas", vendor: "Green Valley", price: 40, unit: "kg", rating: 4.8, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=400&fit=crop", category: "Vegetables", isBestseller: true },
  { id: 14, name: "Cucumber", vendor: "Fresh Greens", price: 18, unit: "kg", rating: 4.7, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 15, name: "Radish", vendor: "Vasai Farms", price: 16, unit: "bunch", rating: 4.4, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 16, name: "Beetroot", vendor: "Organic Farms", price: 25, unit: "kg", rating: 4.5, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 17, name: "Drumstick", vendor: "Local Market", price: 36, unit: "bunch", rating: 4.6, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae266d6?w=400&h=400&fit=crop", category: "Vegetables" },
  { id: 18, name: "French Beans", vendor: "Green Valley", price: 34, unit: "kg", rating: 4.5, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae266d6?w=400&h=400&fit=crop", category: "Vegetables" },
  
  // LEAFY GREENS (prices reduced by 10%)
  { id: 19, name: "Organic Spinach", vendor: "Green Valley", price: 13, unit: "bunch", rating: 4.9, freshness: "Harvested Today", image: spinachImg, category: "Leafy Greens", isBestseller: true, offer: 30 },
  { id: 20, name: "Coriander (Dhaniya)", vendor: "Local Market", price: 9, unit: "bunch", rating: 4.8, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1592502712628-4c3a6ae6e5de?w=400&h=400&fit=crop", category: "Leafy Greens" },
  { id: 21, name: "Mint (Pudina)", vendor: "Fresh Greens", price: 9, unit: "bunch", rating: 4.7, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop", category: "Leafy Greens" },
  { id: 22, name: "Fenugreek (Methi)", vendor: "Organic Farms", price: 11, unit: "bunch", rating: 4.6, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&h=400&fit=crop", category: "Leafy Greens", offer: 20 },
  { id: 23, name: "Curry Leaves", vendor: "Vasai Farms", price: 7, unit: "bunch", rating: 4.8, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1600689052253-883c5a625ff4?w=400&h=400&fit=crop", category: "Leafy Greens" },
  { id: 24, name: "Amaranth (Lal Bhaji)", vendor: "Green Valley", price: 13, unit: "bunch", rating: 4.5, freshness: "Harvested Today", image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=400&h=400&fit=crop", category: "Leafy Greens" },
  
  // FRUITS (prices reduced by 10%)
  { id: 25, name: "Bananas", vendor: "Tropical Fruits", price: 22, unit: "dozen", rating: 4.8, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop", category: "Fruits", isBestseller: true },
  { id: 26, name: "Sweet Mangoes", vendor: "Rajesh Fruits", price: 72, unit: "kg", rating: 4.7, freshness: "1 Day Ago", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop", category: "Fruits", offer: 15 },
  { id: 27, name: "Apples", vendor: "Kashmir Orchards", price: 108, unit: "kg", rating: 4.8, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop", category: "Fruits", isBestseller: true },
  { id: 28, name: "Oranges", vendor: "Nagpur Fresh", price: 45, unit: "kg", rating: 4.6, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop", category: "Fruits", offer: 20 },
  { id: 29, name: "Papaya", vendor: "Tropical Fruits", price: 31, unit: "piece", rating: 4.5, freshness: "Ripe & Fresh", image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=400&fit=crop", category: "Fruits" },
  { id: 30, name: "Watermelon", vendor: "Local Market", price: 18, unit: "kg", rating: 4.7, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop", category: "Fruits", offer: 25 },
  { id: 31, name: "Pomegranate", vendor: "Rajesh Fruits", price: 90, unit: "kg", rating: 4.8, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400&h=400&fit=crop", category: "Fruits", isBestseller: true },
  { id: 32, name: "Grapes", vendor: "Nashik Vineyards", price: 54, unit: "kg", rating: 4.7, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=400&fit=crop", category: "Fruits", offer: 10 },
  { id: 33, name: "Guava", vendor: "Tropical Fruits", price: 36, unit: "kg", rating: 4.6, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&h=400&fit=crop", category: "Fruits" },
  { id: 34, name: "Sweet Lime (Mosambi)", vendor: "Local Market", price: 40, unit: "kg", rating: 4.5, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop", category: "Fruits" },
  { id: 35, name: "Pineapple", vendor: "Rajesh Fruits", price: 45, unit: "piece", rating: 4.7, freshness: "Ripe & Fresh", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop", category: "Fruits" },
  { id: 36, name: "Coconut", vendor: "Kerala Fresh", price: 27, unit: "piece", rating: 4.8, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1580984969071-a8da8c33df60?w=400&h=400&fit=crop", category: "Fruits" },
  { id: 37, name: "Lemon", vendor: "Local Market", price: 54, unit: "kg", rating: 4.6, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&h=400&fit=crop", category: "Fruits" },
  { id: 38, name: "Chickoo (Sapota)", vendor: "Tropical Fruits", price: 63, unit: "kg", rating: 4.5, freshness: "Ripe & Fresh", image: "https://images.unsplash.com/photo-1478145787956-f6f12c59624d?w=400&h=400&fit=crop", category: "Fruits" },
  { id: 39, name: "Custard Apple", vendor: "Rajesh Fruits", price: 81, unit: "kg", rating: 4.6, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1568702846914-96b305d2uj38?w=400&h=400&fit=crop", category: "Fruits" },
  { id: 40, name: "Jackfruit", vendor: "Kerala Fresh", price: 36, unit: "kg", rating: 4.4, freshness: "Fresh Stock", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=400&fit=crop", category: "Fruits" },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = 
      activeCategory === "All" || 
      product.category === activeCategory ||
      (activeCategory === "Bestsellers" && product.isBestseller) ||
      (activeCategory === "Offers" && product.offer);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const dealOfTheDay = products.find(p => p.offer && p.offer >= 25);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: product.id,
      name: product.name,
      vendor: product.vendor,
      price: product.price,
      unit: product.unit,
      image: product.image,
      offer: product.offer,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Fresh Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse through our selection of fresh produce from local vendors
          </p>
        </div>

        {/* Expected Delivery Banner */}
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-fresh-green/10 px-4 py-3 text-fresh-green">
          <Truck className="h-5 w-5" />
          <span className="text-sm font-medium">Expected Delivery: 10-15 minutes</span>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-9 text-sm"
            />
          </div>
          <Button 
            variant={showFilters ? "default" : "outline"} 
            className="md:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </Button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    activeFilters.includes(filter.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
            {activeFilters.length > 0 && (
              <button 
                onClick={() => setActiveFilters([])}
                className="mt-3 text-xs text-muted-foreground hover:text-primary"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Deal of the Day */}
        {dealOfTheDay && (
          <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center p-6 gap-6">
              <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={dealOfTheDay.image} alt={dealOfTheDay.name} className="h-full w-full object-cover" />
                <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Flame className="h-4 w-4" /> {dealOfTheDay.offer}% OFF
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">🔥 Deal of the Day</span>
                <h3 className="font-display text-2xl font-bold text-foreground mt-1">{dealOfTheDay.name}</h3>
                <p className="text-muted-foreground mt-1">From {dealOfTheDay.vendor}</p>
                <div className="flex items-center gap-3 mt-3 justify-center md:justify-start">
                  <span className="text-3xl font-bold text-primary">₹{Math.round(dealOfTheDay.price * (1 - dealOfTheDay.offer / 100))}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{dealOfTheDay.price}</span>
                  <span className="text-sm text-muted-foreground">/{dealOfTheDay.unit}</span>
                </div>
                <Button className="mt-4" onClick={(e) => handleAddToCart(e, dealOfTheDay)}>
                  <Plus className="h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Bestsellers Section */}
        {activeCategory === "All" && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Bestsellers</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {bestsellers.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:shadow-card"
                >
                  <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{product.name}</h4>
                    <p className="text-sm text-primary font-bold">₹{product.price}/{product.unit}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-2 top-2 flex flex-col gap-0.5">
                  {product.offer && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-medium text-destructive-foreground">
                      <Percent className="h-2.5 w-2.5" /> {product.offer}%
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-trust-gold px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                      <Flame className="h-2.5 w-2.5" /> Best
                    </span>
                  )}
                </div>
              </div>
              <div className="p-2.5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground truncate">{product.vendor}</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-trust-gold text-trust-gold" />
                    <span className="text-[10px] font-medium">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-medium text-sm text-foreground truncate">
                  {product.name}
                </h3>
                <div className="mt-1.5 flex items-center justify-between">
                  <div>
                    {product.offer ? (
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-bold text-primary">
                          ₹{Math.round(product.price * (1 - product.offer / 100))}
                        </p>
                        <p className="text-[10px] text-muted-foreground line-through">₹{product.price}</p>
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-primary">₹{product.price}</p>
                    )}
                    <span className="text-xs text-muted-foreground">per {product.unit}</span>
                  </div>
                  <Button size="sm" onClick={(e) => handleAddToCart(e, product)}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
