
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PatternIntroStep from './components/PatternIntroStep';
import ChipSelector from './components/ChipSelector';
import PatternResultStep from './components/PatternResultStep';
import { usePatternRecognition } from './hooks/usePatternRecognition';
import { triggerChips, reactionChips, partnerReactionChips, patterns } from './data/PatternData';

type Step = 'intro' | 'triggers' | 'reactions' | 'partner-reactions' | 'result';

interface PatternRecognitionFlowProps {
  onClose?: () => void;
}

const PatternRecognitionFlow: React.FC<PatternRecognitionFlowProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const {
    session,
    addTriggerChip,
    addReactionChip,
    addPartnerReactionChip,
    detectPattern
  } = usePatternRecognition();

  const handleNext = () => {
    switch (currentStep) {
      case 'intro':
        setCurrentStep('triggers');
        break;
      case 'triggers':
        setCurrentStep('reactions');
        break;
      case 'reactions':
        setCurrentStep('partner-reactions');
        break;
      case 'partner-reactions':
        const detectedPattern = detectPattern();
        setCurrentStep('result');
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'triggers':
        setCurrentStep('intro');
        break;
      case 'reactions':
        setCurrentStep('triggers');
        break;
      case 'partner-reactions':
        setCurrentStep('reactions');
        break;
      case 'result':
        setCurrentStep('partner-reactions');
        break;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'triggers':
        return session.triggerChips.length > 0;
      case 'reactions':
        return session.reactionChips.length > 0;
      case 'partner-reactions':
        return session.partnerReactionChips.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
      {currentStep !== 'intro' && currentStep !== 'result' && (
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="flex items-center text-[#2e2a63]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {onClose && (
            <button 
              onClick={onClose}
              className="text-[#2e2a63]/60 hover:text-[#2e2a63]"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {currentStep === 'intro' && (
        <PatternIntroStep onNext={handleNext} />
      )}

      {currentStep === 'triggers' && (
        <>
          <ChipSelector
            chips={triggerChips}
            selectedChips={session.triggerChips}
            onChipSelect={addTriggerChip}
            prompt="What usually triggers the spiral?"
          />
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#2e2a63] hover:bg-[#2e2a63]/90 text-white px-6 py-3 rounded-lg"
            >
              Next
            </Button>
          </div>
        </>
      )}

      {currentStep === 'reactions' && (
        <>
          <ChipSelector
            chips={reactionChips}
            selectedChips={session.reactionChips}
            onChipSelect={addReactionChip}
            prompt="When it starts, what's your go-to move?"
          />
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#2e2a63] hover:bg-[#2e2a63]/90 text-white px-6 py-3 rounded-lg"
            >
              Next
            </Button>
          </div>
        </>
      )}

      {currentStep === 'partner-reactions' && (
        <>
          <ChipSelector
            chips={partnerReactionChips}
            selectedChips={session.partnerReactionChips}
            onChipSelect={addPartnerReactionChip}
            prompt="What does your partner usually do?"
          />
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#2e2a63] hover:bg-[#2e2a63]/90 text-white px-6 py-3 rounded-lg"
            >
              Show My Pattern
            </Button>
          </div>
        </>
      )}

      {currentStep === 'result' && session.detectedPattern && (
        <PatternResultStep pattern={patterns[session.detectedPattern]} />
      )}
    </div>
  );
};

export default PatternRecognitionFlow;
