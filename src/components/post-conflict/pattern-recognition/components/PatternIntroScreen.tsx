
import React from 'react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/common/OptimizedImage';

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
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-4">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-[#14213d] mb-4 tracking-tight">
        Let's break the cycle.
      </h2>
      
      <p className="text-sm md:text-base text-[#14213d] mb-8 max-w-md">
        Every couple has patterns. The goal isn't to be perfect—it's to catch 
        the cycle before it catches you.
      </p>
      
      <div className="relative w-full max-w-sm mb-8">
        <OptimizedImage
          src="/lovable-uploads/39110aa2-d4b1-4586-bd3f-56a1ae1053c8.png"
          alt="Couple sitting back to back with arms crossed"
          className="w-full h-auto rounded-lg"
          priority={true}
        />
      </div>
      
      <Button
        onClick={handleContinueClick}
        className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-2 px-5 rounded-full text-sm"
      >
        Start Recognizing the Pattern
      </Button>
    </div>
  );
};

export default PatternIntroScreen;
