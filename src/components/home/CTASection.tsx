import { Button } from "@/components/ui/button";
import { ArrowRight, Store } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-3xl bg-primary">
          <div className="relative p-8 md:p-12 lg:p-16">
            {/* Decorative Elements */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary-foreground/10" />

            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                  Ready to Experience Fresh?
                </h2>
                <p className="text-lg text-primary-foreground/80">
                  Join thousands of happy customers enjoying farm-fresh produce
                  delivered on their schedule. Or become a vendor and grow your
                  business with us.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                <Link to="/shop">
                  <Button
                    size="xl"
                    className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 sm:w-auto"
                  >
                    Shop Fresh Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a href="https://klickit-merchant.vercel.app/">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                  >
                    <Store className="h-5 w-5" />
                    Join as Vendor
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
