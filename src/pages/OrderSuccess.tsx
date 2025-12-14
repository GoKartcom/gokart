// src/pages/OrderSuccess.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Home } from "lucide-react";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_URL}/api/payment/order/${orderId}`);
      const data = await response.json();
      if (data.success) {
        setOrder(data.order);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-20 w-20 text-fresh-green mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your order has been confirmed and will be delivered in 10-15 minutes
          </p>

          {order && (
            <div className="rounded-xl border border-border bg-card p-6 mb-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">Order Details</h2>
                <span className="text-sm text-muted-foreground">#{order.orderId}</span>
              </div>

              <div className="space-y-3 mb-4">
                {order.items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between font-bold">
                  <span>Total Paid</span>
                  <span className="text-primary">₹{order.amount}</span>
                </div>
              </div>

              <div className="bg-fresh-green/10 rounded-lg p-4 flex items-start gap-3">
                <Truck className="h-5 w-5 text-fresh-green flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-fresh-green">Delivering to:</p>
                  <p className="text-foreground mt-1">
                    {order.deliveryAddress?.fullName}<br />
                    {order.deliveryAddress?.addressLine1}, {order.deliveryAddress?.addressLine2}<br />
                    {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}<br />
                    {order.deliveryAddress?.phone}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/products">
                <Package className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}