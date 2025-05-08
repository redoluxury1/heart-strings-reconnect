
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CodeWordSetupProps {
  onSetCodeWord: (word: string) => void;
}

const SUGGESTED_WORDS = [
  'Marshmallow',
  'Red Light',
  'Pineapple',
  'Switch Tracks',
  'Dog Whistle'
];

const CodeWordSetup: React.FC<CodeWordSetupProps> = ({ onSetCodeWord }) => {
  const [customWord, setCustomWord] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (customWord.trim()) {
      onSetCodeWord(customWord.trim());
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl text-[#5d4357] mb-2 font-medium text-center">
        Choose your code word
      </h3>
      <p className="text-[#5d4357]/80 mb-6 text-center">
        A shared word that means: pause now, talk later.
      </p>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-6">
          <Input
            type="text"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
            placeholder="Enter your code word"
            className="w-full py-5 px-4"
          />
        </div>
        
        <Button 
          type="submit"
          className="w-full bg-[#2e2a63] hover:bg-[#1e1a43] text-white py-5 rounded-full"
          disabled={!customWord.trim()}
        >
          Lock it in
        </Button>
      </form>
      
      <div className="mt-8">
        <h4 className="text-lg text-[#5d4357] mb-3 text-center">
          Or choose a suggestion:
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SUGGESTED_WORDS.map((word) => (
            <button
              key={word}
              onClick={() => onSetCodeWord(word)}
              className="bg-[#f7e0dc] text-[#5d4357] py-2 px-3 rounded-full hover:bg-[#e7c6c0] transition-colors text-sm"
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeWordSetup;
