import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Monitor } from "lucide-react";

const Services = () => {
  const features = [
    {
      emoji: "✅",
      title: "Syllabus-Aligned Curriculum",
      description:
        "Every lesson follows the official Sri Lanka NIE A/L Chemistry syllabus. No wasted time. No off-topic content. Just the content that appears in your exam paper.",
    },
    {
      emoji: "🎓",
      title: "Expert-Led by Qualified Teachers",
      description:
        "",
    },
    {
      emoji: "💻",
      title: "Online & In-Person Flexibility",
      description:
        "Attend live online classes from anywhere in Sri Lanka, or join our in-person batches in Nugegoda and Piliyandala. Missed a class? Catch up with recorded sessions any time.",
    },
    {
      emoji: "📄",
      title: "Structured Notes & Past Paper Practice",
      description:
        "Receive professionally designed summary notes after every unit. Practice with curated A/L past paper questions and detailed marking scheme discussions.",
    },
    {
      emoji: "📊",
      title: "Proven Results, Year After Year",
      description:
        "Our students consistently achieve A and B grades in the G.C.E. A/L Chemistry examination.",
    },
  ];

  const courses = [
    {
      title: "Complete A/L Chemistry — 2-Year Programme",
      description:
        "Designed for Grade 12 and 13 students beginning their A/L journey. Covers all 14 units of the NIE Chemistry syllabus with regular unit tests, term assessments, and exam technique workshops.",
      bullets: [
        "Duration: 2 academic years (Grade 12 + 13)",
        "Mode: Physical + recorded access",
      ],
    },
    {
      title: "Revision & Exam Intensive — 2026 A/L",
      description:
        "A focused, fast-track revision programme for students sitting the 2026 A/L Chemistry exam. Concentrates on high-weightage topics, past paper analysis, and exam-technique coaching.",
      bullets: [
        "Focus: Paper 1 (MCQ), Paper 2 (Structured), Paper 3 (Essay)",
        "Includes: 5 full mock exams with marking",
        "Medium: English",
      ],
    },
  ];

  const locations = [
    {
      icon: MapPin,
      tag: "In-Person Classes",
      title: "CIEC — Nugegoda",
      description: "No. 97/1/1, Stanley Thilakarathna Mawatha, Nugegoda, Sri Lanka",
    },
    {
      icon: MapPin,
      tag: "In-Person Classes",
      title: "Pannipitiya",
      description: "Join our in-person batches in the Pannipitiya area.",
    },
    {
      icon: Monitor,
      tag: "Online Classes",
      title: "Live via Zoom / Google Meet",
      description:
        "Join from anywhere in Sri Lanka. All you need is a phone or laptop and a stable internet connection.",
    },
  ];

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        {/* Why ThinkChem */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Why English Medium A/L Students Choose ThinkChem{" "}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Syllabus-aligned chemistry tuition for English medium A/L students — online and in-person across Sri Lanka.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {features.map((f, i) => (
            <Card
              key={i}
              className="p-8 glass hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {f.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>

        {/* Courses */}
        <div id="courses" className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            A/L Chemistry Courses for Students
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you're just starting Grade 12 or in your final stretch before the A/L exam,
            ThinkChem has a structured chemistry course designed for your stage. All courses follow
            the Sri Lanka national curriculum and are available in English medium.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          {courses.map((c, i) => (
            <Card key={i} className="p-8 glass flex flex-col hover:shadow-2xl transition-all duration-300">
              <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                {c.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{c.description}</p>
              <ul className="space-y-2 mb-6 text-foreground">
                {c.bullets.map((b, j) => (
                  <li key={j} className="text-sm whitespace-pre-line">• {b}</li>
                ))}
              </ul>
              <Button
                onClick={scrollToContact}
                className="mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Enrol Now
              </Button>
            </Card>
          ))}
        </div>

        {/* Where to Find Us */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Where to Find Us
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join us in person at our Nugegoda or Pannipitiya centres, or learn live online from anywhere in Sri Lanka.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {locations.map((loc, i) => {
            const Icon = loc.icon;
            return (
              <Card key={i} className="p-8 glass text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm font-semibold text-accent-foreground bg-accent inline-block px-3 py-1 rounded-full mb-3">
                  {loc.tag}
                </p>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {loc.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{loc.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
