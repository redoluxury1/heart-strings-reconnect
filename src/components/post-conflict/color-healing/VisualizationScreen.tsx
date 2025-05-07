
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

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

      <div className="relative h-80 w-full mb-10 flex items-center justify-center">
        {/* The orb starts as a small dot and expands */}
        <div 
          className={`rounded-full transition-all duration-[10000ms] ${
            expandOrb 
              ? 'scale-[10] opacity-30' 
              : (fadeIn ? 'scale-[0.3] opacity-30' : 'scale-0 opacity-0')
          } animate-pulse-slow`}
          style={{ 
            backgroundColor: 'transparent',
            height: '60px', 
            width: '60px',
            boxShadow: `0 0 40px 15px ${selectedColor}`,
            filter: 'blur(8px)'
          }}
        />
        
        {/* Medium glow layer */}
        <div 
          className={`absolute rounded-full transition-all duration-[10000ms] ${
            expandOrb 
              ? 'scale-[8] opacity-40' 
              : (fadeIn ? 'scale-[0.2] opacity-40' : 'scale-0 opacity-0')
          } animate-pulse-slow`}
          style={{ 
            backgroundColor: 'transparent',
            height: '50px', 
            width: '50px',
            boxShadow: `0 0 30px 10px ${selectedColor}`,
            filter: 'blur(6px)'
          }}
        />
        
        {/* Inner bright core */}
        <div 
          className={`absolute rounded-full transition-all duration-[10000ms] ${
            expandOrb 
              ? 'scale-[6] opacity-70' 
              : (fadeIn ? 'scale-[0.1] opacity-70' : 'scale-0 opacity-0')
          }`}
          style={{ 
            backgroundColor: selectedColor,
            height: '40px', 
            width: '40px',
            boxShadow: `0 0 20px 8px ${selectedColor}`,
            filter: 'blur(2px)'
          }}
        />
        
        {/* Central dot - always stays small and bright */}
        <div 
          className={`absolute rounded-full transition-opacity duration-1000 ${
            fadeIn ? 'opacity-90' : 'opacity-0'
          }`}
          style={{ 
            backgroundColor: selectedColor,
            height: '20px', 
            width: '20px',
            boxShadow: `0 0 15px 5px ${selectedColor}`
          }}
        />
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
