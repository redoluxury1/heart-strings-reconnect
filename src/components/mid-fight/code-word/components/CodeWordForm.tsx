
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CodeWordFormProps {
  initialWord: string;
  onSubmit: (word: string) => void;
  onWordChange?: (word: string) => void;
}

const CodeWordForm: React.FC<CodeWordFormProps> = ({ 
  initialWord, 
  onSubmit,
  onWordChange 
}) => {
  const [customWord, setCustomWord] = useState(initialWord || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (customWord.trim()) {
      onSubmit(customWord.trim());
    }
  };
  
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWord = e.target.value;
    setCustomWord(newWord);
    if (onWordChange) {
      onWordChange(newWord);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-6">
        <Input
          type="text"
          value={customWord}
          onChange={handleWordChange}
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
  );
};

export default CodeWordForm;
