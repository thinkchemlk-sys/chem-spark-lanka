import { BookOpen, FileText, FlaskConical, Calendar, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import mascot from "@/assets/mascot-thinchem.png";

const WorkProcess = () => {
  const steps = [
    {
      icon: BookOpen,
      title: "Accurate Subject Matter",
      description: "We start with comprehensive coverage of the A-Level syllabus, ensuring every concept is explained with precision and clarity.",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: FileText,
      title: "Short Revision Papers",
      description: "Regular mini-tests and revision papers help reinforce learning and identify areas that need more attention.",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: FlaskConical,
      title: "Fun Practical Assignments",
      description: "Engaging hands-on experiments and real-world applications make chemistry come alive and easier to remember.",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Target,
      title: "Targeted Practice",
      description: "Extensive MCQ practice sessions and past paper analysis to master exam techniques and time management.",
      color: "bg-orange-500/10 text-orange-600"
    },
    {
      icon: Calendar,
      title: "Flexible Timeline Adjustment",
      description: "We adapt our teaching pace based on your progress, ensuring you're always on track for exam success.",
      color: "bg-pink-500/10 text-pink-600"
    },
    {
      icon: Award,
      title: "Continuous Assessment",
      description: "Regular feedback and performance tracking help you monitor your progress and celebrate your achievements.",
      color: "bg-cyan-500/10 text-cyan-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <img 
              src={mascot} 
              alt="ThinkChem Learning Guide" 
              className="w-40 h-40 md:w-48 md:h-48 object-contain animate-bounce hover:scale-110 transition-transform"
            />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Our Proven Work Process
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow our friendly guide through a systematic approach designed to transform chemistry students into A-Level champions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-border bg-card relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
                
                <CardContent className="pt-8 pb-8 relative">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-3xl font-display font-bold text-primary/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-primary/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-primary/20">
            <p className="text-lg font-semibold text-foreground mb-2">
              🎯 Result-Oriented Approach
            </p>
            <p className="text-muted-foreground">
              Every step is carefully designed to build confidence, deepen understanding, and maximize exam performance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
