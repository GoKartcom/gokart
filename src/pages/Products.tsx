import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Clock, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import tomatoesImg from "@/assets/product-tomatoes.jpg";
import spinachImg from "@/assets/product-spinach.jpg";

const categories = ["All", "Vegetables", "Fruits", "Leafy Greens", "Organic", "Seasonal"];

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    vendor: "Lakshmi's Farm",
    price: 40,
    unit: "kg",
    rating: 4.8,
    freshness: "Harvested Today",
    image: tomatoesImg,
    category: "Vegetables",
  },
  {
    id: 2,
    name: "Organic Spinach",
    vendor: "Green Valley",
    price: 30,
    unit: "bunch",
    rating: 4.9,
    freshness: "Harvested Today",
    image: spinachImg,
    category: "Leafy Greens",
  },
  {
    id: 3,
    name: "Sweet Mangoes",
    vendor: "Rajesh Fruits",
    price: 120,
    unit: "kg",
    rating: 4.7,
    freshness: "1 Day Ago",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    category: "Fruits",
  },
  {
    id: 4,
    name: "Fresh Carrots",
    vendor: "Organic Farms",
    price: 45,
    unit: "kg",
    rating: 4.6,
    freshness: "Harvested Today",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    category: "Vegetables",
  },
  {
    id: 5,
    name: "Green Capsicum",
    vendor: "Fresh Greens",
    price: 60,
    unit: "kg",
    rating: 4.5,
    freshness: "Harvested Today",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
    category: "Vegetables",
  },
  {
    id: 6,
    name: "Bananas",
    vendor: "Tropical Fruits",
    price: 35,
    unit: "dozen",
    rating: 4.8,
    freshness: "2 Days Ago",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop",
    category: "Fruits",
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

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

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-card"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <span className="freshness-badge">
                    <Clock className="h-3 w-3" />
                    {product.freshness}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="vendor-badge">{product.vendor}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-trust-gold text-trust-gold" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {product.name}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">
                    ₹{product.price}
                    <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
                  </p>
                  <Button size="sm" variant="fresh" onClick={(e) => e.preventDefault()}>
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
