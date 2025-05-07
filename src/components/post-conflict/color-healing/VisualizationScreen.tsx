
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
  const [expansionScale, setExpansionScale] = useState(0);
  
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
          
          // Adjust expansion scale based on countdown time
          // Scale grows DRAMATICALLY as we approach 3 seconds
          const newScale = prev <= 3 
            ? 40 - (prev * 2.5) // Massive growth in final 3 seconds (35-40x size)
            : 10 + ((10 - prev) * 3); // Stronger gradual growth until 3 seconds
          
          setExpansionScale(newScale);
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

      <div className="relative h-96 w-full mb-10 flex items-center justify-center overflow-hidden">
        {/* Outer glow layer with hypnotic pulsing */}
        <div 
          className="rounded-full transition-all duration-1000 animate-pulse-slow"
          style={{ 
            backgroundColor: 'transparent',
            height: '65px', 
            width: '72px', 
            boxShadow: `0 0 60px 30px ${selectedColor}`,
            filter: 'blur(15px)',
            transform: 'rotate(15deg)',
            opacity: fadeIn ? 0.35 : 0,
            scale: expandOrb ? `${expansionScale}` : fadeIn ? '0.3' : '0',
            transition: 'all 1000ms cubic-bezier(0.17, 0.55, 0.55, 1)'
          }}
        />
        
        {/* Medium glow layer with different dimensions and rotation */}
        <div 
          className="absolute rounded-full transition-all duration-1000 animate-wave-circle"
          style={{ 
            backgroundColor: 'transparent',
            height: '48px', 
            width: '54px',
            boxShadow: `0 0 45px 25px ${selectedColor}`,
            filter: 'blur(8px)',
            borderRadius: '65% 35% 55% 45%',
            opacity: fadeIn ? 0.45 : 0,
            scale: expandOrb ? `${expansionScale * 0.85}` : fadeIn ? '0.2' : '0',
            transition: 'all 1000ms cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        />
        
        {/* Inner bright core with pulsing effect */}
        <div 
          className="absolute rounded-full transition-all duration-1000 animate-expand"
          style={{ 
            backgroundColor: selectedColor,
            height: '42px', 
            width: '46px',
            boxShadow: `0 0 30px 18px ${selectedColor}`,
            filter: 'blur(3px)',
            borderRadius: '60% 40% 65% 35%',
            opacity: fadeIn ? 0.8 : 0,
            scale: expandOrb ? `${expansionScale * 0.7}` : fadeIn ? '0.1' : '0',
            transition: 'all 1000ms cubic-bezier(0.25, 1.05, 0.75, 0.9)'
          }}
        />
        
        {/* Central dot with constant pulsing */}
        <div 
          className="absolute transition-opacity duration-1000 animate-pulse-slow"
          style={{ 
            backgroundColor: selectedColor,
            height: '22px', 
            width: '25px',
            boxShadow: `0 0 18px 10px ${selectedColor}`,
            borderRadius: '62% 38% 58% 42%',
            transform: 'rotate(-12deg)',
            opacity: fadeIn ? 0.95 : 0,
            transition: 'opacity 800ms ease'
          }}
        />

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
