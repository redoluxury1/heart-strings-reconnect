
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ColorExpansionScreenProps {
  selectedColor: string;
  onContinue: () => void;
  onBack: () => void;
}

const ColorExpansionScreen: React.FC<ColorExpansionScreenProps> = ({ 
  selectedColor,
  onContinue,
  onBack
}) => {
  const [expansion, setExpansion] = useState(0);
  
  // Gradually expand the color effect
  useEffect(() => {
    if (expansion < 100) {
      const timer = setTimeout(() => {
        setExpansion(prev => Math.min(prev + 2, 100));
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [expansion]);

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center relative">
      {/* Background color overlay that gradually expands */}
      <div 
        className="absolute inset-0 rounded-lg transition-opacity duration-1000"
        style={{ 
          backgroundColor: selectedColor,
          opacity: (expansion / 100) * 0.15
        }}
      ></div>
      
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo relative z-10">
        Let It Expand
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-md mx-auto relative z-10">
        Now imagine the color softening everything around you. The room. The air. Even the memory that's been hurting… let it float in that color. Let it be okay.
      </p>

      <div className="relative h-60 w-full mb-10 flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((layer) => (
          <div 
            key={layer}
            className="absolute rounded-full transition-all duration-2000"
            style={{ 
              backgroundColor: selectedColor, 
              height: `${Math.min(expansion * 3, 280)}px`, 
              width: `${Math.min(expansion * 3, 280)}px`,
              opacity: (0.8 - (layer * 0.15)) * (expansion / 100),
              filter: `blur(${layer * 5}px)`,
              transform: `scale(${1 + (layer * 0.2)})`,
              transition: 'all 2s ease-out'
            }}
          />
        ))}
      </div>
      
      <div className="flex space-x-4 mt-4 relative z-10">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-gray-300 text-gray-600 hover:text-[#7d6272] bg-white"
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

export default ColorExpansionScreen;
