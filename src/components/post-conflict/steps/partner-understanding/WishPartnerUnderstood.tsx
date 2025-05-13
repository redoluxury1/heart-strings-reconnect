
import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import SentenceStarterChips from './components/SentenceStarterChips';
import { sentenceStarters } from './data/understandingStartersData';
import { useUnderstandingInput } from './hooks/useUnderstandingInput';

interface WishPartnerUnderstoodProps {
  onBack?: () => void;
  onComplete?: (understanding: string) => void;
}

const WishPartnerUnderstood: React.FC<WishPartnerUnderstoodProps> = ({ 
  onBack, 
  onComplete 
}) => {
  const { setCurrentStep } = useSession();

  // Use the custom hook for handling input
  const {
    understanding,
    setUnderstanding,
    textareaRef,
    handleStarterClick,
    validateUnderstanding
  } = useUnderstandingInput();

  // Handle form submission
  const handleNext = () => {
    if (validateUnderstanding()) {
      if (onComplete) {
        onComplete(understanding);
      }
      
      // Move to the next step (step 5)
      setCurrentStep(5);
    }
  };

  // Go back to the previous screen
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    setCurrentStep(3);
  };

  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Updated icon with refined styling - removed sparkle */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <HeartHandshake className="h-8 w-8 text-[#D3876A] animate-pulse-slow" strokeWidth={1.5} />
        </div>

        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-3 text-center">
          What do you wish your partner understood?
        </h2>

        {/* Subheading */}
        <p className="text-center text-[#3A3A3A] mb-8">
          Say what's been hard to say. You deserve to be understood.
        </p>

        {/* Sentence starter chips */}
        <SentenceStarterChips 
          starters={sentenceStarters} 
          onStarterClick={handleStarterClick} 
        />

        {/* Text input area */}
        <div className="w-full mb-6">
          <Textarea
            ref={textareaRef}
            value={understanding}
            onChange={(e) => setUnderstanding(e.target.value)}
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

export default WishPartnerUnderstood;
