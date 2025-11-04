import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

interface MCQQuestion {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
  topic: string;
  difficulty: string;
}

const MCQDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<MCQQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndFetchQuestion();
  }, [id]);

  const checkAuthAndFetchQuestion = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    fetchQuestion();
  };

  const fetchQuestion = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("mcq_questions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load question. Please try again.",
        variant: "destructive",
      });
      navigate("/mcqs");
    } else {
      setQuestion(data);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      toast({
        title: "No answer selected",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer("");
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === question?.correct_answer;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Hard":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="py-12">
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
              <div className="h-32 bg-muted rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button
          onClick={() => navigate("/mcqs")}
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </Button>

        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{question.topic}</Badge>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{question.question}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
              disabled={showResult}
              className="space-y-3"
            >
              {["A", "B", "C", "D"].map((option) => {
                const optionText = question[`option_${option.toLowerCase()}` as keyof MCQQuestion] as string;
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = option === question.correct_answer;
                
                let optionClassName = "flex items-start space-x-3 p-4 rounded-lg border-2 transition-all";
                
                if (showResult) {
                  if (isCorrectAnswer) {
                    optionClassName += " border-green-500 bg-green-50 dark:bg-green-950";
                  } else if (isSelected && !isCorrect) {
                    optionClassName += " border-red-500 bg-red-50 dark:bg-red-950";
                  }
                } else if (isSelected) {
                  optionClassName += " border-primary bg-primary/5";
                }

                return (
                  <div key={option} className={optionClassName}>
                    <RadioGroupItem value={option} id={option} />
                    <Label
                      htmlFor={option}
                      className="flex-1 cursor-pointer font-normal leading-relaxed"
                    >
                      <span className="font-semibold mr-2">{option}.</span>
                      {optionText}
                    </Label>
                    {showResult && isCorrectAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </RadioGroup>

            {showResult && (
              <Card className={isCorrect ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        Correct!
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        Incorrect
                      </>
                    )}
                  </CardTitle>
                  <CardDescription className="text-foreground/80">
                    {question.explanation}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            <div className="flex gap-3">
              {!showResult ? (
                <Button onClick={handleSubmit} className="flex-1">
                  Submit Answer
                </Button>
              ) : (
                <>
                  <Button onClick={handleReset} variant="outline" className="flex-1">
                    Try Again
                  </Button>
                  <Button onClick={() => navigate("/mcqs")} className="flex-1">
                    Back to Questions
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCQDetail;
