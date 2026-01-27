import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Wallet,
  TrendingUp,
  Smartphone,
  Users,
  CheckCircle,
  ArrowRight,
  Store,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import vendor2 from "@/assets/vendor-2.jpg";
import { BackButton } from "@/components/BackButton";

const benefits = [
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Reach thousands of new customers in your city without any additional overhead.",
  },
  {
    icon: Wallet,
    title: "Fast Payouts",
    description: "Get paid weekly directly to your bank account. No delays, no hassle.",
  },
  {
    icon: Smartphone,
    title: "Easy-to-Use App",
    description: "Manage inventory, track orders, and communicate with customers—all from one app.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Our team is here to help you succeed with training, tips, and 24/7 assistance.",
  },
];

const steps = [
  { step: "01", title: "Sign Up", description: "Fill out the form with your business details" },
  { step: "02", title: "Verification", description: "Quick document verification (24-48 hours)" },
  { step: "03", title: "Training", description: "Brief onboarding on using our vendor app" },
  { step: "04", title: "Go Live", description: "Start receiving orders and grow your business" },
];

export default function Vendor() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    businessName: "",
    location: "",
    products: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 24-48 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <BackButton className="mb-4" />
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                  <Store className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Join 500+ vendors</span>
                </div>
                <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
                  Grow Your Business<br />with FreshLocal
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join our network of trusted local vendors. Reach more customers, earn more, 
                  and build lasting relationships—all while doing what you love.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-fresh-green" />
                    No joining fees
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-fresh-green" />
                    Weekly payouts
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-fresh-green" />
                    Free training
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={vendor2}
                  alt="Happy vendor"
                  className="rounded-3xl shadow-elevated"
                />
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-card p-4 shadow-card">
                  <p className="text-sm text-muted-foreground">Avg. monthly earnings</p>
                  <p className="font-display text-3xl font-bold text-primary">₹45,000+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Why Join Us
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Benefits for Vendors
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-card"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Getting Started
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                How to Join
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < steps.length - 1 && (
                    <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-border md:block" />
                  )}
                  <div className="relative rounded-2xl bg-card p-6 shadow-soft">
                    <span className="font-display text-4xl font-bold text-primary/20">{step.step}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signup Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Join Now
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Vendor Application
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24-48 hours.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-soft">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Full Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Phone Number *</label>
                    <Input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Business/Shop Name *</label>
                  <Input
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Your shop or business name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Location *</label>
                  <Input
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Area, City"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Products You Sell *</label>
                  <Textarea
                    required
                    value={formData.products}
                    onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                    placeholder="e.g., Fresh vegetables, fruits, organic produce..."
                    rows={3}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Submit Application
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
