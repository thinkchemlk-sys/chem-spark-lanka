import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-chemistry.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Chemistry laboratory" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30">
            <span className="text-accent font-semibold">Advanced Level Chemistry</span>
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            A/L Chemistry Classes for English Medium Students
            <span className="text-accent block mt-2">Online & In-Person</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed whitespace-pre-line">
            A/L Chemistry does not have to be the subject that breaks you. At ThinkChem we teach English medium students in Sri Lanka how to think through Chemistry, not just memorize it, and walk into their exam confident and prepared.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group"
            >
              Enrol Now — Free Trial Class
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToServices}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 py-6 transition-all"
            >
              View Our Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
