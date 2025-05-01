
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto text-center bg-white p-8 md:p-10 rounded-xl shadow-md">
      <div className="flex justify-center mb-6">
        <Heart className="h-16 w-16 text-mauve-rose" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-heading-now-medium font-medium text-midnight-indigo mb-4">
        Discover Your Love Code™
      </h1>
      
      <p className="text-midnight-indigo/80 mb-6">
        The Love Code™ quiz helps you understand how you naturally give and receive love. 
        Through 25 thoughtful questions, we'll uncover your unique love language profile 
        and help you connect more deeply with your partner.
      </p>
      
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
