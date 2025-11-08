import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const Contact = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 16,
    minutes: 26,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    "Expert A-Level Chemistry instruction",
    "Comprehensive study materials",
    "Personalized learning support"
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border-4 border-[#d4ff00] rounded-3xl p-8 md:p-12 bg-card">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div className="space-y-8">
                <div className="flex -space-x-4">
                  <div className="w-16 h-16 rounded-full bg-[#d4ff00] border-4 border-card flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[#d4ff00] border-4 border-card flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/10" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[#d4ff00] border-4 border-card flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10" />
                  </div>
                </div>

                <div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                    Start your <span className="bg-[#d4ff00] px-2 py-1 rounded">chemistry journey</span>
                  </h2>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                    today. Talk to an advisor.
                  </h2>
                </div>

                {/* Countdown Timer */}
                <div className="flex gap-4">
                  <div className="bg-[#1e3a8a] rounded-lg p-4 text-center min-w-[80px]">
                    <div className="text-3xl font-bold text-white">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-white/80 mt-1">Days</div>
                  </div>
                  <div className="bg-[#1e3a8a] rounded-lg p-4 text-center min-w-[80px]">
                    <div className="text-3xl font-bold text-white">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-white/80 mt-1">Hours</div>
                  </div>
                  <div className="bg-[#1e3a8a] rounded-lg p-4 text-center min-w-[80px]">
                    <div className="text-3xl font-bold text-white">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-white/80 mt-1">Minutes</div>
                  </div>
                  <div className="bg-[#1e3a8a] rounded-lg p-4 text-center min-w-[80px]">
                    <div className="text-3xl font-bold text-white">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-white/80 mt-1">Seconds</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d4ff00] flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-[#1e3a8a]" />
                      </div>
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Form */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="firstName" 
                      placeholder="" 
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="lastName" 
                      placeholder="" 
                      className="bg-background border-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="" 
                    className="bg-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Country Code + Phone Number" 
                    className="bg-background border-input"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="consent" className="mt-1" />
                  <Label 
                    htmlFor="consent" 
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    I consent to marketing emails, calls, and text messages, including those made with an autodialed or artificial voice messages. Message and data rates may apply. Unsubscribe anytime per our Privacy Policy. Consent is not a condition of purchase.
                  </Label>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-semibold text-lg py-6"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
