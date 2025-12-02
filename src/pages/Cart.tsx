import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, Clock, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import tomatoesImg from "@/assets/product-tomatoes.jpg";
import spinachImg from "@/assets/product-spinach.jpg";

const initialCartItems = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    vendor: "Lakshmi's Farm",
    price: 40,
    unit: "kg",
    quantity: 2,
    image: tomatoesImg,
  },
  {
    id: 2,
    name: "Organic Spinach",
    vendor: "Green Valley",
    price: 30,
    unit: "bunch",
    quantity: 1,
    image: spinachImg,
  },
];

const deliverySlots = [
  { id: 1, date: "Today", time: "5:00 PM - 7:00 PM", fee: 0 },
  { id: 2, date: "Tomorrow", time: "7:00 AM - 9:00 AM", fee: 0 },
  { id: 3, date: "Tomorrow", time: "10:00 AM - 12:00 PM", fee: 0 },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(1);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 200 ? 0 : 20;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any items yet.
            </p>
            <Link to="/products">
              <Button variant="hero" size="lg" className="mt-6">
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Your Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.vendor}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-primary">
                        ₹{item.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{item.unit}
                        </span>
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-secondary"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-secondary"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Slots */}
            <div className="mt-8">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                Select Delivery Slot
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {deliverySlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      selectedSlot === slot.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold text-foreground">{slot.date}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {slot.time}
                    </p>
                    {slot.fee === 0 && (
                      <span className="mt-2 inline-block rounded-full bg-fresh-green/10 px-2 py-0.5 text-xs font-medium text-fresh-green">
                        Free Delivery
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                Order Summary
              </h2>
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-fresh-green" : ""}>
                    {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                  </span>
                </div>
                {subtotal < 200 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{200 - subtotal} more for free delivery
                  </p>
                )}
              </div>
              <div className="mt-4 flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex gap-2">
                  <Input placeholder="Promo code" />
                  <Button variant="outline">Apply</Button>
                </div>
                <Button variant="hero" size="xl" className="w-full">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Secure checkout powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
