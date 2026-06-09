import { useState, useEffect } from "react";
import { ArrowRight, Award } from "lucide-react";
import instructorImage from "@/assets/instructor.jpg";

const AboutInstructor = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    const section = document.getElementById("instructor");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="instructor" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-accent/15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Yellow accent shapes */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-accent/40 -z-0" />
            <div className="absolute -bottom-8 -right-4 w-24 h-24 rounded-full bg-accent/30 -z-0" />

            <div className="relative max-w-md mx-auto">
              <img
                src={instructorImage}
                alt="Sithira Harischandra - A/L Chemistry Instructor"
                className="relative w-full h-auto object-cover rounded-3xl shadow-2xl"
              />

              {/* Award badge */}
              <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 flex items-center gap-3 shadow-xl border border-accent/40">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-primary text-sm leading-tight">98% A/B</p>
                  <p className="text-xs text-muted-foreground leading-tight">Grade Students</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Yellow underline bar */}
            <div className="w-16 h-1 bg-accent rounded-full" />

            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              About ThinkChem
            </h2>

            <p className="text-accent font-semibold text-lg">
              Sithira Harischandra — MBBS (UG), Moratuwa
            </p>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sithira is an MBBS undergraduate at the University of Moratuwa with
                6+ years of experience teaching A/L Chemistry in English Medium.
                He has guided hundreds of students to top grades and placements at
                Sri Lanka's leading government universities.
              </p>
              <p>
                His student-centred approach breaks down complex organic mechanisms,
                thermodynamics, and electrochemistry into structured, memorable
                lessons that stick. A former A/L exam marker at SASIP Institute,
                he knows exactly what examiners are looking for.
              </p>
              <p>
                The result: <span className="text-foreground font-semibold">98% of
                ThinkChem students</span> have achieved an A or B grade in A/L
                Chemistry (English Medium).
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="https://lms.thinkchem.lk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Join Now
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInstructor;
