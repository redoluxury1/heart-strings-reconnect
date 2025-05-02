
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BrainCog } from 'lucide-react';
import { useInterface } from '../../hooks/useInterfaceContext';
import LetsTalkSession from './LetsTalkSession';

const LetsTalkThisOut = () => {
  const { colors } = useInterface();
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  
  if (isSessionStarted) {
    return <LetsTalkSession onExit={() => setIsSessionStarted(false)} />;
  }

  return (
    <div className="bg-gradient-to-br from-soft-cream/40 to-soft-cream/10 rounded-xl shadow-md p-6 md:p-8 mb-12">
      <div className="flex flex-col items-center">
        <BrainCog className="h-12 w-12 text-mauve-rose mb-4" />
        
        <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-3 text-center text-midnight-indigo">
          Let's Talk This Out
        </h2>
        
        <p className="text-center text-gray-700 mb-6 max-w-xl">
          This is a space for both of you to pause, process, and talk it through — together. One step at a time.
        </p>
        
        <Button 
          onClick={() => setIsSessionStarted(true)}
          className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white px-8 py-2"
        >
          Let's get to the bottom of it
        </Button>
      </div>
    </div>
  );
};

export default LetsTalkThisOut;
