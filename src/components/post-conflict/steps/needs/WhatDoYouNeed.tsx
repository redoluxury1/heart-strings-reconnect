
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { useNeedsInput } from './hooks/useNeedsInput';
import SentenceStarterChips from './components/SentenceStarterChips';
import { needsStarters } from './data/needsStartersData';

interface WhatDoYouNeedProps {
  onBack?: () => void;
  onComplete?: (needs: string) => void;
}

const WhatDoYouNeed: React.FC<WhatDoYouNeedProps> = ({ 
  onBack, 
  onComplete 
}) => {
  const { setCurrentStep } = useSession();

  // Use the custom hook for handling input
  const {
    needs,
    setNeeds,
    textareaRef,
    handleStarterClick,
    validateNeeds
  } = useNeedsInput();

  // Handle form submission
  const handleNext = () => {
    if (validateNeeds()) {
      if (onComplete) {
        onComplete(needs);
      }
      
      // Move to the next step (step 6)
      setCurrentStep(6);
    }
  };

  // Go back to the previous screen
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    setCurrentStep(4);
  };

  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon with refined styling */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <ArrowUp className="h-8 w-8 text-[#D3876A] animate-pulse-slow" strokeWidth={1.5} />
        </div>

        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-3 text-center">
          What do you need in order to move forward?
        </h2>

        {/* Subheading */}
        <p className="text-center text-[#3A3A3A] mb-8">
          Say what would help you feel safe, seen, or supported.
        </p>

        {/* Sentence starter chips */}
        <SentenceStarterChips 
          starters={needsStarters} 
          onStarterClick={handleStarterClick} 
        />

        {/* Text input area */}
        <div className="w-full mb-6">
          <Textarea
            ref={textareaRef}
            value={needs}
            onChange={(e) => setNeeds(e.target.value)}
            placeholder="Write it in your own words..."
            className="min-h-[150px] p-4 bg-[#FAF6F4] border-[#D9B9AF] rounded-xl text-[#3A3A3A] focus:ring-[#D3876A] focus:border-[#D3876A]"
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex w-full justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-[#D9B9AF] text-[#3A3A3A] hover:bg-[#F8F5F3]"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full px-6 py-3 mx-auto"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatDoYouNeed;
