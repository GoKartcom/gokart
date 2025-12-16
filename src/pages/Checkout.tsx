// src/pages/Checkout.tsx - Add these imports and update the component
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useAuthContext } from "@/context/AuthContext";
import { useLocation } from "@/context/LocationContext";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Loader, 
  CreditCard, 
  Truck, 
  MapPin, 
  Plus, 
  Home, 
  Building, 
  MapPinned,
  Navigation,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuthContext();
  const { addresses, currentAddress, addAddress } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newAddress, setNewAddress] = useState({
    label: "Home",
    name: user?.name || "",
    phone: user?.phone || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const deliveryFee = subtotal >= 200 ? 0 : 20;
  const total = subtotal + deliveryFee;

  // Set current address as selected if available
  useEffect(() => {
    if (currentAddress && addresses.length > 0) {
      setSelectedAddressId(currentAddress.id);
    } else if (addresses.length === 0) {
      setShowNewAddressForm(true);
    }
  }, [currentAddress, addresses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Detect current location using Geolocation API
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingLocation(true);
    toast.info("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get address from coordinates
          // Using OpenStreetMap Nominatim API (free, no API key needed)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          
          const data = await response.json();
          
          if (data && data.address) {
            const address = data.address;
            
            // Auto-fill the form with detected location
            setNewAddress({
              ...newAddress,
              addressLine1: `${address.road || address.suburb || address.neighbourhood || ''}`,
              addressLine2: address.suburb !== address.road ? address.suburb || '' : '',
              city: address.city || address.town || address.village || '',
              state: address.state || '',
              pincode: address.postcode || '',
            });
            
            setShowNewAddressForm(true);
            toast.success("Location detected! Please verify the details.");
          } else {
            toast.error("Could not fetch address details");
          }
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          toast.error("Failed to get address from location");
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Location permission denied. Please enable location access.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information unavailable");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out");
            break;
          default:
            toast.error("Failed to detect location");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Search address using Nominatim API
  const handleSearchAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error("Please enter an address to search");
      return;
    }

    try {
      toast.info("Searching for address...");
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=1&countrycodes=in`
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const address = result.address;
        
        // Auto-fill form with searched address
        setNewAddress({
          ...newAddress,
          addressLine1: `${address.road || address.suburb || address.neighbourhood || searchQuery}`,
          addressLine2: address.suburb !== address.road ? address.suburb || '' : '',
          city: address.city || address.town || address.village || '',
          state: address.state || '',
          pincode: address.postcode || '',
        });
        
        setShowNewAddressForm(true);
        setSearchQuery("");
        toast.success("Address found! Please verify the details.");
      } else {
        toast.error("No address found. Try a different search term.");
      }
    } catch (error) {
      console.error("Address search error:", error);
      toast.error("Failed to search address");
    }
  };

  const handleSaveNewAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.addressLine1 || 
        !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast.error("Please fill all required fields");
      return;
    }

    addAddress(newAddress);
    setShowNewAddressForm(false);
    setSearchQuery("");
  };

  // ... rest of the payment handling code remains the same ...
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const selectedAddr = addresses.find(addr => addr.id === selectedAddressId);
    
    if (!selectedAddr) {
      toast.error("Please select a delivery address");
      return;
    }

    setIsProcessing(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway");
      setIsProcessing(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const orderResponse = await fetch(`${API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          userId: user?.id,
          items: items,
          deliveryAddress: {
            fullName: selectedAddr.name,
            phone: selectedAddr.phone,
            addressLine1: selectedAddr.addressLine1,
            addressLine2: selectedAddr.addressLine2,
            city: selectedAddr.city,
            state: selectedAddr.state,
            pincode: selectedAddr.pincode,
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message);
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Klickit",
        description: "Fresh Vegetables & Fruits",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch(`${API_URL}/api/payment/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              clearCart();
              toast.success("Payment successful! Order placed.");
              navigate(`/order-success/${response.razorpay_order_id}`);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment verification failed");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: selectedAddr.name,
          contact: selectedAddr.phone,
        },
        theme: {
          color: "#10b981",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const addressIcons = {
    Home: Home,
    Work: Building,
    Other: MapPinned,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Delivery Address Section */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">
                  Delivery Address
                </h2>
              </div>

              {!showNewAddressForm ? (
                <div className="space-y-4">
                  {/* Location Detection and Search */}
                  <div className="grid gap-3 sm:grid-cols-2 mb-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                    >
                      {isDetectingLocation ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin" />
                          Detecting...
                        </>
                      ) : (
                        <>
                          <Navigation className="h-4 w-4 text-primary" />
                          Use my current location
                        </>
                      )}
                    </Button>

                    <form onSubmit={handleSearchAddress} className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search for area, street..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </form>
                  </div>

                  {/* Saved Addresses */}
                  {addresses.length > 0 && (
                    <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                      <div className="space-y-3">
                        {addresses.map((address) => {
                          const IconComponent = addressIcons[address.label as keyof typeof addressIcons] || Home;
                          return (
                            <div
                              key={address.id}
                              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedAddressId === address.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => setSelectedAddressId(address.id)}
                            >
                              <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                                <IconComponent className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-foreground">{address.label}</span>
                                  {address.isDefault && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-foreground font-medium">{address.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {address.addressLine1}
                                  {address.addressLine2 && `, ${address.addressLine2}`}
                                  <br />
                                  {address.city}, {address.state} - {address.pincode}
                                  <br />
                                  {address.phone}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  )}

                  {/* Add New Address Button */}
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => setShowNewAddressForm(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Deliver to a different address
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* New Address Form */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-foreground">Add New Address</h3>
                    {addresses.length > 0 && (
                      <Button variant="ghost" size="sm" onClick={() => {
                        setShowNewAddressForm(false);
                        setSearchQuery("");
                      }}>
                        Cancel
                      </Button>
                    )}
                  </div>

                  <RadioGroup value={newAddress.label} onValueChange={(value) => setNewAddress({ ...newAddress, label: value })}>
                    <div className="flex gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Home" id="label-home" />
                        <Label htmlFor="label-home">Home</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Work" id="label-work" />
                        <Label htmlFor="label-work">Work</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Other" id="label-other" />
                        <Label htmlFor="label-other">Other</Label>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={newAddress.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={newAddress.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={newAddress.addressLine1}
                        onChange={handleInputChange}
                        placeholder="House No., Street Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={newAddress.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Landmark, Area (Optional)"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={newAddress.city}
                          onChange={handleInputChange}
                          placeholder="Mumbai"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={newAddress.state}
                          onChange={handleInputChange}
                          placeholder="Maharashtra"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={newAddress.pincode}
                          onChange={handleInputChange}
                          placeholder="400001"
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveNewAddress} className="w-full">
                      Save and Continue
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary - remains the same */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => {
                  const itemPrice = item.offer
                    ? Math.round(item.price * (1 - item.offer / 100))
                    : item.price;
                  return (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">₹{itemPrice * item.quantity}</span>
                    </div>
                  );
                })}

                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-fresh-green">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-primary text-xl">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-lg bg-fresh-green/10 px-3 py-2 text-sm text-fresh-green">
                <Truck className="h-4 w-4" />
                <span>Delivery in 10-15 minutes</span>
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing || !selectedAddressId}
              >
                {isProcessing ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Pay ₹{total}
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secured by Razorpay Payment Gateway
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}