import { Clock, MapPin, Truck } from "lucide-react";
import { useLocation } from "@/context/LocationContext";

export function DeliveryBanner() {
  const { currentAddress } = useLocation();

  const displayLocation = currentAddress 
    ? `${currentAddress.city}, ${currentAddress.pincode}` 
    : "Mumbai Vasai";

  return (
    <div className="bg-blinkit-green text-white py-1.5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Truck className="h-3 w-3" />
            <span className="font-medium">Free Delivery</span>
          </div>
          <span className="text-white/50">|</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>10-15 mins delivery</span>
          </div>
          <span className="text-white/50 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-[150px]">{displayLocation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
