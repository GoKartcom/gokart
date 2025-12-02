import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-produce.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-fresh-green" />
              <span className="text-sm font-medium text-primary">Fresh from local vendors</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Fresh Produce,{" "}
              <span className="text-primary">Delivered</span> on Your Schedule
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              Connect directly with trusted neighbourhood vendors for the freshest fruits and vegetables. 
              No cold storage, no middlemen — just farm-fresh goodness at your doorstep.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/products">
                <Button variant="hero" size="xl">
                  Start Shopping
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/vendor">
                <Button variant="hero-outline" size="xl">
                  Become a Vendor
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span>100% Fresh<br />Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <span>Scheduled<br />Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <span>Same Day<br />Available</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-elevated">
              <img
                src={heroImage}
                alt="Fresh fruits and vegetables"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-4 shadow-card animate-float">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fresh-green/10">
                  <span className="text-2xl">🥬</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">500+ Vendors</p>
                  <p className="text-xs text-muted-foreground">Trusted partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
