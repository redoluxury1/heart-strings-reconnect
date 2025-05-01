
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircleHeart, Target } from 'lucide-react';
import { useInterface } from '../common/InterfaceProvider';
import LetsTalkSession from './LetsTalkSession';

const LetsTalkThisOut = () => {
  const { isEmotional } = useInterface();
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  
  if (isSessionStarted) {
    return <LetsTalkSession onExit={() => setIsSessionStarted(false)} />;
  }

  return (
    <div className={`${
      isEmotional
        ? "bg-gradient-to-br from-soft-cream/40 to-soft-cream/10"
        : "bg-gradient-to-br from-slate-200 to-slate-100"
    } rounded-xl shadow-md p-6 md:p-8 mb-12`}>
      <div className="flex flex-col items-center">
        {isEmotional ? (
          <MessageCircleHeart className="h-12 w-12 text-mauve-rose mb-4" />
        ) : (
          <Target className="h-12 w-12 text-emerald-600 mb-4" />
        )}
        
        <h2 className={`text-2xl md:text-3xl font-cormorant font-medium mb-3 text-center ${
          isEmotional ? "text-midnight-indigo" : "text-slate-800"
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
              : "bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-2"
          }
        >
          {isEmotional ? "Let's get to the bottom of it" : "Solve it now"}
        </Button>
      </div>
    </div>
  );
};

export default LetsTalkThisOut;
