import { ArrowRight, Sparkles } from "lucide-react";

const FutureAwaits = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-6">
          <Sparkles className="w-16 h-16 text-accent" strokeWidth={2.5} />
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
          Your Future Awaits
        </h2>
        <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join hundreds of successful students who transformed their Chemistry grades and secured their dream university placements.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-accent to-accent/80 text-primary font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          Start Your Journey Today
          <ArrowRight className="w-5 h-5" />
        </a>
        <p className="mt-6 text-sm text-primary/70">
          <span className="text-accent font-semibold">Limited seats available</span> for the upcoming batch
        </p>
      </div>
    </section>
  );
};

export default FutureAwaits;
