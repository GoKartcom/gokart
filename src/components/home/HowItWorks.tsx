import { Search, CalendarClock, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    description: "Explore fresh produce from verified local vendors. See origin, freshness ratings, and prices.",
    color: "bg-fresh-green/10 text-fresh-green",
  },
  {
    icon: CalendarClock,
    title: "Schedule Delivery",
    description: "Choose your preferred delivery slot that fits your schedule. Morning, afternoon, or evening.",
    color: "bg-soft-orange/10 text-soft-orange",
  },
  {
    icon: PackageCheck,
    title: "Fresh at Doorstep",
    description: "Receive farm-fresh produce directly from vendors. Quality guaranteed or money back.",
    color: "bg-trust-gold/10 text-trust-gold",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 gradient-fresh">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Getting fresh produce from local vendors has never been easier. Just three simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-16 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-fresh-green via-soft-orange to-trust-gold lg:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl bg-card p-8 shadow-soft transition-all duration-300 hover:shadow-card"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.color}`}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="font-display text-5xl font-bold text-muted/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
