
import React from 'react';
import { Button } from '@/components/ui/button';
import { PatternsIcon } from './PatternRecognitionIcons';

interface PatternIntroScreenProps {
  onContinue: () => void;
}

const PatternIntroScreen: React.FC<PatternIntroScreenProps> = ({ onContinue }) => {
  const handleContinueClick = (e: React.MouseEvent) => {
    // Prevent default behavior to avoid page jumps
    e.preventDefault();
    onContinue();
  };

  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E7D9C9] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center text-center">
        {/* Icon at the top */}
        <div className="w-20 h-20 rounded-full bg-[#C7747F]/10 flex items-center justify-center mb-6">
          <PatternsIcon className="w-12 h-12 text-[#C7747F]" />
        </div>
        
        {/* Title */}
        <h2 className="font-cormorant text-2xl md:text-3xl font-medium text-[#14213d] mb-4">
          Let's break the cycle.
        </h2>
        
        {/* Description */}
        <p className="text-sm md:text-base text-[#14213d]/80 mb-8 max-w-md">
          Every couple has patterns. The goal isn't to be perfect—it's to catch 
          the cycle before it catches you.
        </p>
        
        {/* Button - made smaller with more compact padding and text size */}
        <Button
          onClick={handleContinueClick}
          className="bg-[#14213d] hover:bg-[#14213d]/90 text-white text-sm font-medium py-1.5 px-4 rounded-full"
        >
          Start Recognizing the Pattern
        </Button>
      </div>
    </div>
  );
};

export default PatternIntroScreen;
