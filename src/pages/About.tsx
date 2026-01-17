import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Users, Award, BookOpen, TrendingUp, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

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

  const approach = [
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "Our curriculum covers all aspects of A-Level chemistry, from fundamental concepts to advanced topics, ensuring students are well-prepared for examinations."
    },
    {
      icon: TrendingUp,
      title: "Continuous Assessment",
      description: "Regular assessments and feedback help students track their progress and identify areas for improvement throughout their learning journey."
    },
    {
      icon: Heart,
      title: "Personalized Support",
      description: "We provide individualized attention to each student, adapting our teaching methods to suit different learning styles and needs."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display font-bold text-5xl md:text-6xl text-primary-foreground mb-6">
              About ThinkChem
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Empowering the next generation of chemists through exceptional education and dedicated mentorship
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-4xl text-foreground mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                Behind ThinkChem, is a passionate chemistry instructor dedicated to help students to truly understand the essence of chemistry, not just memorise it.
              </p>
              <p className="text-lg leading-relaxed">
                Started teaching at 19, I've spent the past six years helping students turn chemistry challenges into confidence.
              </p>
              <p className="text-lg leading-relaxed">
                The teaching approach focuses on clear understanding, practical exam strategies, and a genuine love for the subject to bring out the best in every learner.
              </p>
              <p className="text-lg leading-relaxed">
                ThinkChem was founded to make Advanced Level chemistry simple and meaningful, helping students see it not as a burden but as a fascinating subject that connects ideas and real-world concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our commitment to excellence is built on strong foundations and unwavering dedication to student success.
            </p>
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
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
              Our Teaching Approach
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in a holistic approach to chemistry education that goes beyond memorization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {approach.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={index}
                  className="p-8 hover:shadow-lg transition-all duration-300 border-border bg-card"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-10 md:p-12 shadow-xl border border-primary-foreground/10">
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

      <Footer />
    </div>
  );
};

export default About;
