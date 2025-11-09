import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-chemistry.jpg";
import tutorImage from "@/assets/tutor.jpg";

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
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30">
              <span className="text-accent font-semibold">Advanced Level Chemistry</span>
            </div>
            
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Master Chemistry,
              <span className="text-accent block mt-2">Excel in A-Levels</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Expert chemistry education tailored for advanced level students in Sri Lanka. 
              Comprehensive courses designed to unlock your full potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group"
              >
                Start Practice
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                onClick={scrollToServices}
                className="bg-accent/80 text-accent-foreground hover:bg-accent/70 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                Explore Our Courses
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-semibold text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full"></div>
              <img 
                src={tutorImage} 
                alt="Expert Chemistry Tutor" 
                className="relative w-full max-w-md h-auto object-contain drop-shadow-2xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
