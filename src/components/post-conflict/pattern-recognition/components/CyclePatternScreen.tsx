
import React from 'react';
import { Button } from '@/components/ui/button';

interface CyclePatternScreenProps {
  onContinue: () => void;
}

const CyclePatternScreen: React.FC<CyclePatternScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-4">
      <img
        src="/lovable-uploads/ff2e4176-28cc-47b9-b205-8c36e2d8aafe.png"
        alt="Relationship Cycle Diagram showing Frustrated, React, Hurt, Distance"
        className="w-full h-auto mb-6"
      />
      
      <h2 className="text-5xl font-cormorant font-medium text-[#14213d] mb-4">
        Does this feel familiar?
      </h2>
      
      <p className="text-xl text-[#14213d] mb-10">
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
