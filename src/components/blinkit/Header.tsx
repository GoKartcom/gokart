import { Search, MapPin, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import klickitLogo from "@/assets/klickit-logo.png";

export function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={klickitLogo} alt="Klickit" className="h-12 w-auto" />
          </Link>

          {/* Location Selector */}
          <button className="hidden md:flex items-center gap-2 text-sm hover:bg-secondary px-3 py-2 rounded-lg transition-colors">
            <MapPin className="h-4 w-4 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Delivery in</p>
              <p className="font-semibold text-foreground flex items-center gap-1">
                8 minutes <ChevronDown className="h-3 w-3" />
              </p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 bg-secondary border-0 h-11"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.name || "Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart">
              <Button className="bg-primary hover:bg-accent text-primary-foreground gap-2 px-4">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="font-semibold">{totalItems} items</span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
