import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Users, Beaker, BookOpen } from "lucide-react";



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
    { icon: GraduationCap, label: "Teacher", desc: "A/L Chemistry Specialist" },
    { icon: Award, label: "6+ Years", desc: "A/L Teaching Experience" },
    { icon: Users, label: "98%", desc: "A or B Grade Students" },
  ];

  const highlights = [
    "A/L Chemistry specialist",
    "6 years A/L Chemistry teaching experience",
    "Former A/L exam marker",
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
            Meet Your Chemistry Teacher
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Your <span className="text-primary">Chemistry Teacher</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Guiding A/L students to top grades and Sri Lanka's leading universities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Instructor image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#e6ebf7] via-[#f2f5fb] to-white">
              {/* Decorative soft glows */}
              <div className="absolute -top-20 -left-16 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-16 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
              <div className="relative aspect-[3/4] flex items-end justify-center">
                <img
                  src={instructorImg}
                  alt="Sithira Harischandra - A/L Chemistry Instructor"
                  className="relative z-10 max-h-[105%] w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 lg:right-8 bg-accent text-accent-foreground px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-2 z-20">
              <Award className="w-5 h-5" />
              <div className="text-sm leading-tight">
                <div>6+ Years</div>
                <div className="text-xs font-normal opacity-90">Teaching Experience</div>
              </div>
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
                Sithira Harischandra is a dedicated chemistry educator in Sri Lanka. With 6 years of experience teaching A/L Chemistry, he has guided students to achieve their target grades and secure places at Sri Lanka's top government universities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                He brings the same clarity and student-centred approach to every class — breaking down complex organic chemistry mechanisms, thermodynamics, and electrochemistry into structured, memorable explanations that stick. 98% of his students have achieved an A or B grade in A/L Chemistry (English Medium).
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
