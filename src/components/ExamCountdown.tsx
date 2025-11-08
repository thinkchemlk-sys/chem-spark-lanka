import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

const ExamCountdown = () => {
  // Sri Lanka A-Level exams typically in August - setting to August 15, 2025
  const examDate = new Date("2025-08-15T09:00:00");
  
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = examDate.getTime() - now.getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-6">
            <Calendar className="w-5 h-5 text-accent-foreground" />
            <span className="text-accent-foreground font-semibold">A/L Chemistry Exam 2025</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Exam Countdown
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay focused and make every day count towards your success
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-card border-2 border-accent/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {timeLeft.days}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                Days
              </div>
            </div>

            <div className="bg-card border-2 border-accent/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {timeLeft.hours}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                Hours
              </div>
            </div>

            <div className="bg-card border-2 border-accent/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {timeLeft.minutes}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                Minutes
              </div>
            </div>

            <div className="bg-card border-2 border-accent/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {timeLeft.seconds}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                Seconds
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded-xl">
            <p className="text-foreground font-medium">
              Prepare with confidence. Every second brings you closer to your goal! 🎯
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamCountdown;
