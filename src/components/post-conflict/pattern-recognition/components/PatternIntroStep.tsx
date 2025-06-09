
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

interface PatternIntroStepProps {
  onNext: () => void;
}

const PatternIntroStep: React.FC<PatternIntroStepProps> = ({ onNext }) => {
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="w-16 h-16 bg-[#e1d8ed] rounded-full flex items-center justify-center mx-auto mb-4">
          <RotateCw className="h-8 w-8 text-[#2e2a63]" />
        </div>
        <h2 className="text-2xl font-cormorant font-medium text-[#2e2a63] mb-3">
          Feel like you've had this fight before?
        </h2>
        <p className="text-[#2e2a63]/80 text-lg">
          Patterns don't mean you're doomed—they mean you're human. Let's figure out what's underneath this one.
        </p>
      </div>
      
      <Button 
        onClick={onNext}
        className="bg-[#2e2a63] hover:bg-[#2e2a63]/90 text-white px-6 py-3 rounded-lg"
      >
        Let's Recognize the Pattern
      </Button>
    </div>
  );
};

export default PatternIntroStep;
