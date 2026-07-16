import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:gap-16 items-center lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Video */}
          <div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-muted">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/CFW7PYNdwXw?si=lPN7Jjz_bkSfQSaw"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="w-16 h-1.5 bg-accent rounded-full mb-6"></div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              About ThinkChem
            </h2>
            <p className="text-accent-foreground/90 font-semibold text-xl mb-6">
              <span className="text-primary">Sithira Harischandra</span>
              <span className="text-muted-foreground font-normal text-base"> — 6+ Years A/L Chemistry</span>
            </p>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                With years of teaching experience, ThinkChem is growing into a dedicated A/L Chemistry programme for English medium students in Sri Lanka. We are committed to providing clear explanations, structured learning, and individual attention to help students build confidence and achieve their academic goals.
              </p>
              <p>
                Our results speak for themselves. <span className="text-foreground font-semibold">98% of our students achieve an A or B grade</span> at
                the A/L exam, and many others have been destined to their dream university.
              </p>
              <p>
                Led by <span className="text-foreground font-semibold">Sithira Harischandra</span>,
                ThinkChem combines syllabus-perfect teaching, structured notes, and exam techniques; so every
                student walks into the exam hall confident, prepared, and ready to excel.
              </p>
            </div>

            <div className="mt-8">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 shadow-lg group"
                asChild
              >
                <a href="#contact">
                  Join Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 max-w-3xl mx-auto glass-dark text-primary-foreground rounded-2xl p-10 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-accent">6+</div>
              <div className="text-primary-foreground/90 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-accent">98%</div>
              <div className="text-primary-foreground/90 font-medium">A or B Grade</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
