
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BrainCog, Scale } from 'lucide-react';
import { useInterface } from '../../hooks/useInterfaceContext';
import LetsTalkSession from './LetsTalkSession';

const LetsTalkThisOut = () => {
  const { isEmotional, colors } = useInterface();
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  
  if (isSessionStarted) {
    return <LetsTalkSession onExit={() => setIsSessionStarted(false)} />;
  }

  return (
    <div className={`${
      isEmotional
        ? "bg-gradient-to-br from-soft-cream/40 to-soft-cream/10 rounded-xl"
        : "bg-gradient-to-br from-[#D1E5F4] to-[#D1E5F4]/80 rounded-md"
    } shadow-md p-6 md:p-8 mb-12`}>
      <div className="flex flex-col items-center">
        {isEmotional ? (
          <BrainCog className="h-12 w-12 text-mauve-rose mb-4" />
        ) : (
          <Scale className="h-12 w-12 text-[#589391] mb-4" />
        )}
        
        <h2 className={`text-3xl md:text-4xl ${isEmotional ? "font-cormorant" : ""} font-medium mb-3 text-center ${
          isEmotional ? "text-midnight-indigo" : "text-[#221F26]"
        }`}>
          {isEmotional ? "Let's Talk This Out" : "Get to the Bottom of It"}
        </h2>
        
        <p className="text-center text-gray-700 mb-6 max-w-xl">
          {isEmotional
            ? "This is a space for both of you to pause, process, and talk it through — together. One step at a time."
            : "Clear the air, solve the problem, and move forward. Let's break it down and fix it."
          }
        </p>
        
        <Button 
          onClick={() => setIsSessionStarted(true)}
          className={
            isEmotional
              ? "bg-midnight-indigo hover:bg-midnight-indigo/90 text-white px-8 py-2"
              : "bg-[#E51D2C] hover:bg-[#E51D2C]/90 text-white px-8 py-2"
          }
        >
          {isEmotional ? "Let's get to the bottom of it" : "Solve it now"}
        </Button>
      </div>
    </div>
  );
};

export default LetsTalkThisOut;
