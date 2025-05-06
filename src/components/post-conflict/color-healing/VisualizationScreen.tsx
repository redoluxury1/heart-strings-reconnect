
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
  
  // Trigger fade-in animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Visualization
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-md mx-auto">
        Imagine a small ball of light in your body—it's your chosen color. Maybe it's in your belly… or your chest… or your mind. Picture it clearly.
      </p>

      <div className="relative h-40 w-40 mb-10 flex items-center justify-center">
        <div 
          className={`absolute rounded-full transition-all duration-1000 ${fadeIn ? 'opacity-80 scale-100' : 'opacity-0 scale-0'}`}
          style={{ 
            backgroundColor: selectedColor, 
            height: '100px', 
            width: '100px',
            boxShadow: `0 0 40px 10px ${selectedColor}`,
            filter: 'blur(5px)'
          }}
        />
        <div 
          className={`absolute rounded-full transition-all duration-1500 delay-300 ${fadeIn ? 'opacity-60' : 'opacity-0'}`}
          style={{ 
            backgroundColor: selectedColor, 
            height: '120px', 
            width: '120px',
            boxShadow: `0 0 25px 5px ${selectedColor}`,
            filter: 'blur(8px)'
          }}
        />
      </div>
      
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
