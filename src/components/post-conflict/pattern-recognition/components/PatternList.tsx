
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CommonPattern } from '../types';

interface PatternListProps {
  patterns: CommonPattern[];
  onPatternSelect: (patternId: string) => void;
}

const PatternList: React.FC<PatternListProps> = ({ patterns, onPatternSelect }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-[#1A1A2E] mb-3">Which pattern sounds like your relationship?</h1>
        <p className="text-gray-600">
          Most couples find themselves caught in the same few emotional cycles. 
          Which one feels most familiar to you?
        </p>
      </div>
      
      <div className="space-y-4">
        {patterns.map(pattern => (
          <Card 
            key={pattern.id} 
            className="p-5 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onPatternSelect(pattern.id.toString())}
          >
            <h3 className="text-xl font-semibold mb-2">{pattern.name}</h3>
            <p className="text-gray-600">{pattern.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatternList;
