
import React from 'react';
import { CommonPattern } from '../types';
import { PatternId } from '../hooks/usePatternRecognition';
import { Button } from '@/components/ui/button';

interface PatternListProps {
  patterns: CommonPattern[];
  onPatternSelect: (patternId: PatternId) => void;
}

const PatternList: React.FC<PatternListProps> = ({ patterns, onPatternSelect }) => {
  return (
    <div className="bg-[#F5F0E8] p-4 rounded-lg">
      <div className="flex flex-col items-center justify-center mb-8 mt-4">
        <div className="relative w-full max-w-md mb-4">
          <img 
            src="/lovable-uploads/5cb5dfb1-324e-4ed4-b1a6-5e68957ad34e.png" 
            alt="Relationship cycle: Frustration, React, Hurt, Distance" 
            className="w-full h-auto"
          />
        </div>

        <h2 className="text-4xl md:text-5xl font-cormorant font-medium text-[#14213d] my-6 text-center">
          Does this feel familiar?
        </h2>
        
        <p className="text-[#14213d] text-lg md:text-xl max-w-2xl text-center mb-6">
          Most couples fall into the same pattern again and again. It usually starts small—then spirals. 
          Let's slow it down and catch the steps.
        </p>

        <Button 
          className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-6 px-8 rounded-full text-xl w-full max-w-md"
          onClick={() => onPatternSelect("1")}
        >
          See Common Patterns
        </Button>
      </div>
    </div>
  );
};

export default PatternList;
