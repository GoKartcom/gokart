import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, Clock, RefreshCcw, AlertCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const refundSteps = [
  {
    icon: AlertCircle,
    title: "Report Issue",
    description: "Contact us within 24 hours of delivery with photos of the issue.",
  },
  {
    icon: Clock,
    title: "Quick Review",
    description: "Our team reviews your request within 2-4 hours.",
  },
  {
    icon: RefreshCcw,
    title: "Resolution",
    description: "Get a replacement or full refund—your choice.",
  },
];

const policies = [
  {
    title: "Fresh Produce Quality Guarantee",
    items: [
      "100% refund if produce is not fresh upon delivery",
      "Free replacement for damaged or wilted items",
      "No questions asked for quality-related returns",
    ],
  },
  {
    title: "Cancellation Policy",
    items: [
      "Free cancellation up to 2 hours before scheduled delivery",
      "50% refund for cancellations within 2 hours of delivery",
      "No refund once delivery partner has picked up the order",
    ],
  },
  {
    title: "Refund Timeline",
    items: [
      "Instant refund to GoKartcom wallet",
      "3-5 business days for bank/card refunds",
      "UPI refunds processed within 24 hours",
    ],
  },
  {
    title: "Non-Refundable Items",
    items: [
      "Items consumed or used",
      "Orders reported after 24 hours of delivery",
      "Issues not supported with photo evidence",
    ],
  },
];

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Customer First
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Refund & Return Policy
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Your satisfaction is our priority. If something isn't right with your order, 
              we'll make it right—guaranteed.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-b border-border bg-card py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-display text-2xl font-bold text-foreground md:text-3xl">
              How Returns Work
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {refundSteps.map((step, index) => (
                <div key={step.title} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-primary/20 md:block last:hidden" />
                  <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                    Step {index + 1}
                  </span>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              {policies.map((policy) => (
                <div
                  key={policy.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <h3 className="mb-4 font-display text-xl font-semibold text-foreground">
                    {policy.title}
                  </h3>
                  <ul className="space-y-3">
                    {policy.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Track Refund Status */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl bg-card p-8 text-center shadow-card md:p-12">
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
                Track Your Refund Status
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                Already submitted a return request? Check the status of your refund or replacement.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  placeholder="Enter Order ID"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button variant="hero">Track Status</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
              Need Help?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Our support team is available 7 days a week to help resolve your concerns.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <a
                href="tel:+919529647402"
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-6 py-3 font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <Phone className="h-5 w-5" />
                +91 9529647402
              </a>
              <a
                href="mailto:gokartcomm@gmail.com"
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-6 py-3 font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <Mail className="h-5 w-5" />
                gokartcomm@gmail.com
              </a>
            </div>
            <div className="mt-8">
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Visit Help Center
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
