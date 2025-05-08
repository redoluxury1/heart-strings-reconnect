
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';

interface CodeWordConfirmationProps {
  codeWord: string;
  onClose: () => void;
}

const CodeWordConfirmation: React.FC<CodeWordConfirmationProps> = ({ 
  codeWord,
  onClose
}) => {
  return (
    <div className="max-w-md mx-auto text-center px-4">
      {/* Header Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-[#f7e0dc]/60 p-3 rounded-full">
          <Flag className="h-10 w-10 text-[#ba6e59]" />
        </div>
      </div>
      
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-cormorant text-[#2e2a63] mb-6 font-medium">
        Code word set.
      </h2>
      
      {/* Instructions Text */}
      <div className="text-[#5d4357] space-y-4 mb-8 max-w-[90%] mx-auto">
        <p>
          If either of you says it—everything stops.
        </p>
        <p>
          No pushing. No proving your point.
        </p>
        <p>
          You pause and give space—even if it's hard.
        </p>
        <p>
          You'll re-approach it later with support.
        </p>
      </div>
      
      {/* Highlighted Code Word Box */}
      <div className="bg-[#f7e0dc]/50 p-5 rounded-lg mb-8">
        <p className="text-[#5d4357] mb-2">Your shared code word:</p>
        <div className="text-2xl font-medium text-[#5d4357]">
          "{codeWord}"
        </div>
      </div>
      
      {/* CTA Button */}
      <Button 
        onClick={onClose}
        className="w-full bg-[#2e2a63] hover:bg-[#1e1a43] text-white py-6 rounded-full text-lg"
      >
        Got it
      </Button>
      
      {/* Optional reminder text */}
      <p className="text-[#5d4357]/70 text-sm mt-6 italic">
        You'll be able to update your code word later from Conflict Settings.
      </p>
    </div>
  );
};

export default CodeWordConfirmation;
