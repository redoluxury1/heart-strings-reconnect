
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Maximize2 } from 'lucide-react';

interface VisualizationScreenProps {
  selectedColor: string;
  onContinue: () => void;
  onBack: () => void;
}

const VisualizationScreen: React.FC<VisualizationScreenProps> = ({ 
  selectedColor,
  onContinue,
  onBack
}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [expandOrb, setExpandOrb] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showButtons, setShowButtons] = useState(true);
  
  // Play a subtle sound notification when visualization completes
  const playCompletionSound = () => {
    try {
      const sound = new Audio('/notification-sound.mp3');
      sound.volume = 0.3; // Keep volume subtle
      sound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  // Trigger fade-in animation after component mounts
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 500);
    
    return () => {
      clearTimeout(fadeTimer);
    };
  }, []);

  // Handle countdown and expansion animation
  useEffect(() => {
    let countdownInterval: ReturnType<typeof setInterval>;
    
    if (fadeIn) {
      // Start with 10 seconds
      setCountdown(10);
      
      // Start countdown
      countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Make countdown disappear after reaching 0
            setTimeout(() => {
              setCountdown(null);
              setShowButtons(true);
              playCompletionSound();
              toast({
                title: "Visualization complete",
                description: "Feel the energy of your chosen color throughout your being",
              });
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Start expansion animation when countdown begins
      setExpandOrb(true);
      setShowButtons(false);
    }
    
    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [fadeIn]);

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Visualization
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-md mx-auto">
        Imagine a small ball of light in your body—it's your chosen color. Maybe it's in your belly… or your chest… or your mind. Picture it clearly.
      </p>

      <div className="h-64 w-full flex items-center justify-center">
        {/* Pulsating orb with multiple layers for more dynamic effect */}
        <div className="relative">
          {/* Outer layer - slow pulse */}
          <div 
            className="absolute rounded-full animate-pulse-slow"
            style={{ 
              backgroundColor: 'transparent',
              boxShadow: `0 0 40px 25px ${selectedColor}`,
              filter: 'blur(15px)',
              height: '100px', 
              width: '100px',
              opacity: fadeIn ? 0.3 : 0,
              transition: 'opacity 1200ms ease-in-out',
              left: '-50px',
              top: '-50px'
            }}
          />
          
          {/* Middle layer - circular movement */}
          <div 
            className="absolute rounded-full animate-wave-circle"
            style={{ 
              backgroundColor: 'transparent',
              boxShadow: `0 0 30px 15px ${selectedColor}`,
              filter: 'blur(10px)',
              height: '80px', 
              width: '80px',
              borderRadius: '60% 40% 65% 35%',
              opacity: fadeIn ? 0.45 : 0,
              transition: 'opacity 1000ms ease-in-out',
              left: '-40px',
              top: '-40px'
            }}
          />
          
          {/* Inner core - floating movement */}
          <div 
            className="absolute rounded-full animate-float-slow"
            style={{ 
              backgroundColor: selectedColor,
              boxShadow: `0 0 20px 12px ${selectedColor}`,
              filter: 'blur(5px)',
              height: '60px', 
              width: '60px',
              borderRadius: '55% 45% 60% 40%',
              opacity: fadeIn ? 0.7 : 0,
              transition: 'opacity 800ms ease-in-out',
              left: '-30px',
              top: '-30px'
            }}
          />
          
          {/* Center core - solid */}
          <div 
            className="absolute rounded-full animate-expand"
            style={{ 
              backgroundColor: selectedColor,
              height: '40px', 
              width: '40px',
              boxShadow: `0 0 15px 8px ${selectedColor}`,
              borderRadius: '50%',
              opacity: fadeIn ? 0.9 : 0,
              transition: 'opacity 600ms ease-in-out',
              left: '-20px',
              top: '-20px'
            }}
          />
        </div>

        {/* Fullscreen button for enhanced immersion */}
        {fadeIn && !showButtons && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100/30 rounded-full"
            onClick={() => {
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => {
                  console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
              }
            }}
          >
            <Maximize2 className="h-4 w-4" />
            <span className="sr-only">Fullscreen</span>
          </Button>
        )}
      </div>
      
      {/* Countdown display - fades out when it reaches 0 */}
      {countdown !== null && (
        <div className={`mb-8 text-2xl font-medium text-gray-600 transition-opacity duration-300 ${
          countdown === 0 ? 'opacity-0' : 'opacity-100'
        }`}>
          {countdown}
        </div>
      )}
      
      {/* Buttons fade in/out based on expansion state */}
      <div className={`flex space-x-4 mt-4 transition-opacity duration-500 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-gray-300 text-gray-600 hover:text-[#7d6272]"
          disabled={!showButtons}
        >
          Back
        </Button>
        <Button 
          onClick={onContinue}
          className="bg-[#7d6272] hover:bg-[#6d5262] text-white"
          disabled={!showButtons}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VisualizationScreen;
