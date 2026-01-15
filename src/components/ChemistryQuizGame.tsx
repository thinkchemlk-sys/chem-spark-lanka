import { useState, useEffect, useCallback } from "react";
import { 
  X, Trophy, Star, Zap, Brain, Target, Medal,
  CheckCircle, XCircle, Clock, Sparkles, ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import mascot from "@/assets/mascot-clean.png";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface ChemistryQuizGameProps {
  isOpen: boolean;
  onClose: () => void;
  playSound: (frequency: number, duration: number) => void;
}

// Sample chemistry questions for the quiz
const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Au", "Ag", "Gd"],
    correct: 1,
    difficulty: 'easy',
    topic: "Elements"
  },
  {
    question: "What is the pH of pure water at 25°C?",
    options: ["0", "7", "14", "1"],
    correct: 1,
    difficulty: 'easy',
    topic: "Acids & Bases"
  },
  {
    question: "Which gas is released when an acid reacts with a metal?",
    options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
    correct: 2,
    difficulty: 'easy',
    topic: "Reactions"
  },
  {
    question: "What is Avogadro's number?",
    options: ["6.022 × 10²³", "3.14 × 10²²", "1.0 × 10²⁴", "9.8 × 10²¹"],
    correct: 0,
    difficulty: 'medium',
    topic: "Moles"
  },
  {
    question: "Which orbital has a dumbbell shape?",
    options: ["s orbital", "p orbital", "d orbital", "f orbital"],
    correct: 1,
    difficulty: 'medium',
    topic: "Atomic Structure"
  },
  {
    question: "What is the oxidation state of oxygen in H₂O?",
    options: ["+2", "-1", "-2", "0"],
    correct: 2,
    difficulty: 'medium',
    topic: "Oxidation"
  },
  {
    question: "Which catalyst is used in the Haber process?",
    options: ["Platinum", "Iron", "Nickel", "Vanadium pentoxide"],
    correct: 1,
    difficulty: 'hard',
    topic: "Industrial Chemistry"
  },
  {
    question: "What is the hybridization of carbon in methane?",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correct: 2,
    difficulty: 'hard',
    topic: "Organic Chemistry"
  },
];

type GameState = 'menu' | 'playing' | 'result' | 'leaderboard';
type Reward = { name: string; icon: typeof Trophy; unlocked: boolean };

const ChemistryQuizGame = ({ isOpen, onClose, playSound }: ChemistryQuizGameProps) => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [mascotScore, setMascotScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
  const [wins, setWins] = useState(0);
  const [mascotAnimation, setMascotAnimation] = useState<'idle' | 'happy' | 'sad' | 'thinking'>('idle');
  
  const [rewards, setRewards] = useState<Reward[]>([
    { name: "First Win", icon: Trophy, unlocked: false },
    { name: "3-Streak", icon: Zap, unlocked: false },
    { name: "Perfect Score", icon: Star, unlocked: false },
    { name: "Chemistry Pro", icon: Brain, unlocked: false },
    { name: "5 Games", icon: Target, unlocked: false },
  ]);

  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setBestStreak(progress.bestStreak || 0);
      setTotalGamesPlayed(progress.totalGamesPlayed || 0);
      setWins(progress.wins || 0);
      setRewards(prev => prev.map((r, i) => ({
        ...r,
        unlocked: progress.rewards?.[i] || false
      })));
    }
  }, []);

  // Save progress
  const saveProgress = useCallback(() => {
    localStorage.setItem('quizProgress', JSON.stringify({
      bestStreak,
      totalGamesPlayed,
      wins,
      rewards: rewards.map(r => r.unlocked)
    }));
  }, [bestStreak, totalGamesPlayed, wins, rewards]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || showCorrectAnswer) return;
    
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState, showCorrectAnswer]);

  const handleTimeUp = () => {
    setShowCorrectAnswer(true);
    setStreak(0);
    // Mascot gets the point when player times out
    setMascotScore(prev => prev + 1);
    setMascotAnimation('happy');
    playSound(200, 0.3); // Low sound for timeout
  };

  const startGame = () => {
    // Shuffle and pick 5 questions
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setPlayerScore(0);
    setMascotScore(0);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setTimeLeft(15);
    setStreak(0);
    setGameState('playing');
    setMascotAnimation('thinking');
    playSound(523.25, 0.2);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showCorrectAnswer || selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowCorrectAnswer(true);

    const isCorrect = answerIndex === shuffledQuestions[currentQuestionIndex].correct;

    if (isCorrect) {
      const points = shuffledQuestions[currentQuestionIndex].difficulty === 'hard' ? 3 : 
                     shuffledQuestions[currentQuestionIndex].difficulty === 'medium' ? 2 : 1;
      setPlayerScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setMascotAnimation('sad');
      playSound(659.25, 0.2); // Success sound
      playSound(783.99, 0.1); // Higher pitch follow-up
    } else {
      setStreak(0);
      // Mascot earns point when player is wrong
      const mascotPoints = shuffledQuestions[currentQuestionIndex].difficulty === 'hard' ? 2 : 1;
      setMascotScore(prev => prev + mascotPoints);
      setMascotAnimation('happy');
      playSound(200, 0.3); // Error sound
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      setTimeLeft(15);
      setMascotAnimation('thinking');
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameState('result');
    const newTotalGames = totalGamesPlayed + 1;
    setTotalGamesPlayed(newTotalGames);
    
    const playerWon = playerScore > mascotScore;
    if (playerWon) {
      setWins(prev => prev + 1);
      setMascotAnimation('sad');
      playSound(523.25, 0.2);
      setTimeout(() => playSound(659.25, 0.2), 200);
      setTimeout(() => playSound(783.99, 0.3), 400);
    } else {
      setMascotAnimation('happy');
      playSound(392, 0.3);
    }

    if (streak > bestStreak) {
      setBestStreak(streak);
    }

    // Check for new rewards
    updateRewards(playerWon, newTotalGames);
    saveProgress();
  };

  const updateRewards = (won: boolean, gamesPlayed: number) => {
    setRewards(prev => {
      const updated = [...prev];
      
      // First Win
      if (won && !updated[0].unlocked) {
        updated[0].unlocked = true;
        playSound(1046.5, 0.3); // High C for reward
      }
      
      // 3-Streak
      if (streak >= 3 && !updated[1].unlocked) {
        updated[1].unlocked = true;
        playSound(1046.5, 0.3);
      }
      
      // Perfect Score (all questions correct)
      if (mascotScore === 0 && !updated[2].unlocked && shuffledQuestions.length > 0) {
        updated[2].unlocked = true;
        playSound(1046.5, 0.3);
      }
      
      // Chemistry Pro (win 3 times)
      if (wins + (won ? 1 : 0) >= 3 && !updated[3].unlocked) {
        updated[3].unlocked = true;
        playSound(1046.5, 0.3);
      }
      
      // 5 Games
      if (gamesPlayed >= 5 && !updated[4].unlocked) {
        updated[4].unlocked = true;
        playSound(1046.5, 0.3);
      }
      
      return updated;
    });
  };

  const getMascotAnimationClass = () => {
    switch (mascotAnimation) {
      case 'happy':
        return 'animate-bounce scale-110';
      case 'sad':
        return 'scale-90 opacity-75';
      case 'thinking':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border-2 border-primary/30 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Chemistry Quiz Battle</h2>
              <p className="text-xs text-muted-foreground">Compete with Chemistry Buddy!</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          {/* Menu State */}
          {gameState === 'menu' && (
            <div className="text-center space-y-6">
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse" />
                <img 
                  src={mascot} 
                  alt="Chemistry Buddy" 
                  className="w-32 h-32 object-contain relative z-10 animate-bounce"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to Challenge Me?</h3>
                <p className="text-muted-foreground text-sm">
                  Answer chemistry questions faster than me to win! Harder questions = more points!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-muted/50 rounded-lg p-3">
                  <Trophy className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
                  <p className="text-xs text-muted-foreground">Wins</p>
                  <p className="font-bold">{wins}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                  <p className="text-xs text-muted-foreground">Best Streak</p>
                  <p className="font-bold">{bestStreak}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <Target className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                  <p className="text-xs text-muted-foreground">Games</p>
                  <p className="font-bold">{totalGamesPlayed}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={startGame} className="flex-1 h-12 text-lg gap-2">
                  <Sparkles className="w-5 h-5" />
                  Start Battle
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setGameState('leaderboard')}
                  className="h-12"
                >
                  <Medal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && shuffledQuestions.length > 0 && (
            <div className="space-y-4">
              {/* Score Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <p className="text-xs text-muted-foreground mb-1">You</p>
                  <p className="text-2xl font-bold text-primary">{playerScore}</p>
                </div>
                <div className="flex flex-col items-center">
                  <img 
                    src={mascot} 
                    alt="Mascot" 
                    className={`w-16 h-16 object-contain transition-all duration-300 ${getMascotAnimationClass()}`}
                  />
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">VS</span>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Buddy</p>
                  <p className="text-2xl font-bold text-accent">{mascotScore}</p>
                </div>
              </div>

              {/* Progress & Timer */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Question {currentQuestionIndex + 1}/{shuffledQuestions.length}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className={timeLeft <= 5 ? 'text-destructive animate-pulse' : ''}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
                <Progress value={(timeLeft / 15) * 100} className="h-2" />
              </div>

              {/* Streak */}
              {streak > 0 && (
                <div className="flex items-center justify-center gap-1 text-orange-500">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">{streak} streak!</span>
                </div>
              )}

              {/* Question */}
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    shuffledQuestions[currentQuestionIndex].difficulty === 'hard' 
                      ? 'bg-destructive/20 text-destructive'
                      : shuffledQuestions[currentQuestionIndex].difficulty === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-700'
                      : 'bg-green-500/20 text-green-700'
                  }`}>
                    {shuffledQuestions[currentQuestionIndex].difficulty.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {shuffledQuestions[currentQuestionIndex].topic}
                  </span>
                </div>
                <p className="font-medium">{shuffledQuestions[currentQuestionIndex].question}</p>
              </div>

              {/* Options */}
              <div className="grid gap-2">
                {shuffledQuestions[currentQuestionIndex].options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === shuffledQuestions[currentQuestionIndex].correct;
                  const showResult = showCorrectAnswer;

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto py-3 px-4 justify-start text-left transition-all ${
                        showResult && isCorrect 
                          ? 'bg-green-500/20 border-green-500 text-green-700' 
                          : showResult && isSelected && !isCorrect
                          ? 'bg-destructive/20 border-destructive text-destructive'
                          : isSelected
                          ? 'border-primary'
                          : ''
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={showCorrectAnswer}
                    >
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-3">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Result State */}
          {gameState === 'result' && (
            <div className="text-center space-y-6">
              <div className="relative mx-auto w-32 h-32">
                <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${
                  playerScore > mascotScore 
                    ? 'bg-gradient-to-r from-yellow-500/30 to-amber-500/30' 
                    : 'bg-gradient-to-r from-primary/20 to-accent/20'
                }`} />
                <img 
                  src={mascot} 
                  alt="Chemistry Buddy" 
                  className={`w-32 h-32 object-contain relative z-10 ${getMascotAnimationClass()}`}
                />
                {playerScore > mascotScore && (
                  <Trophy className="absolute -top-2 -right-2 w-10 h-10 text-yellow-500 animate-bounce" />
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-1">
                  {playerScore > mascotScore ? "🎉 You Won!" : playerScore < mascotScore ? "Buddy Wins!" : "It's a Tie!"}
                </h3>
                <p className="text-muted-foreground">
                  {playerScore > mascotScore 
                    ? "Amazing work! You outsmarted Chemistry Buddy!" 
                    : playerScore < mascotScore
                    ? "Don't worry! Practice makes perfect!" 
                    : "Great match! You're evenly matched!"}
                </p>
              </div>

              {/* Final Scores */}
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{playerScore}</p>
                  <p className="text-sm text-muted-foreground">Your Score</p>
                </div>
                <div className="text-2xl font-light text-muted-foreground">vs</div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">{mascotScore}</p>
                  <p className="text-sm text-muted-foreground">Buddy's Score</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                  <p className="text-xs text-muted-foreground">This Streak</p>
                  <p className="font-bold">{streak}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <Trophy className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
                  <p className="text-xs text-muted-foreground">Total Wins</p>
                  <p className="font-bold">{wins}</p>
                </div>
              </div>

              {/* New Rewards */}
              {rewards.some(r => r.unlocked) && (
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3">
                  <p className="text-sm font-medium mb-2">Rewards Unlocked</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {rewards.filter(r => r.unlocked).map((reward, i) => (
                      <div key={i} className="flex items-center gap-1 bg-background rounded-full px-2 py-1 text-xs">
                        <reward.icon className="w-3 h-3 text-yellow-500" />
                        {reward.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={startGame} className="flex-1 gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Play Again
                </Button>
                <Button variant="outline" onClick={() => setGameState('menu')}>
                  Menu
                </Button>
              </div>
            </div>
          )}

          {/* Leaderboard/Rewards State */}
          {gameState === 'leaderboard' && (
            <div className="space-y-6">
              <div className="text-center">
                <Medal className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
                <h3 className="text-xl font-bold">Your Achievements</h3>
                <p className="text-sm text-muted-foreground">Collect all rewards by playing!</p>
              </div>

              <div className="grid gap-3">
                {rewards.map((reward, i) => (
                  <div 
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      reward.unlocked 
                        ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30' 
                        : 'bg-muted/30 border-muted opacity-60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      reward.unlocked ? 'bg-yellow-500/20' : 'bg-muted'
                    }`}>
                      <reward.icon className={`w-5 h-5 ${reward.unlocked ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${reward.unlocked ? '' : 'text-muted-foreground'}`}>
                        {reward.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i === 0 && "Win your first quiz battle"}
                        {i === 1 && "Get 3 correct answers in a row"}
                        {i === 2 && "Win without Buddy scoring"}
                        {i === 3 && "Win 3 quiz battles"}
                        {i === 4 && "Play 5 quiz games"}
                      </p>
                    </div>
                    {reward.unlocked && <Star className="w-5 h-5 text-yellow-500" />}
                  </div>
                ))}
              </div>

              <Button onClick={() => setGameState('menu')} className="w-full">
                Back to Menu
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChemistryQuizGame;
