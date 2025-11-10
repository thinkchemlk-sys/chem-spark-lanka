import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Kasun Perera",
    batch: "2024 A/L Batch",
    rating: 5,
    text: "ThinkChem transformed my understanding of chemistry. The teaching methods are exceptional and the practice materials are comprehensive.",
  },
  {
    name: "Nethmi Silva",
    batch: "2024 A/L Batch",
    rating: 5,
    text: "Best chemistry classes in Sri Lanka! The personalized attention and structured curriculum helped me achieve top marks.",
  },
  {
    name: "Ravindu Fernando",
    batch: "2023 A/L Batch",
    rating: 5,
    text: "Sir's dedication and expertise made complex topics easy to understand. Highly recommend for serious A/L students.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-muted-foreground">
            Hear from our successful A/L Chemistry students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.batch}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
