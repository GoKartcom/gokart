import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, MapPin, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MainNavbar = () => {
  const navigate = useNavigate();
  const { items, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = totalItems;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center shadow-orange">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground hidden sm:block">
              FreshMart
            </span>
          </Link>

          {/* Location - Desktop */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Delivering to</span>
            <button className="font-medium text-foreground hover:text-primary transition-colors">
              Select Location ▼
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for groceries, fruits, vegetables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-full bg-secondary border-0 focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Profile - Desktop */}
            <Link to="/profile" className="hidden md:block">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Login Button - Desktop */}
            <Link to="/register" className="hidden md:block">
              <Button className="gradient-orange border-0 shadow-orange font-semibold">
                Login
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-display font-bold">Menu</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-10 rounded-full bg-secondary border-0"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="flex-1 p-4 space-y-2">
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      <span className="font-medium">Home</span>
                    </Link>
                    <Link
                      to="/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                    >
                      <Search className="w-5 h-5 text-primary" />
                      <span className="font-medium">Products</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                    >
                      <User className="w-5 h-5 text-primary" />
                      <span className="font-medium">Profile</span>
                    </Link>
                  </div>

                  <div className="p-4 border-t border-border">
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full gradient-orange border-0 shadow-orange font-semibold">
                        Login / Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
