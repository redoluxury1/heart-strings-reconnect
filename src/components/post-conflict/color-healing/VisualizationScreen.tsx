
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
  const [expansionScale, setExpansionScale] = useState(0);
  
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
          
          // Adjust expansion scale based on countdown time
          // Scale grows dramatically as we approach 3 seconds
          const newScale = prev <= 3 
            ? 20 - (prev * 1.5) // Faster growth in final 3 seconds
            : 6 + ((10 - prev) * 1.8); // Gradual growth until 3 seconds
          
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

      <div className="relative h-80 w-full mb-10 flex items-center justify-center">
        {/* Outer glow layer with more irregular shape */}
        <div 
          className="rounded-full transition-all duration-1000 animate-pulse-slow"
          style={{ 
            backgroundColor: 'transparent',
            height: '65px', 
            width: '70px', // Slightly wider to create less circular shape
            boxShadow: `0 0 40px 20px ${selectedColor}`,
            filter: 'blur(10px)',
            transform: 'rotate(15deg)', // Slight rotation for irregular shape
            opacity: fadeIn ? 0.3 : 0,
            scale: expandOrb ? `${expansionScale}` : fadeIn ? '0.3' : '0'
          }}
        />
        
        {/* Medium glow layer with different dimensions */}
        <div 
          className="absolute rounded-full transition-all duration-1000 animate-wave-circle"
          style={{ 
            backgroundColor: 'transparent',
            height: '48px', 
            width: '53px', // Different ratio for less circular appearance
            boxShadow: `0 0 35px 15px ${selectedColor}`,
            filter: 'blur(6px)',
            borderRadius: '60% 40% 50% 45%', // Irregular border radius
            opacity: fadeIn ? 0.4 : 0,
            scale: expandOrb ? `${expansionScale * 0.8}` : fadeIn ? '0.2' : '0'
          }}
        />
        
        {/* Inner bright core with pulsing effect */}
        <div 
          className="absolute rounded-full transition-all duration-1000 animate-expand"
          style={{ 
            backgroundColor: selectedColor,
            height: '40px', 
            width: '44px', // Slightly wider for less perfect circle
            boxShadow: `0 0 25px 12px ${selectedColor}`,
            filter: 'blur(2px)',
            borderRadius: '55% 45% 60% 40%', // Irregular border radius
            opacity: fadeIn ? 0.7 : 0,
            scale: expandOrb ? `${expansionScale * 0.6}` : fadeIn ? '0.1' : '0'
          }}
        />
        
        {/* Central dot with constant pulsing */}
        <div 
          className="absolute transition-opacity duration-1000 animate-pulse-slow"
          style={{ 
            backgroundColor: selectedColor,
            height: '20px', 
            width: '22px', // Slightly wider
            boxShadow: `0 0 15px 8px ${selectedColor}`,
            borderRadius: '60% 40% 55% 45%', // Irregular border radius
            transform: 'rotate(-10deg)', // Slight rotation
            opacity: fadeIn ? 0.9 : 0
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
