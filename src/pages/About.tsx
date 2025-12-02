import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Users, TrendingUp, Heart } from "lucide-react";
import vendor1 from "@/assets/vendor-1.jpg";
import vendor2 from "@/assets/vendor-2.jpg";

const stats = [
  { value: "500+", label: "Local Vendors" },
  { value: "50K+", label: "Happy Customers" },
  { value: "100K+", label: "Orders Delivered" },
  { value: "25+", label: "Cities Covered" },
];

const values = [
  {
    icon: Leaf,
    title: "Freshness First",
    description: "No cold storage, no preservatives. Just farm-fresh produce harvested and delivered within 24 hours.",
  },
  {
    icon: Users,
    title: "Community Connection",
    description: "We bridge the gap between local vendors and urban families, fostering trust and relationships.",
  },
  {
    icon: TrendingUp,
    title: "Vendor Growth",
    description: "Our vendors earn more by reaching customers directly, with fast weekly payouts and business support.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "100% satisfaction guaranteed. If it's not fresh, we replace it—no questions asked.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Story
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Bringing Fresh Produce<br />From Farm to Family
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              FreshLocal was born from a simple belief: everyone deserves access to truly fresh, 
              locally-sourced produce while supporting the vendors in their community.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Our Mission
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Reinventing the Local Market Experience
                </h2>
                <p className="mt-6 text-muted-foreground">
                  In a world of dark stores and cold storage, we chose a different path. FreshLocal 
                  partners with neighborhood vendors—the same families who've been selling fresh 
                  produce for generations—to bring their goods directly to your doorstep.
                </p>
                <p className="mt-4 text-muted-foreground">
                  No middlemen. No warehouses. Just the freshest fruits and vegetables, harvested 
                  today, delivered tomorrow, with the trust and care that only comes from knowing 
                  exactly where your food comes from.
                </p>
              </div>
              <div className="grid gap-4">
                <img
                  src={vendor1}
                  alt="Local vendor"
                  className="rounded-2xl shadow-card"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                What We Stand For
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Our Core Values
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl bg-card p-6 shadow-soft"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Stories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Vendor Stories
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                The Faces Behind Your Food
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex gap-6 rounded-2xl bg-card p-6 shadow-soft">
                <img
                  src={vendor1}
                  alt="Lakshmi Devi"
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">Lakshmi Devi</h3>
                  <p className="text-sm text-primary">Vegetable Vendor • Whitefield</p>
                  <p className="mt-3 text-muted-foreground">
                    "For 20 years, I sold vegetables at the local market. FreshLocal helped me reach 
                    customers across the city while keeping the personal connection I cherish."
                  </p>
                </div>
              </div>
              <div className="flex gap-6 rounded-2xl bg-card p-6 shadow-soft">
                <img
                  src={vendor2}
                  alt="Rajesh Kumar"
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">Rajesh Kumar</h3>
                  <p className="text-sm text-primary">Fruit Vendor • Koramangala</p>
                  <p className="mt-3 text-muted-foreground">
                    "My family has been in the fruit business for three generations. With FreshLocal, 
                    we've grown our customer base by 300% while maintaining our quality standards."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
