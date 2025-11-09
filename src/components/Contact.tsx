import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const enrollmentSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number is required").max(20),
  consent: z.boolean().refine(val => val === true, "You must consent to continue"),
  callDate: z.date().optional(),
  callTime: z.string().optional(),
  medium: z.enum(["English", "Sinhala"], { errorMap: () => ({ message: "Please select a medium" }) }),
  notes: z.string().trim().max(1000, "Notes must be less than 1000 characters").optional(),
});

const timeSlots = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM"
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+94 ",
    consent: false,
    medium: "",
    callTime: "",
    notes: "",
  });
  const [callDate, setCallDate] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const features = [
    "Expert A-Level Chemistry instruction",
    "Comprehensive study materials",
    "Personalized learning support"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const validatedData = enrollmentSchema.parse({
        ...formData,
        callDate,
      });

      setIsSubmitting(true);

      const { error } = await supabase.functions.invoke("send-enrollment", {
        body: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          medium: validatedData.medium,
          callDate: callDate ? format(callDate, "PPP") : undefined,
          callTime: validatedData.callTime,
          notes: validatedData.notes,
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You have successfully applied and we will get back to you soon.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "+94 ",
        consent: false,
        medium: "",
        callTime: "",
        notes: "",
      });
      setCallDate(undefined);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="bg-background border-input"
                    />
                    {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="bg-background border-input"
                    />
                    {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-background border-input"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+94 XX XXX XXXX" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-background border-input"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medium" className="text-foreground">
                    Medium <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.medium} onValueChange={(value) => setFormData({...formData, medium: value})}>
                    <SelectTrigger className="bg-background border-input">
                      <SelectValue placeholder="Select medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Sinhala">Sinhala</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.medium && <p className="text-sm text-destructive">{errors.medium}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="callDate" className="text-foreground">
                      Preferred Date for Call (Optional)
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-background border-input",
                            !callDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {callDate ? format(callDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={callDate}
                          onSelect={setCallDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="callTime" className="text-foreground">
                      Preferred Time (Sri Lankan Time - Optional)
                    </Label>
                    <Select value={formData.callTime} onValueChange={(value) => setFormData({...formData, callTime: value})}>
                      <SelectTrigger className="bg-background border-input">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-foreground">
                    What do you want from us? (Optional)
                  </Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Tell us about your goals, challenges, or any specific topics you'd like help with..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="bg-background border-input min-h-[100px]"
                  />
                  {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="consent" 
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
                    className="mt-1" 
                  />
                  <Label 
                    htmlFor="consent" 
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    I consent to marketing emails, calls, and text messages, including those made with an autodialed or artificial voice messages. Message and data rates may apply. Unsubscribe anytime per our Privacy Policy. Consent is not a condition of purchase.
                  </Label>
                </div>
                {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

                <Button 
                  type="submit"
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6"
                >
                  {isSubmitting ? "Submitting..." : "Enroll Now"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
