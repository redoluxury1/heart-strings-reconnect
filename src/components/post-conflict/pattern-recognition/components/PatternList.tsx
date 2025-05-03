
import React from 'react';
import { CommonPattern } from '../types';

interface PatternListProps {
  patterns: CommonPattern[];
  onPatternSelect: (patternId: number) => void;
}

const PatternList: React.FC<PatternListProps> = ({ patterns, onPatternSelect }) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6 text-center">
        Identify Your Pattern
      </h2>
      
      <p className="text-gray-700 mb-8 text-center">
        Which of these patterns feels most familiar in your relationship? 
        Identifying your pattern is the first step to breaking it.
      </p>
      
      <div className="space-y-4">
        {patterns.map(pattern => (
          <button
            key={pattern.id}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-soft-cream/20 transition-colors"
            onClick={() => onPatternSelect(pattern.id)}
          >
            <h3 className="font-medium text-mauve-rose">{pattern.name}</h3>
            <p className="text-gray-600 mt-1">{pattern.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternList;
