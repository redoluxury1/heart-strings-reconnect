
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ColorHealingMethod from './color-healing/ColorHealingMethod';

const SometimesItStillHurts = () => {
  const [showColorHealing, setShowColorHealing] = useState(false);
  
  if (showColorHealing) {
    return <ColorHealingMethod />;
  }

  return (
    <div className="bg-soft-cream/40 rounded-xl shadow-md p-6 md:p-8 mb-12 text-center">
      <div className="flex flex-col items-center max-w-xl mx-auto">
        <img 
          src="/lovable-uploads/6a166a5a-f921-4cff-8a03-83cbfe4fde10.png" 
          alt="Heart healing" 
          className="h-24 w-auto mb-6" 
        />
        
        <h2 className="text-4xl md:text-5xl font-cormorant font-medium mb-4 text-center text-midnight-indigo">
          Sometimes It Still Hurts
        </h2>
        
        <p className="text-center text-gray-700 mb-8 text-lg">
          A calming breathwork and visualization tool to release lingering emotional tension.
        </p>
        
        <Button 
          onClick={() => setShowColorHealing(true)}
          className="bg-[#7d6272] border-none hover:bg-[#6d5262] text-white px-4 py-2 w-full max-w-md mb-4 rounded-full text-sm"
        >
          Try Color Healing Method
        </Button>
      </div>
    </div>
  );
};

export default SometimesItStillHurts;
