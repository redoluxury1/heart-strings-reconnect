
import React from 'react';
import { Button } from '@/components/ui/button';
import { PauseCircle } from 'lucide-react';

interface CodeWordSetupViewProps {
  onGetStarted: () => void;
}

const CodeWordSetupView: React.FC<CodeWordSetupViewProps> = ({ onGetStarted }) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Pulsing background effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#f7e0dc]/30 animate-pulse"></div>
          
          {/* Original background and icon */}
          <div className="bg-[#f7e0dc]/60 p-4 rounded-full relative z-10">
            <PauseCircle className="w-16 h-16 text-[#E2725B]" />
          </div>
        </div>
      </div>
      
      <p className="text-[#07183D]/80 mb-6">
        When a conversation gets heated, sometimes the best thing to do is pause. 
        Set up a code word that signals you both need space.
      </p>
      
      <div className="bg-[#536878]/20 p-5 rounded-lg mb-6">
        <p className="text-[#07183D] mb-3">
          Your shared pause word allows you to:
        </p>
        <ul className="text-left text-[#07183D]/80 space-y-2 mb-4">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Signal the need for a break without escalating</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Create emotional safety during difficult moments</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Set a specific time to reconnect when you're both ready</span>
          </li>
        </ul>
      </div>
      
      <Button
        onClick={onGetStarted}
        className="w-full bg-[#536878] hover:bg-[#536878]/90 text-white py-5"
      >
        Set Up Your Code Word
      </Button>
    </div>
  );
};

export default CodeWordSetupView;
