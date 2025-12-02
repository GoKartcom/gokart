import { Star } from "lucide-react";
import vendor1 from "@/assets/vendor-1.jpg";
import vendor2 from "@/assets/vendor-2.jpg";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Finally, vegetables that taste like they should! The tomatoes I get from FreshLocal remind me of my grandmother's garden. Scheduling delivery around my work hours is so convenient.",
  },
  {
    name: "Lakshmi Devi",
    role: "Vendor Partner",
    image: vendor1,
    rating: 5,
    text: "As a vendor, FreshLocal helped me reach more customers while keeping things simple. The app is easy to use, payments are quick, and I've grown my business by 40%!",
  },
  {
    name: "Rajesh Kumar",
    role: "Fruit Vendor",
    image: vendor2,
    rating: 5,
    text: "I've been selling fruits for 15 years, but FreshLocal opened new doors. Now I serve customers across the city while maintaining the personal touch.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Loved by Customers & Vendors
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-card"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-trust-gold text-trust-gold" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
