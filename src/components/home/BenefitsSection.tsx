import { Leaf, Users, Undo2, BadgeCheck } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Farm Fresh Guarantee",
    description: "No cold storage. Produce goes directly from vendor to your home within 24 hours of harvest.",
  },
  {
    icon: Users,
    title: "Trusted Local Vendors",
    description: "All vendors are verified and rated. Build relationships with your neighborhood sellers.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assured",
    description: "Every product comes with a freshness badge. Know exactly when it was harvested.",
  },
  {
    icon: Undo2,
    title: "Easy Returns",
    description: "Not satisfied? Get full refund or replacement. No questions asked within 24 hours.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Fresh, Local & <br />Delivered with Care
            </h2>
            <p className="text-lg text-muted-foreground">
              We're not just another delivery service. We're building a community that connects 
              families with trusted local vendors for healthier, fresher meals every day.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
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
      </div>
    </section>
  );
}
