import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Users, Beaker, BookOpen, Star } from "lucide-react";
import instructorImage from "@/assets/instructor.jpg";

const AboutInstructor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("instructor");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const achievements = [
    { icon: GraduationCap, label: "MBBS", desc: "University of Moratuwa" },
    { icon: Award, label: "6+ Years", desc: "Teaching Experience" },
    { icon: Users, label: "1000+", desc: "Students Taught" },
  ];

  const highlights = [
    "ENFJ leader - passionate about empowering others",
    "Active in Rotaract and Leo Club organizations",
    "Transforming the impossible into reality",
  ];

  return (
    <section id="instructor" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Floating molecules animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10 animate-pulse"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-primary font-semibold text-sm mb-4 animate-bounce">
            Meet Your Instructor
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Learn from the <span className="text-primary">Best</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dedicated to transforming complex chemistry concepts into simple, understandable lessons
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image section with creative frame */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-accent rounded-tl-3xl animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-primary rounded-br-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
            
            {/* Main image container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
              <div className="relative bg-background rounded-2xl overflow-hidden shadow-lg transform group-hover:-translate-y-2 transition-all duration-500 max-w-xs mx-auto">
                <img
                  src={instructorImage}
                  alt="Sithira Harischandra - Chemistry Instructor"
                  className="w-full h-auto object-cover aspect-[3/4]"
                />
                {/* Overlay with name */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                  <h3 className="text-xl font-bold text-primary-foreground">Sithira Harischandra</h3>
                  <p className="text-primary-foreground/80 text-sm">MBBS Undergraduate | Chemistry Educator</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-4 top-1/4 bg-accent text-accent-foreground px-4 py-2 rounded-full shadow-lg animate-bounce font-semibold flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              Top Rated
            </div>
          </div>

          {/* Content section */}
          <div 
            className={`space-y-8 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            {/* Introduction text */}
            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Passionate About <span className="text-accent">Chemistry</span> Education
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I am Sithira Harischandra, an undergraduate pursuing a Bachelor of Medicine, Bachelor of Surgery (MBBS) at the University of Moratuwa. Beyond my academic journey in medicine, I am deeply passionate about sharing knowledge, which has led me to 6+ years of experience in teaching. My long-term vision is to integrate education into my career, empowering others through learning.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As an ENFJ, my extroverted nature fuels my drive to collaborate and lead, allowing me to contribute actively to organizations like Rotaract and the Leo Club at my alumnus. I am a firm believer in pushing boundaries, embracing challenges, and transforming the impossible into reality. With an optimistic outlook and unwavering determination, I continuously strive to surpass my limits and achieve my goals.
              </p>
            </div>

            {/* Achievement cards with animation */}
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((item, index) => (
                <Card 
                  key={index}
                  className={`text-center p-4 transition-all duration-500 cursor-pointer ${
                    activeIndex === index 
                      ? "bg-primary text-primary-foreground scale-105 shadow-lg" 
                      : "bg-card hover:bg-secondary"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0 space-y-2">
                    <item.icon className={`w-8 h-8 mx-auto ${
                      activeIndex === index ? "text-primary-foreground" : "text-primary"
                    }`} />
                    <p className="font-bold text-lg">{item.label}</p>
                    <p className={`text-xs ${
                      activeIndex === index ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Highlights with animated bullets */}
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 group"
                  style={{ 
                    animation: isVisible ? `fadeInLeft 0.5s ease-out ${0.8 + index * 0.2}s forwards` : undefined,
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <Beaker className="w-4 h-4 text-primary group-hover:text-accent-foreground" />
                  </div>
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning Today
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutInstructor;
