
import React from 'react';
import IntroScreen from './IntroScreen';
import SetToneTool from '../SetToneTool';
import WhereIsYourHeadAt from '@/components/post-conflict/steps/emotional-check-in/WhereIsYourHeadAt';
import YourPerspective from '@/components/post-conflict/steps/perspective/YourPerspective';
import WishPartnerUnderstood from '@/components/post-conflict/steps/partner-understanding/WishPartnerUnderstood';
import WhatDoYouNeed from '@/components/post-conflict/steps/needs/WhatDoYouNeed';
import PartnerWaitingState from '@/components/post-conflict/steps/final/PartnerWaitingState';
import ReflectionSummary from '@/components/post-conflict/steps/summary/ReflectionSummary';

interface StepContentProps {
  currentStep: number;
  isAnimating: boolean;
  bothPartnersReady: boolean;
  onReady: () => void;
  onNeedTime: () => void;
  onToneSelected: (intent: string) => void;
  onBackToIntro: () => void;
  onEmotionalCheckComplete: () => void;
  onPerspectiveComplete: (perspective: string) => void;
  onUnderstandingComplete: (understanding: string) => void;
  onNeedsComplete: (needs: string) => void;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  isAnimating,
  bothPartnersReady,
  onReady,
  onNeedTime,
  onToneSelected,
  onBackToIntro,
  onEmotionalCheckComplete,
  onPerspectiveComplete,
  onUnderstandingComplete,
  onNeedsComplete
}) => {
  // If both partners are ready, show the summary screen
  if (bothPartnersReady) {
    return <ReflectionSummary />;
  }
  
  switch (currentStep) {
    case 0: // Intro - ready check
      return (
        <IntroScreen 
          isAnimating={isAnimating}
          onReady={onReady}
          onNeedTime={onNeedTime}
        />
      );
      
    case 1: // Set tone
      return <SetToneTool onComplete={onToneSelected} onBack={onBackToIntro} />;
      
    case 2: // Emotional check-in
      return <WhereIsYourHeadAt onComplete={onEmotionalCheckComplete} />;
      
    case 3: // Your perspective
      return <YourPerspective onComplete={onPerspectiveComplete} />;
    
    case 4: // What do you wish your partner understood
      return <WishPartnerUnderstood onComplete={onUnderstandingComplete} />;
    
    case 5: // What do you need to move forward
      return <WhatDoYouNeed onComplete={onNeedsComplete} />;
      
    case 6: // Partner waiting state
      return <PartnerWaitingState />;
      
    default:
      return <div>Loading...</div>;
  }
};

export default StepContent;
