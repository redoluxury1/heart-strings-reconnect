
import React from 'react';
import { Button } from '@/components/ui/button';
import { CodeWordInfo } from '@/types/relationship';
import CodeWordDisplay from '../code-word/components/CodeWordDisplay';

interface PauseActivatedViewProps {
  codeWord: CodeWordInfo;
  onTimerSelect: (minutes: number | null) => void;
}

const PauseActivatedView: React.FC<PauseActivatedViewProps> = ({ 
  codeWord,
  onTimerSelect 
}) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-[#FDE1D3]/50 p-5 rounded-lg mb-6">
        <h3 className="text-2xl text-[#5d4357] font-medium mb-4">
          Pause Activated
        </h3>
        <p className="text-[#5d4357] mb-6">
          Your code word <span className="font-medium">"{codeWord.word}"</span> was used. 
          That means you both agreed to pause—right now.
        </p>
      </div>
      
      <h4 className="text-xl text-[#5d4357] mb-4">
        How much space do you need?
      </h4>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button 
          onClick={() => onTimerSelect(10)} 
          className="bg-[#f7e0dc] text-[#5d4357] hover:bg-[#e7c6c0] py-5"
        >
          10 minutes
        </Button>
        <Button 
          onClick={() => onTimerSelect(20)} 
          className="bg-[#f7e0dc] text-[#5d4357] hover:bg-[#e7c6c0] py-5"
        >
          20 minutes
        </Button>
        <Button 
          onClick={() => onTimerSelect(60)} 
          className="bg-[#f7e0dc] text-[#5d4357] hover:bg-[#e7c6c0] py-5"
        >
          1 hour
        </Button>
        <Button 
          onClick={() => onTimerSelect(null)}
          className="bg-[#f7e0dc] text-[#5d4357] hover:bg-[#e7c6c0] py-5"
        >
          No timer
        </Button>
      </div>
      
      <div className="mt-8 italic text-[#5d4357]/70">
        You're doing something brave by pausing.
        This helps create safety, not distance.
      </div>
    </div>
  );
};

export default PauseActivatedView;
