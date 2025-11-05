import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import thinkChemLogo from "@/assets/thinkchem-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={thinkChemLogo} 
              alt="ThinkChem Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="font-display font-bold text-xl text-foreground">ThinkChem</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>
            {location.pathname === "/" && (
              <button 
                onClick={() => scrollToSection("services")}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                What We Do
              </button>
            )}
            <Button 
              onClick={() => location.pathname === "/" ? scrollToSection("services") : window.location.href = "/#services"}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-in slide-in-from-top">
            <Link 
              to="/"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>
            {location.pathname === "/" && (
              <button 
                onClick={() => scrollToSection("services")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                What We Do
              </button>
            )}
            <Button 
              onClick={() => {
                setIsOpen(false);
                location.pathname === "/" ? scrollToSection("services") : window.location.href = "/#services";
              }}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
