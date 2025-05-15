
import React from 'react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/common/OptimizedImage';
import { CyclePatternScreenProps } from '../types';

const CyclePatternScreen: React.FC<CyclePatternScreenProps> = ({ 
  onContinue,
  pattern,
  cycleData,
  onBack,
  onViewRepair 
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-4">
      <OptimizedImage
        src="/lovable-uploads/ff2e4176-28cc-47b9-b205-8c36e2d8aafe.png"
        alt="Relationship Cycle Diagram showing Frustrated, React, Hurt, Distance"
        className="w-full h-auto mb-6"
        priority={true}
      />
      
      <h2 className="text-5xl font-cormorant font-medium text-[#14213d] mb-4">
        Does this feel familiar?
      </h2>
      
      <p className="text-xl text-[#14213d] mb-10">
        Patterns are hard to see when you're in them. But they repeat for a reason. Let's name yours.
      </p>
      
      <Button
        onClick={onContinue}
        className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-2 px-5 rounded-full text-sm"
      >
        See Common Patterns
      </Button>
      
      {onBack && (
        <Button
          onClick={onBack}
          variant="outline"
          className="mt-4"
        >
          Back
        </Button>
      )}
    </div>
  );
};

export default CyclePatternScreen;
