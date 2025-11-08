import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const Contact = () => {

  const features = [
    "Expert A-Level Chemistry instruction",
    "Comprehensive study materials",
    "Personalized learning support"
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border-4 border-accent rounded-3xl p-8 md:p-12 bg-card">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div className="space-y-8">
                <div className="flex -space-x-4">
                  <div className="w-16 h-16 rounded-full bg-accent border-4 border-card flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-accent border-4 border-card flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/10" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-accent border-4 border-card flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10" />
                  </div>
                </div>

                <div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                    Start your <span className="bg-accent text-accent-foreground px-2 py-1 rounded">chemistry journey</span>
                  </h2>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                    today. Talk to us.
                  </h2>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-accent-foreground" />
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
                    placeholder="+94 XX XXX XXXX" 
                    className="bg-background border-input"
                    defaultValue="+94 "
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6"
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
