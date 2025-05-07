
import React from 'react';
import { Button } from '@/components/ui/button';

interface CyclePatternScreenProps {
  onContinue: () => void;
}

const CyclePatternScreen: React.FC<CyclePatternScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-4">
      <img
        src="/lovable-uploads/48503719-c345-4690-a720-f4d2dd4b0030.png"
        alt="Relationship Cycle Diagram showing Frustrated, React, Hurt, Distance"
        className="w-full h-auto mb-6"
      />
      
      <h2 className="text-5xl font-cormorant font-medium text-midnight-indigo mb-4">
        Does this feel familiar?
      </h2>
      
      <p className="text-xl text-midnight-indigo mb-10">
        Most couples fall into the same pattern again and again. It usually starts small—then spirals. Let's slow it down and catch the steps.
      </p>
      
      <Button
        onClick={onContinue}
        className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-3 px-8 rounded-full text-xl w-full max-w-sm"
      >
        See Common Patterns
      </Button>
    </div>
  );
};

export default CyclePatternScreen;
