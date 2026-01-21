// src/pages/Orders.tsx - Fix line 191 and add null checks
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuthContext } from "@/context/AuthContext";
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";

interface Order {
  _id: string;
  orderId: string;
  amount: number;
  items: Array<{
    productId: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  status: string;
  paymentStatus: string;
  createdAt: string;
  deliveryAddress?: {
    fullName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
  };
}

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending" },
  confirmed: { icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-500/10", label: "Confirmed" },
  preparing: { icon: Package, color: "text-orange-500", bg: "bg-orange-500/10", label: "Preparing" },
  out_for_delivery: { icon: Truck, color: "text-purple-500", bg: "bg-purple-500/10", label: "Out for Delivery" },
  delivered: { icon: CheckCircle, color: "text-fresh-green", bg: "bg-fresh-green/10", label: "Delivered" },
  cancelled: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Cancelled" },
};

export default function Orders() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await fetch(`${API_URL}/api/payment/user-orders/${user.id}`);
        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your orders...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <Package className="h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your order history here!
            </p>
            <Button asChild size="lg">
              <Link to="/products">
                Browse Products
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
        <BackButton label="Back" className="mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Your Orders
        </h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <div
                key={order._id}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-card"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${status.bg}`}>
                        <StatusIcon className={`h-5 w-5 ${status.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Order ID</p>
                        <p className="font-medium text-foreground">#{order.orderId}</p>
                      </div>
                      <div className={`ml-auto px-3 py-1 rounded-full ${status.bg}`}>
                        <span className={`text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order Date</p>
                        <p className="text-sm font-medium">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-lg font-bold text-primary">₹{order.amount}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2 mb-4">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{order.items.length - 2} more items
                        </p>
                      )}
                    </div>

                    {/* Delivery Address - with null checks */}
                    {order.deliveryAddress && (
                      <div className="text-sm">
                        <p className="text-muted-foreground">Delivery Address</p>
                        <p className="text-foreground">
                          {order.deliveryAddress.fullName && `${order.deliveryAddress.fullName}, `}
                          {order.deliveryAddress.addressLine1 && `${order.deliveryAddress.addressLine1}, `}
                          {order.deliveryAddress.city && order.deliveryAddress.city}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:flex-col">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/order-success/${order.orderId}`}>
                        View Details
                      </Link>
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}