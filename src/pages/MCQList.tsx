import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { BookOpen, LogOut } from "lucide-react";

interface MCQQuestion {
  id: string;
  question: string;
  topic: string;
  difficulty: string;
}

const MCQList = () => {
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndFetchQuestions();
  }, []);

  const checkAuthAndFetchQuestions = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    fetchQuestions();
  };

  const fetchQuestions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("mcq_questions")
      .select("id, question, topic, difficulty")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
    } else {
      setQuestions(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20";
      case "Hard":
        return "bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Chemistry MCQ Practice
            </h1>
            <p className="text-muted-foreground">
              Test your knowledge with our collection of A-Level chemistry questions
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>No questions available</CardTitle>
              <CardDescription>
                Check back later for new MCQ questions to practice.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questions.map((question) => (
              <Card
                key={question.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/mcq/${question.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {question.topic}
                    </Badge>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {question.question}
                  </p>
                  <Button className="w-full mt-4" variant="outline">
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQList;
