import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ExamCountdown from "@/components/ExamCountdown";
import About from "@/components/About";
import WorkProcess from "@/components/WorkProcess";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import AboutInstructor from "@/components/AboutInstructor";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MascotWidget from "@/components/MascotWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ExamCountdown />
      <About />
      <WorkProcess />
      <Services />
      <Testimonials />
      <AboutInstructor />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppWidget />
      <MascotWidget />
    </div>
  );
};

export default Index;
