
import React from 'react';
import { Button } from '@/components/ui/button';
import { PauseCircle } from 'lucide-react';

interface CodeWordEstablishedViewProps {
  codeWord: string;
  onActivate: () => void;
  onChangeCodeWord: () => void;
}

const CodeWordEstablishedView: React.FC<CodeWordEstablishedViewProps> = ({ 
  codeWord,
  onActivate,
  onChangeCodeWord
}) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-6">
        <button 
          onClick={onActivate}
          className="bg-[#f7e0dc]/60 p-4 rounded-full hover:bg-[#f7e0dc] transition-colors"
        >
          <PauseCircle className="w-16 h-16 text-[#E2725B]" />
        </button>
      </div>
      
      <h3 className="text-xl font-medium text-[#5d4357] mb-2">
        Your code word is ready
      </h3>
      
      <div className="bg-white border border-[#5d4357]/20 rounded-lg p-4 mb-6">
        <p className="text-[#5d4357]/80 mb-2">Your shared code word:</p>
        <div className="text-2xl font-medium text-[#5d4357] mb-2">"{codeWord}"</div>
        <p className="text-sm text-[#5d4357]/70 italic">
          When either of you says this word, it signals a need to pause
        </p>
      </div>
      
      <p className="text-[#5d4357]/80 mb-6">
        Click the pause button above or anywhere on this card to 
        activate your pause when you need a break.
      </p>
      
      <Button 
        variant="outline" 
        onClick={onChangeCodeWord}
        className="border-[#5d4357]/30 text-[#5d4357] hover:bg-[#5d4357]/10"
      >
        Change code word
      </Button>
    </div>
  );
};

export default CodeWordEstablishedView;
