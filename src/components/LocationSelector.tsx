// src/components/LocationSelector.tsx - Updated version
import { useState } from "react";
import { 
  MapPin, 
  ChevronDown, 
  Plus, 
  Edit, 
  Trash, 
  Home as HomeIcon, 
  Building, 
  MapPinned,
  Navigation,
  Search,
  Loader
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "@/context/LocationContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export function LocationSelector() {
  const { currentAddress, addresses, setCurrentAddress, addAddress, deleteAddress } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  });

  const addressIcons = {
    Home: HomeIcon,
    Work: Building,
    Other: MapPinned,
  };

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
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          
          const data = await response.json();
          
          if (data && data.address) {
            const address = data.address;
            
            setNewAddress({
              ...newAddress,
              addressLine1: `${address.road || address.suburb || address.neighbourhood || ''}`,
              addressLine2: address.suburb !== address.road ? address.suburb || '' : '',
              city: address.city || address.town || address.village || '',
              state: address.state || '',
              pincode: address.postcode || '',
            });
            
            setShowAddForm(true);
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
        
        setNewAddress({
          ...newAddress,
          addressLine1: `${address.road || address.suburb || address.neighbourhood || searchQuery}`,
          addressLine2: address.suburb !== address.road ? address.suburb || '' : '',
          city: address.city || address.town || address.village || '',
          state: address.state || '',
          pincode: address.postcode || '',
        });
        
        setShowAddForm(true);
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

  const handleSaveAddress = () => {
    if (!newAddress.name || !newAddress.addressLine1 || !newAddress.city || 
        !newAddress.state || !newAddress.pincode || !newAddress.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    addAddress(newAddress);
    setNewAddress({
      label: "Home",
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isDefault: false,
    });
    setShowAddForm(false);
    setSearchQuery("");
  };

  const handleSelectAddress = (address: typeof addresses[0]) => {
    setCurrentAddress(address);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-sm font-medium hover:bg-secondary"
        >
          <MapPin className="h-4 w-4 text-primary" />
          <div className="text-left hidden md:block">
            <div className="text-xs text-muted-foreground">Delivery in 8 minutes</div>
            <div className="font-medium text-foreground flex items-center gap-1">
              {currentAddress 
                ? `${currentAddress.addressLine1.substring(0, 30)}...`
                : "Select delivery location"
              }
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
          <div className="md:hidden">
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Change Location</DialogTitle>
        </DialogHeader>

        {!showAddForm ? (
          <div className="space-y-4">
            {/* Location Detection and Search */}
            <div className="grid gap-3 sm:grid-cols-2">
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
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
              <div>
                <h3 className="font-medium text-foreground mb-3">Your saved addresses</h3>
                <div className="space-y-2">
                  {addresses.map((address) => {
                    const IconComponent = addressIcons[address.label as keyof typeof addressIcons] || HomeIcon;
                    return (
                      <div
                        key={address.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          currentAddress?.id === address.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleSelectAddress(address)}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
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
                          <p className="text-sm text-muted-foreground">
                            {address.name}, {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Implement edit functionality
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAddress(address.id);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4" />
              Add new address
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Add New Address</h3>
              <Button variant="ghost" size="sm" onClick={() => {
                setShowAddForm(false);
                setSearchQuery("");
              }}>
                Cancel
              </Button>
            </div>

            <RadioGroup value={newAddress.label} onValueChange={(value) => setNewAddress({ ...newAddress, label: value })}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Home" id="home" />
                  <Label htmlFor="home">Home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Work" id="work" />
                  <Label htmlFor="work">Work</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </div>
            </RadioGroup>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    placeholder="Aryan Parshva"
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
                  placeholder="B62, Pocket B, South City I"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={newAddress.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Near vidhya mandir Marg, 100ft road"
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
                    placeholder="Vasai West"
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
                    placeholder="401210"
                    maxLength={6}
                  />
                </div>
              </div>

              <Button onClick={handleSaveAddress} className="w-full">
                Save Address
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}