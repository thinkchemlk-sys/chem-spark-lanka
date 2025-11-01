import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Beaker, LineChart, Users, CheckCircle } from "lucide-react";
import iconAtom from "@/assets/icon-atom.png";
import iconTeaching from "@/assets/icon-teaching.png";
import iconSuccess from "@/assets/icon-success.png";

const Services = () => {
  const services = [
    {
      image: iconAtom,
      title: "Comprehensive Curriculum",
      description: "Complete A-Level chemistry syllabus coverage with detailed explanations of all topics, from basic concepts to advanced theories.",
      features: [
        "Physical Chemistry",
        "Organic Chemistry", 
        "Inorganic Chemistry",
        "Past Paper Analysis"
      ]
    },
    {
      image: iconTeaching,
      title: "Expert Teaching Methods",
      description: "Innovative teaching approaches that simplify complex concepts and make learning chemistry engaging and effective.",
      features: [
        "Interactive Lessons",
        "Visual Learning Aids",
        "Practical Examples",
        "Problem-Solving Techniques"
      ]
    },
    {
      image: iconSuccess,
      title: "Exam-Focused Preparation",
      description: "Strategic exam preparation with emphasis on past papers, marking schemes, and examination techniques for A-Level success.",
      features: [
        "Past Paper Practice",
        "Time Management Skills",
        "Exam Strategies",
        "Progress Tracking"
      ]
    }
  ];

  const additionalServices = [
    { icon: BookOpen, title: "Comprehensive Study Materials", description: "Access to detailed notes, worksheets, and reference materials" },
    { icon: Beaker, title: "Practical Chemistry", description: "Understanding laboratory techniques and practical applications" },
    { icon: LineChart, title: "Progress Monitoring", description: "Regular assessments to track your improvement" },
    { icon: Users, title: "Small Group Classes", description: "Personalized attention in focused learning environments" }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We offer comprehensive chemistry education designed specifically for advanced level students, 
            combining expert teaching with proven methodologies to ensure your success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 border-border bg-card"
            >
              <div className="w-20 h-20 mb-6 mx-auto">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 text-center leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-foreground">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
