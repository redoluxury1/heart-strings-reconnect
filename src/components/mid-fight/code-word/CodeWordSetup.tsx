
import React from 'react';
import CodeWordForm from './components/CodeWordForm';
import SuggestionGrid from './components/SuggestionGrid';

interface CodeWordSetupProps {
  onSetCodeWord: (word: string) => void;
  initialWord?: string;
  onWordChange?: (word: string) => void;
}

const SUGGESTED_WORDS = [
  'Red Light',
  'Redo',
  'Freeze',
  'Switch Tracks'
];

const CodeWordSetup: React.FC<CodeWordSetupProps> = ({ 
  onSetCodeWord, 
  initialWord = '', 
  onWordChange 
}) => {
  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl text-[#5d4357] mb-2 font-medium text-center">
        Choose your code word
      </h3>
      <p className="text-[#5d4357]/80 mb-6 text-center">
        A shared word that means: pause now, talk later.
      </p>
      
      <CodeWordForm 
        initialWord={initialWord} 
        onSubmit={onSetCodeWord}
        onWordChange={onWordChange}
      />
      
      <SuggestionGrid 
        suggestions={SUGGESTED_WORDS} 
        onSelect={onSetCodeWord} 
      />
    </div>
  );
};

export default CodeWordSetup;
