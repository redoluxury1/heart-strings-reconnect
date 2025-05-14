
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { needsStarters } from './data/needsStartersData';
import SentenceStarterChips from './components/SentenceStarterChips';
import { useNeedsInput } from './hooks/useNeedsInput';
import SpeechToTextInput from '@/components/common/SpeechToTextInput';

interface WhatDoYouNeedProps {
  onBack?: () => void;
  onComplete?: (needs: string) => void;
}

const WhatDoYouNeed: React.FC<WhatDoYouNeedProps> = ({ 
  onBack, 
  onComplete 
}) => {
  const { setCurrentStep } = useSession();
  const [selectedStarterId, setSelectedStarterId] = React.useState<number | undefined>();
  
  // Use the needs input hook
  const {
    needs,
    setNeeds,
    textareaRef,
    handleStarterClick,
    validateNeeds
  } = useNeedsInput();

  // Handle starter click from chips
  const handleStarterSelection = (text: string) => {
    const starter = needsStarters.find(s => s.text === text);
    if (starter) {
      setSelectedStarterId(starter.id);
    }
    handleStarterClick(text);
  };
  
  // Handle form submission
  const handleNext = () => {
    if (validateNeeds()) {
      if (onComplete) {
        onComplete(needs);
      }
      
      // Move to the next step
      setCurrentStep(6);
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    setCurrentStep(4);
  };

  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <MessageCircle className="h-8 w-8 text-[#D3876A]" />
        </div>
        
        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-3 text-center">
          What do you need?
        </h2>
        
        {/* Subheading */}
        <p className="text-center text-[#3A3A3A] mb-8">
          Share what would help you feel better after this conflict.
        </p>
        
        {/* Sentence starter chips */}
        <SentenceStarterChips 
          starters={needsStarters} 
          onStarterClick={handleStarterSelection}
          selectedStarterId={selectedStarterId}
        />
        
        {/* Text input area with speech-to-text */}
        <div className="w-full mb-6">
          <SpeechToTextInput
            value={needs}
            onChange={setNeeds}
            placeholder="Write what you need from your partner..."
            className="min-h-[150px] p-4 bg-[#FAF6F4] border-[#D9B9AF] rounded-xl text-[#3A3A3A] focus:ring-[#D3876A] focus:border-[#D3876A]"
            minHeight="150px"
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
            className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full px-6 py-3"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatDoYouNeed;
