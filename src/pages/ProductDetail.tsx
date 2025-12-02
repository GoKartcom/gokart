import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin, Minus, Plus, Truck, Shield, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import tomatoesImg from "@/assets/product-tomatoes.jpg";
import vendor1 from "@/assets/vendor-1.jpg";

const deliverySlots = [
  { id: 1, time: "7:00 AM - 9:00 AM", available: true },
  { id: 2, time: "10:00 AM - 12:00 PM", available: true },
  { id: 3, time: "2:00 PM - 4:00 PM", available: false },
  { id: 4, time: "5:00 PM - 7:00 PM", available: true },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  // Mock product data
  const product = {
    id: 1,
    name: "Fresh Tomatoes",
    vendor: "Lakshmi's Farm",
    vendorImage: vendor1,
    vendorRating: 4.9,
    vendorOrders: 1250,
    price: 40,
    unit: "kg",
    rating: 4.8,
    reviews: 156,
    freshness: "Harvested Today",
    description:
      "Farm-fresh tomatoes harvested this morning from our organic farm. Perfect for salads, curries, and everyday cooking. Rich in vitamins and antioxidants.",
    image: tomatoesImg,
    location: "Whitefield, Bangalore",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4">
              <span className="freshness-badge text-base">
                <Clock className="h-4 w-4" />
                {product.freshness}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {product.name}
              </h1>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-trust-gold text-trust-gold" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Vendor Card */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-4">
                <img
                  src={product.vendorImage}
                  alt={product.vendor}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{product.vendor}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-trust-gold text-trust-gold" />
                      {product.vendorRating}
                    </span>
                    <span>•</span>
                    <span>{product.vendorOrders}+ orders</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Shop
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {product.location}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Price & Quantity */}
            <div className="flex items-center justify-between rounded-2xl bg-secondary/50 p-4">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-display text-3xl font-bold text-primary">
                  ₹{product.price}
                  <span className="text-base font-normal text-muted-foreground">/{product.unit}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Delivery Slots */}
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold">Select Delivery Slot</h3>
              <div className="grid grid-cols-2 gap-3">
                {deliverySlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    className={`rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                      selectedSlot === slot.id
                        ? "border-primary bg-primary/10 text-primary"
                        : slot.available
                        ? "border-border bg-card text-foreground hover:border-primary/50"
                        : "cursor-not-allowed border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    <Clock className="mx-auto mb-1 h-4 w-4" />
                    {slot.time}
                    {!slot.available && <span className="block text-xs">Unavailable</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="hero" size="xl" className="flex-1">
                Add to Cart — ₹{product.price * quantity}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />
                Free delivery above ₹200
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                Quality guaranteed
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
