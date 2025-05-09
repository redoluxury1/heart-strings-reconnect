
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import SayItBetter from '@/components/mid-fight/whats-going-on/SayItBetter';
import { Button } from '@/components/ui/button';
import { useSession } from './context/SessionContext';
import PausePhraseGraphic from '@/components/mid-fight/PausePhraseGraphic';

interface PhraseRewindProps {
  onClose?: () => void;
}

const PhraseRewind: React.FC<PhraseRewindProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentStep } = useSession();
  
  // Only show when we're on the right step in the flow
  // or when we're outside the guided flow (currentStep === -1)
  const shouldShow = currentStep === -1;
  
  if (!shouldShow) {
    return null;
  }

  return (
    <section className="py-6 md:py-8 bg-soft-blush/30">
      <div className="bg-white rounded-lg shadow-md p-5 md:p-6 border border-sage/20">
        <div className="flex flex-col items-center mb-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <MessageCircle className="h-16 md:h-20 w-16 md:w-20 text-rosewood-tint mb-3" />
          <PausePhraseGraphic className="mx-auto" />
          <p className="text-midnight-indigo text-center max-w-2xl mb-3 text-sm md:text-base">
            For next time: Discover gentler ways to express difficult feelings
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(!isOpen)}
            className="mt-2 border-sage text-sage hover:bg-sage hover:text-white"
          >
            {isOpen ? "Close" : "Say what you mean"}
          </Button>
        </div>
        
        {isOpen && (
          <div className="mt-6 border-t pt-6">
            <SayItBetter allowSave={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default PhraseRewind;
