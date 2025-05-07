
import React from 'react';
import { Button } from '@/components/ui/button';

interface PatternIntroScreenProps {
  onContinue: () => void;
}

const PatternIntroScreen: React.FC<PatternIntroScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-4"
         style={{ background: "#F5F0E8" }}>
      <h2 className="text-5xl font-cormorant font-medium text-midnight-indigo mb-6 tracking-tight">
        Let's break the cycle.
      </h2>
      
      <p className="text-xl text-midnight-indigo mb-10 max-w-2xl">
        Every couple has patterns. The goal isn't to be perfect—it's to catch 
        the cycle before it catches you.
      </p>
      
      <div className="relative w-full max-w-md mb-10">
        <img
          src="/lovable-uploads/39110aa2-d4b1-4586-bd3f-56a1ae1053c8.png"
          alt="Couple sitting back to back with arms crossed"
          className="w-full h-auto rounded-lg"
        />
      </div>
      
      <Button
        onClick={onContinue}
        className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-6 px-8 rounded-full text-xl w-full max-w-md"
      >
        Start Recognizing the Pattern
      </Button>
    </div>
  );
};

export default PatternIntroScreen;
