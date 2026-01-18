import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What areas do you deliver to?",
    answer: "We currently deliver across Bangalore, including Whitefield, Koramangala, Indiranagar, HSR Layout, and more. Enter your pincode during checkout to see if we deliver to your area.",
  },
  {
    question: "How do I schedule a delivery?",
    answer: "During checkout, you can select from available delivery slots for your area. We offer morning, afternoon, and evening slots to fit your schedule.",
  },
  {
    question: "What is your return policy?",
    answer: "If you're not satisfied with the freshness or quality of any product, we offer a full refund or replacement within 24 hours of delivery. Simply contact our support team with photos of the product.",
  },
  {
    question: "How do vendors get paid?",
    answer: "Vendors receive weekly payouts directly to their bank accounts. All payments are processed by Friday for orders delivered the previous week.",
  },
  {
    question: "Is there a minimum order value?",
    answer: "Yes, the minimum order value is ₹100. Orders above ₹200 qualify for free delivery. Below that, a small delivery fee of ₹20 applies.",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">Email Us</h3>
                <p className="mt-2 text-muted-foreground">hello@freshlocal.com</p>
                <p className="text-sm text-muted-foreground">Response within 24 hours</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">Call Us</h3>
                <p className="mt-2 text-muted-foreground">+91 98765 43210</p>
                <p className="text-sm text-muted-foreground">Mon-Sat, 8AM - 8PM</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <MessageCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">Live Chat</h3>
                <p className="mt-2 text-muted-foreground">Chat with our team</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & FAQs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Form */}
              <div>
                <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Email *</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Subject *</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more..."
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="rounded-xl border border-border bg-card px-4"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 rounded-2xl bg-secondary/50 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Our Office</h3>
                <p className="text-muted-foreground">
                  123 Market Street, Koramangala, Bangalore, Karnataka 560034
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
