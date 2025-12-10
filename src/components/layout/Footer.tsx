import { Link } from "react-router-dom";
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Klickit</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting you with trusted local vendors for the freshest produce delivered right to your doorstep in Mumbai Vasai.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Products", path: "/products", isExternal: false },
                { label: "About Us", path: "/about", isExternal: false },
                { label: "Vendor Portal", path: "https://klickit-merchant.vercel.app/", isExternal: true },
                { label: "Contact", path: "/contact", isExternal: false },
              ].map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.path}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Refund & Returns
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                gokartcomm@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +91 9529647402
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>Mumbai Vasai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Klickit. All rights reserved. Made with 💚 for local communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
