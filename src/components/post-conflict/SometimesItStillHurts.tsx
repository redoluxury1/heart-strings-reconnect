
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ColorHealingMethod from './color-healing/ColorHealingMethod';
import { Card } from '@/components/ui/card';

const SometimesItStillHurts = () => {
  const [showColorHealing, setShowColorHealing] = useState(false);
  
  if (showColorHealing) {
    return <ColorHealingMethod />;
  }

  return (
    <Card className="border-none overflow-hidden rounded-xl shadow-md">
      <div 
        className="p-8 lg:p-12 flex flex-col items-center bg-[#F8EFE0]" 
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* Title using the serif font and warm brown color */}
          <h2 className="font-cormorant text-5xl md:text-6xl lg:text-7xl mb-4 text-[#7D5248] leading-tight">
            Sometimes,<br />it still hurts.
          </h2>
          
          {/* Subtitle text */}
          <p className="text-[#7D5248] text-xl md:text-2xl mb-8 max-w-lg mx-auto">
            Find calm when forgiveness doesn't erase the pain.
          </p>
          
          {/* Illustration of the couple */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/b5b996e6-1bbc-4e6d-8ef4-ceda4579c784.png" 
              alt="Couple comforting each other"
              className="w-full max-w-md h-auto" 
            />
          </div>
          
          {/* Button to start the color healing flow */}
          <Button 
            onClick={() => setShowColorHealing(true)}
            className="bg-[#7D5248] hover:bg-[#6a443b] text-white rounded-full px-8 py-6 text-lg"
          >
            Try Color Healing Method
          </Button>
          
          {/* Descriptive text about the color healing method */}
          <p className="text-[#7D5248] opacity-80 mt-4 text-sm max-w-sm mx-auto">
            A calming breathwork and visualization tool to release lingering emotional tension.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SometimesItStillHurts;
