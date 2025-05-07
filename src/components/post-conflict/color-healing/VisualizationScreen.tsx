
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
  
  // Trigger fade-in animation after component mounts
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 500);
    
    // Trigger the expansion animation after a delay
    const expandTimer = setTimeout(() => {
      setExpandOrb(true);
    }, 2000);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(expandTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Visualization
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-md mx-auto">
        Imagine a small ball of light in your body—it's your chosen color. Maybe it's in your belly… or your chest… or your mind. Picture it clearly.
      </p>

      <div className="relative h-40 w-40 mb-10 flex items-center justify-center overflow-visible">
        {/* Expanding overlay that covers the entire screen */}
        <div 
          className={`fixed inset-0 transition-opacity duration-[8000ms] pointer-events-none z-10 ${
            expandOrb ? 'opacity-80' : 'opacity-0'
          }`}
          style={{ 
            backgroundColor: selectedColor,
          }}
        />
        
        {/* Larger outer glow */}
        <div 
          className={`absolute rounded-full transition-all duration-[5000ms] ${
            expandOrb ? 'scale-[15] opacity-20' : (fadeIn ? 'opacity-40 scale-100' : 'opacity-0 scale-0')
          }`}
          style={{ 
            backgroundColor: selectedColor, 
            height: '140px', 
            width: '140px',
            boxShadow: `0 0 60px 20px ${selectedColor}`,
            filter: 'blur(15px)'
          }}
        />
        
        {/* Medium glow layer */}
        <div 
          className={`absolute rounded-full transition-all duration-[4000ms] ${
            expandOrb ? 'scale-[10] opacity-40' : (fadeIn ? 'opacity-60 scale-100' : 'opacity-0 scale-0')
          }`}
          style={{ 
            backgroundColor: selectedColor, 
            height: '120px', 
            width: '120px',
            boxShadow: `0 0 40px 15px ${selectedColor}`,
            filter: 'blur(10px)'
          }}
        />
        
        {/* Inner core */}
        <div 
          className={`absolute rounded-full transition-all duration-[3000ms] ${
            expandOrb ? 'scale-[8] opacity-80' : (fadeIn ? 'opacity-80 scale-100' : 'opacity-0 scale-0')
          }`}
          style={{ 
            backgroundColor: selectedColor, 
            height: '100px', 
            width: '100px',
            boxShadow: `0 0 30px 10px ${selectedColor}`,
            filter: 'blur(5px)'
          }}
        />
      </div>
      
      <div className={`flex space-x-4 mt-4 transition-opacity duration-1000 ${expandOrb ? 'opacity-0' : 'opacity-100'}`}>
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
