
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInterface } from '../../hooks/useInterfaceContext';
import LetsTalkSession from './LetsTalkSession';
import { useSession } from './context/SessionContext';

const LetsTalkThisOut = () => {
  const { colors } = useInterface();
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const { setCurrentStep } = useSession();
  
  if (isSessionStarted) {
    return <LetsTalkSession onExit={() => setIsSessionStarted(false)} />;
  }

  const handleReady = () => {
    // Set session as started
    setIsSessionStarted(true);
    // Skip directly to step 1 (tone setting) to avoid duplicate first slides
    setCurrentStep(1); 
  };

  return (
    <div className="bg-soft-cream/40 rounded-xl shadow-md p-6 md:p-8 mb-12 text-center">
      <div className="flex flex-col items-center max-w-xl mx-auto">
        <img 
          src="/lovable-uploads/088d792b-f2dc-44de-9679-9ff534e02d4e.png" 
          alt="Couple sitting together" 
          className="h-24 w-auto mb-6" 
        />
        
        <h2 className="text-4xl md:text-5xl font-cormorant font-medium mb-4 text-center text-midnight-indigo">
          Are you ready to work through this?
        </h2>
        
        <p className="text-center text-gray-700 mb-3 text-lg">
          Let's check in before we dive in.
        </p>
        <p className="text-center text-gray-700 mb-8 text-lg">
          It's okay if you need a little more time.
        </p>
        
        <Button 
          onClick={handleReady}
          className="bg-[#7d6272] border-none hover:bg-[#6d5262] text-white px-4 py-2 w-full max-w-md mb-4 rounded-full text-sm"
        >
          Yes — I'm ready to move forward
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-300 text-[#7d6272] hover:text-[#6d5262] bg-white hover:bg-gray-100 py-1 w-full max-w-md mb-6 rounded-full"
          onClick={() => window.location.href = '/during-conflict'}
        >
          <span className="text-sm px-2">Not yet — I need to decompress first</span>
        </Button>
        
        <div className="text-gray-500 text-center max-w-md mx-auto">
          <p className="mb-2">
            Taking space is sometimes the most emotionally intelligent choice.
          </p>
          <p>
            Come back when you're ready.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LetsTalkThisOut;
