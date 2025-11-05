import { Mail, Phone, MapPin } from "lucide-react";
import thinkChemLogo from "@/assets/thinkchem-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={thinkChemLogo} 
                alt="ThinkChem Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="font-display font-bold text-xl">ThinkChem</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Expert chemistry education for advanced level students in Sri Lanka, dedicated to your academic success.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  What We Do
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">info@chemistryedu.lk</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">+94 XX XXX XXXX</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © {new Date().getFullYear()} ThinkChem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
