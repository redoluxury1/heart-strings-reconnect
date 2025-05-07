
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
      // Start with 5 seconds
      setCountdown(5);
      
      // Start countdown
      countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Start expansion animation when countdown begins
      setExpandOrb(true);
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

      <div className="relative h-80 w-full mb-10 flex items-center justify-center overflow-hidden">
        {/* Container for the orb expansion - limited to this div */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Largest glow layer - will fill the container but not beyond */}
          <div 
            className={`absolute rounded-full transition-all duration-[5000ms] ${
              expandOrb ? 'scale-[8] opacity-30' : (fadeIn ? 'opacity-20 scale-100' : 'opacity-0 scale-0')
            }`}
            style={{ 
              backgroundColor: 'transparent', 
              height: '160px', 
              width: '160px',
              boxShadow: `0 0 80px 30px ${selectedColor}`,
              filter: 'blur(20px)'
            }}
          />
          
          {/* Large outer glow */}
          <div 
            className={`absolute rounded-full transition-all duration-[5000ms] ${
              expandOrb ? 'scale-[6] opacity-40' : (fadeIn ? 'opacity-30 scale-100' : 'opacity-0 scale-0')
            }`}
            style={{ 
              backgroundColor: 'transparent', 
              height: '140px', 
              width: '140px',
              boxShadow: `0 0 60px 25px ${selectedColor}`,
              filter: 'blur(15px)'
            }}
          />
          
          {/* Medium glow layer */}
          <div 
            className={`absolute rounded-full transition-all duration-[5000ms] ${
              expandOrb ? 'scale-[4] opacity-50' : (fadeIn ? 'opacity-40 scale-100' : 'opacity-0 scale-0')
            } animate-pulse-slow`}
            style={{ 
              backgroundColor: 'transparent', 
              height: '120px', 
              width: '120px',
              boxShadow: `0 0 50px 20px ${selectedColor}`,
              filter: 'blur(10px)'
            }}
          />
          
          {/* Inner core - always visible */}
          <div 
            className={`absolute rounded-full transition-all duration-[5000ms] ${
              expandOrb ? 'scale-[2.5] opacity-70' : (fadeIn ? 'opacity-70 scale-100' : 'opacity-0 scale-0')
            }`}
            style={{ 
              backgroundColor: selectedColor,
              height: '100px', 
              width: '100px',
              boxShadow: `0 0 30px 15px ${selectedColor}`,
              filter: 'blur(5px)'
            }}
          />
        </div>
      </div>
      
      {/* Countdown display */}
      {countdown !== null && (
        <div className="mb-8 text-2xl font-medium text-gray-600 transition-opacity duration-300">
          {countdown}
        </div>
      )}
      
      <div className="flex space-x-4 mt-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-gray-300 text-gray-600 hover:text-[#7d6272]"
        >
          Back
        </Button>
        <Button 
          onClick={onContinue}
          className="bg-[#7d6272] hover:bg-[#6d5262] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VisualizationScreen;
