import { useState } from "react";
import { X, Sparkles, BookOpen, Trophy, Zap } from "lucide-react";
import { Button } from "./ui/button";
import mascot from "@/assets/mascot-clean.png";

const MascotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      icon: Sparkles,
      message: "Hey there! I'm your chemistry buddy. Click me anytime for tips!",
    },
    {
      icon: BookOpen,
      message: "Did you know? Regular practice with MCQs boosts your exam confidence!",
    },
    {
      icon: Trophy,
      message: "Success tip: Review your mistakes - they're your best teachers!",
    },
    {
      icon: Zap,
      message: "Quick tip: Break down complex reactions into smaller steps!",
    },
  ];

  const handleMascotClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setCurrentTip(Math.floor(Math.random() * tips.length));
    }
  };

  const getNextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const TipIcon = tips[currentTip].icon;

  return (
    <div className="fixed bottom-24 left-6 z-40 flex flex-col items-start gap-4">
      {isOpen && (
        <div className="bg-background border-2 border-primary/20 rounded-2xl shadow-2xl p-4 w-80 animate-in slide-in-from-left-8 mb-2">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TipIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chemistry Buddy</h3>
                <p className="text-xs text-muted-foreground">Here to help!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-foreground mb-4">{tips[currentTip].message}</p>
          <Button
            onClick={getNextTip}
            size="sm"
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            More Tips
          </Button>
        </div>
      )}

      <button
        onClick={handleMascotClick}
        className="relative group cursor-pointer"
        aria-label="Chemistry buddy mascot"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
        <img
          src={mascot}
          alt="ThinkChem Mascot"
          className="w-24 h-24 object-contain relative z-10 animate-bounce hover:animate-none hover:scale-110 transition-all duration-300 drop-shadow-2xl"
        />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-ping">
            <Sparkles className="w-3 h-3 text-accent-foreground" />
          </div>
        )}
      </button>
    </div>
  );
};

export default MascotWidget;
