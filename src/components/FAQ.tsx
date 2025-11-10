import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What are the class timings?",
      answer: "We offer flexible class schedules between 5:00 PM to 11:00 PM Sri Lankan Time, every day of the week. You can select your preferred time slot during enrollment based on availability."
    },
    {
      question: "Do you offer classes in both English and Sinhala medium?",
      answer: "Yes! We provide comprehensive A-Level chemistry classes in both English and Sinhala medium. You can choose your preferred medium during the enrollment process."
    },
    {
      question: "What are the course fees?",
      answer: "Our course fees vary based on the package you select (individual classes, group sessions, or complete course packages). Please contact us through the enrollment form for detailed pricing information tailored to your needs."
    },
    {
      question: "How long is the complete A-Level chemistry course?",
      answer: "The complete A-Level chemistry course typically spans 18-24 months, covering all topics from the syllabus. We also offer crash courses and revision programs for students closer to their exams."
    },
    {
      question: "What materials are provided with the course?",
      answer: "Students receive comprehensive study materials including detailed notes, practice MCQs, past paper collections, revision papers, and access to our online practice platform. All materials are regularly updated to match the latest syllabus."
    },
    {
      question: "Can I join mid-term?",
      answer: "Yes, we accept students throughout the year. We'll assess your current knowledge level and create a personalized learning plan to help you catch up with the ongoing curriculum."
    },
    {
      question: "Do you provide individual attention?",
      answer: "Absolutely! We maintain small batch sizes to ensure each student receives personalized attention. We also offer one-on-one tutoring sessions for students who need extra support."
    },
    {
      question: "Are practical sessions included?",
      answer: "Yes! We conduct fun and engaging practical sessions to help you understand concepts better. These hands-on activities make chemistry enjoyable and memorable."
    },
    {
      question: "How do I enroll?",
      answer: "Simply fill out the enrollment form on our website with your details, preferred medium, and time slot. Our team will contact you within 24 hours to complete the registration process."
    },
    {
      question: "Do you offer trial classes?",
      answer: "Yes! We offer a free trial class so you can experience our teaching methodology before making a commitment. Contact us to schedule your trial session."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our chemistry classes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
