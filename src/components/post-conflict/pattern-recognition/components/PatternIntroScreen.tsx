
import React from 'react';
import { Button } from '@/components/ui/button';

interface PatternIntroScreenProps {
  onContinue: () => void;
}

const PatternIntroScreen: React.FC<PatternIntroScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-4">
      <h2 className="text-5xl font-cormorant font-medium text-[#1A1F2C] mb-6 tracking-tight">
        Let's break the cycle.
      </h2>
      
      <p className="text-xl text-[#1A1F2C] mb-10 max-w-2xl">
        Every couple has patterns. The goal isn't to be perfect—it's to catch 
        the cycle before it catches you.
      </p>
      
      <div className="relative w-full max-w-md mb-10">
        <img
          src="/lovable-uploads/4cc603b1-af21-448f-a503-90fb944e6635.png"
          alt="Couple sitting back to back with arms crossed"
          className="w-full h-auto rounded-lg"
        />
      </div>
      
      <Button
        onClick={onContinue}
        className="bg-[#1A1F2C] hover:bg-[#111827] text-white font-medium py-6 px-8 rounded-full text-lg w-full max-w-md"
      >
        Start Recognizing the Pattern
      </Button>
    </div>
  );
};

export default PatternIntroScreen;
