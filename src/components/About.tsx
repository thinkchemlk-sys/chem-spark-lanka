import { Target, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import tutorImage from "@/assets/tutor.png";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide exceptional chemistry education that empowers A-Level students to achieve academic excellence and develop a deep understanding of chemical principles."
    },
    {
      icon: Users,
      title: "Expert Educators",
      description: "Our team comprises experienced chemistry educators with proven track records in guiding students to outstanding A-Level results."
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "Years of successful student outcomes demonstrate our commitment to quality education and student achievement."
    }
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            About Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img 
                src={tutorImage} 
                alt="Expert Chemistry Tutor" 
                className="relative w-full max-w-md h-auto object-contain drop-shadow-2xl animate-fade-in"
              />
            </div>
          </div>

          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We are dedicated chemistry educators passionate about helping advanced level students in Sri Lanka 
              reach their full potential. Our comprehensive approach combines deep subject knowledge with 
              innovative teaching methods to make complex chemistry concepts accessible and engaging.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With years of experience in A-Level chemistry education, our team is committed to providing 
              personalized attention and support to help each student excel in their academic journey.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-primary text-primary-foreground rounded-2xl p-10 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-accent">6+</div>
              <div className="text-primary-foreground/90 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-accent">100+</div>
              <div className="text-primary-foreground/90 font-medium">Students Taught</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-accent">95%</div>
              <div className="text-primary-foreground/90 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
