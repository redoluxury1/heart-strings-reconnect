
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

  const getStepInfo = () => {
    switch (currentStep) {
      case 'triggers':
        return { current: 1, total: 3 };
      case 'reactions':
        return { current: 2, total: 3 };
      case 'partner-reactions':
        return { current: 3, total: 3 };
      default:
        return null;
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto min-h-[600px]">
      {currentStep !== 'intro' && currentStep !== 'result' && (
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="flex items-center text-[#2e2a63] hover:bg-[#F5E6E8] px-4 py-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {stepInfo && (
            <div className="text-sm text-[#2e2a63]/60 font-medium">
              Step {stepInfo.current} of {stepInfo.total}
            </div>
          )}
          
          {onClose && (
            <button 
              onClick={onClose}
              className="text-[#2e2a63]/60 hover:text-[#2e2a63] text-xl p-2 hover:bg-[#F5E6E8] rounded-full transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {currentStep === 'intro' && (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <PatternIntroStep onNext={handleNext} />
        </div>
      )}

      {currentStep === 'triggers' && (
        <div className="space-y-8">
          <ChipSelector
            chips={triggerChips}
            selectedChips={session.triggerChips}
            onChipSelect={addTriggerChip}
            prompt="What usually triggers the spiral?"
          />
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white px-8 py-3 rounded-xl text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'reactions' && (
        <div className="space-y-8">
          <ChipSelector
            chips={reactionChips}
            selectedChips={session.reactionChips}
            onChipSelect={addReactionChip}
            prompt="When it starts, what's your go-to move?"
          />
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white px-8 py-3 rounded-xl text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'partner-reactions' && (
        <div className="space-y-8">
          <ChipSelector
            chips={partnerReactionChips}
            selectedChips={session.partnerReactionChips}
            onChipSelect={addPartnerReactionChip}
            prompt="What does your partner usually do?"
          />
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#2e2a63] hover:bg-[#2e2a63]/90 text-white px-8 py-3 rounded-xl text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Show My Pattern ✨
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'result' && session.detectedPattern && (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <PatternResultStep pattern={patterns[session.detectedPattern]} />
        </div>
      )}
    </div>
  );
};

export default PatternRecognitionFlow;
