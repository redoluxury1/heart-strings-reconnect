
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flag, PauseCircle } from 'lucide-react';

interface CodeWordUsageProps {
  codeWord: string;
  onCodeWordUsed: () => void;
  onChangeCodeWord: () => void;
}

const CodeWordUsage: React.FC<CodeWordUsageProps> = ({ 
  codeWord, 
  onCodeWordUsed, 
  onChangeCodeWord 
}) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-[#f7e0dc]/60 p-4 rounded-full">
          <PauseCircle className="w-12 h-12 text-[#5d4357]" />
        </div>
      </div>
      
      <h3 className="text-xl text-[#5d4357] mb-2">
        Your shared code word is:
      </h3>
      
      <div className="bg-[#f7e0dc]/50 p-5 rounded-lg mb-6 text-center">
        <span className="text-3xl font-medium text-[#5d4357]">
          "{codeWord}"
        </span>
      </div>
      
      <p className="text-[#5d4357]/80 mb-8 italic">
        When either of you says this word, it means "let's pause this conversation" — no questions asked.
      </p>
      
      <div className="space-y-4">
        <Button
          onClick={onCodeWordUsed}
          className="w-full flex items-center justify-center gap-2 bg-[#5d4357] hover:bg-[#4d3347] text-white py-4"
        >
          <Flag size={18} />
          <span>We used our code word</span>
        </Button>
        
        <Button
          onClick={onChangeCodeWord}
          variant="outline"
          className="w-full border-[#5d4357]/50 text-[#5d4357] hover:bg-[#5d4357]/10"
        >
          Change our code word
        </Button>
      </div>
      
      <div className="mt-8 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 p-3 bg-[#f7e0dc]/30 rounded-lg">
          <input type="checkbox" id="remind" className="rounded" />
          <label htmlFor="remind" className="text-sm text-[#5d4357]">
            Remind us about our code word during a fight
          </label>
        </div>
      </div>
    </div>
  );
};

export default CodeWordUsage;
