
import React from 'react';
import { Button } from "@/components/ui/button";

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto text-center bg-white p-8 md:p-10 rounded-xl shadow-md">
      <div className="flex justify-center mb-8">
        <img 
          src="/lovable-uploads/ea21751d-1de8-46e7-a674-7b702545c569.png" 
          alt="The Love Codes™" 
          className="w-full max-w-md h-auto"
        />
      </div>
      
      <div className="bg-soft-blush/30 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-midnight-indigo mb-3">How It Works:</h3>
        <ul className="text-left text-midnight-indigo/80 space-y-2">
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-mauve-rose mr-2 mt-2"></span>
            <span>Answer 25 questions about your preferences in relationships</span>
          </li>
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-mauve-rose mr-2 mt-2"></span>
            <span>No right or wrong answers — just honest reflections</span>
          </li>
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-mauve-rose mr-2 mt-2"></span>
            <span>Discover your primary and secondary Love Codes</span>
          </li>
          <li className="flex items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-mauve-rose mr-2 mt-2"></span>
            <span>Receive insights to strengthen your relationship</span>
          </li>
        </ul>
      </div>
      
      <Button 
        size="lg"
        onClick={onStart}
        className="bg-mauve-rose hover:bg-mauve-rose/90 text-white font-medium px-10"
      >
        Start The Quiz
      </Button>
      
      <p className="text-sm text-midnight-indigo/60 mt-6">
        Takes approximately 5-7 minutes to complete
      </p>
    </div>
  );
};

export default QuizIntro;
