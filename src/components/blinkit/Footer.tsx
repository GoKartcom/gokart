import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export function BlinkitFooter() {
  return (
    <footer className="bg-foreground text-background mt-12">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">K</span>
              </div>
              <span className="text-xl font-bold">Klickit</span>
            </div>
            <p className="text-sm text-background/70">
              Fresh groceries delivered in minutes. Shop from local vendors and get the freshest produce at your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/products" className="hover:text-background transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact</Link></li>
              <li><a href="https://klickit-merchant.vercel.app/" className="hover:text-background transition-colors">Become a Vendor</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/refund-policy" className="hover:text-background transition-colors">Refund Policy</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@klickit.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Sector 18, Noida, Uttar Pradesh 201301</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/50">
          © {new Date().getFullYear()} Klickit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
