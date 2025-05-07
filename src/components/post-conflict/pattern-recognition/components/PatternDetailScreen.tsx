
import React from 'react';
import { Button } from '@/components/ui/button';
import { CommonPattern } from '../types';

interface PatternDetailScreenProps {
  pattern: CommonPattern | null;
  onContinue: () => void;
}

const PatternDetailScreen: React.FC<PatternDetailScreenProps> = ({ pattern, onContinue }) => {
  if (!pattern) return null;

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{pattern.name}</h1>
        <p className="text-gray-600">{pattern.description}</p>
      </div>
      
      <div className="w-full my-8">
        {/* Generic pattern image placeholder */}
        <div className="w-full h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
          <span className="text-gray-400">Pattern illustration</span>
        </div>
      </div>
      
      <div className="w-full mt-4">
        <h3 className="text-xl font-bold mb-4">Common examples:</h3>
        <ul className="text-left space-y-2 mb-8">
          {pattern.examples.map((example, idx) => (
            <li key={idx} className="flex items-center">
              <span className="mr-2">•</span>
              <span>{example}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="w-full mt-6">
        <Button 
          onClick={onContinue}
          className="bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white font-medium py-2 px-8 rounded-xl w-full"
        >
          What to Try Instead
        </Button>
      </div>
    </div>
  );
};

export default PatternDetailScreen;
