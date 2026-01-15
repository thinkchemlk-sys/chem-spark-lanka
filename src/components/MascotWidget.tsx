import { useState, useEffect } from "react";
import { 
  X, Sparkles, BookOpen, Trophy, Zap, Hand, RotateCcw, RotateCw, Play,
  Award, Beaker, CheckCircle, Users, HelpCircle, MessageCircle, Mail, Gamepad2
} from "lucide-react";
import { Button } from "./ui/button";
import mascot from "@/assets/mascot-clean.png";
import ChemistryQuizGame from "./ChemistryQuizGame";

type AnimationState = 'idle' | 'wave' | 'turnLeft' | 'turnRight' | 'dance' | 'jump';
type Section = 'home' | 'about' | 'services' | 'testimonials' | 'faq' | 'contact';

const MascotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [animation, setAnimation] = useState<AnimationState>('idle');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Context-aware tips based on current section
  const contextTips: Record<Section, { icon: any; message: string }[]> = {
    home: [
      { icon: Sparkles, message: "Welcome! Ready to master chemistry? Let me guide you!" },
      { icon: Trophy, message: "Click 'Start Practice' to begin your journey to A-Level success!" },
    ],
    about: [
      { icon: BookOpen, message: "Did you know? Our tutors have 10+ years of experience!" },
      { icon: Award, message: "95% success rate! You're in expert hands!" },
    ],
    services: [
      { icon: Beaker, message: "We cover all three chemistry branches - Physical, Organic & Inorganic!" },
      { icon: CheckCircle, message: "Past paper practice is key to exam success!" },
    ],
    testimonials: [
      { icon: Users, message: "Real students, real success stories! You could be next!" },
      { icon: Trophy, message: "Their success is our pride. Your turn now!" },
    ],
    faq: [
      { icon: HelpCircle, message: "Got questions? I'm here to help you understand everything!" },
      { icon: Sparkles, message: "No question is too small - learning starts with curiosity!" },
    ],
    contact: [
      { icon: MessageCircle, message: "Ready to start? Get in touch and let's begin your chemistry journey!" },
      { icon: Mail, message: "Our team responds quickly - we're excited to hear from you!" },
    ],
  };

  // Detect current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections: Section[] = ['home', 'about', 'services', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? 'home' : section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playSound = (frequency: number, duration: number) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const performAnimation = (animationType: AnimationState) => {
    setAnimation(animationType);
    
    // Play different sounds for different animations
    switch (animationType) {
      case 'wave':
        playSound(523.25, 0.2); // C5
        break;
      case 'turnLeft':
        playSound(392, 0.15); // G4
        break;
      case 'turnRight':
        playSound(440, 0.15); // A4
        break;
      case 'jump':
        playSound(659.25, 0.3); // E5
        break;
      case 'dance':
        playSound(523.25, 0.1);
        setTimeout(() => playSound(659.25, 0.1), 150);
        setTimeout(() => playSound(783.99, 0.1), 300);
        break;
    }

    setTimeout(() => setAnimation('idle'), animationType === 'dance' ? 1000 : 500);
  };

  const handleMascotClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      playSound(523.25, 0.2);
    }
  };

  const tips = contextTips[currentSection] || contextTips.home;
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const currentTip = tips[currentTipIndex];
  const TipIcon = currentTip.icon;

  const getNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    playSound(523.25, 0.15);
  };

  // Get animation classes based on current animation state
  const getAnimationClass = () => {
    switch (animation) {
      case 'wave':
        return 'animate-[wave_0.5s_ease-in-out]';
      case 'turnLeft':
        return 'animate-[turnLeft_0.5s_ease-in-out]';
      case 'turnRight':
        return 'animate-[turnRight_0.5s_ease-in-out]';
      case 'jump':
        return 'animate-[jump_0.5s_ease-in-out]';
      case 'dance':
        return 'animate-[dance_1s_ease-in-out]';
      default:
        return 'animate-bounce';
    }
  };

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
                <p className="text-xs text-muted-foreground">{currentSection}</p>
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
          <p className="text-sm text-foreground mb-4">{currentTip.message}</p>
          
          {/* Interactive Controls */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <Button
              onClick={() => performAnimation('turnLeft')}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Left
            </Button>
            <Button
              onClick={() => performAnimation('wave')}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              <Hand className="w-3 h-3 mr-1" />
              Wave
            </Button>
            <Button
              onClick={() => performAnimation('turnRight')}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              <RotateCw className="w-3 h-3 mr-1" />
              Right
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              onClick={() => performAnimation('jump')}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              Jump
            </Button>
            <Button
              onClick={() => performAnimation('dance')}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              <Play className="w-3 h-3 mr-1" />
              Dance
            </Button>
          </div>

          <Button
            onClick={() => {
              setIsQuizOpen(true);
              setIsOpen(false);
              playSound(659.25, 0.2);
            }}
            size="sm"
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 mb-2"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            Quiz Battle
          </Button>

          <Button
            onClick={getNextTip}
            size="sm"
            variant="outline"
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            More Tips
          </Button>
        </div>
      )}

      <button
        onClick={handleMascotClick}
        className="relative group cursor-pointer"
        aria-label="Chemistry buddy mascot - Click to interact!"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
        <img
          src={mascot}
          alt="ThinkChem Mascot"
          className={`w-24 h-24 object-contain relative z-10 ${getAnimationClass()} hover:scale-110 transition-all duration-300 drop-shadow-2xl`}
          style={{
            transformOrigin: 'center bottom',
          }}
        />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-ping">
            <Sparkles className="w-3 h-3 text-accent-foreground" />
          </div>
        )}
      </button>

      <ChemistryQuizGame 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        playSound={playSound}
      />
    </div>
  );
};

export default MascotWidget;
