
import React from 'react';
import { useWorkThisOut } from './hooks/useWorkThisOut';
import StepContent from './components/StepContent';

interface LetsWorkThisOutProps {
  onClose?: () => void;
  onReady?: () => void;
  onNeedTime?: () => void;
}

const LetsWorkThisOut: React.FC<LetsWorkThisOutProps> = ({ 
  onClose, 
  onReady, 
  onNeedTime 
}) => {
  const {
    isAnimating,
    setIsAnimating,
    currentStep,
    bothPartnersReady,
    handleReadyClick,
    handleNeedTimeClick,
    handleToneSelected,
    handleBackToIntro,
    handleEmotionalCheckComplete,
    handlePerspectiveComplete,
    handleUnderstandingComplete,
    handleNeedsComplete
  } = useWorkThisOut(onClose, onReady, onNeedTime);
  
  return (
    <StepContent
      currentStep={currentStep}
      isAnimating={isAnimating}
      bothPartnersReady={bothPartnersReady}
      onReady={handleReadyClick}
      onNeedTime={handleNeedTimeClick}
      onToneSelected={handleToneSelected}
      onBackToIntro={handleBackToIntro}
      onEmotionalCheckComplete={handleEmotionalCheckComplete}
      onPerspectiveComplete={handlePerspectiveComplete}
      onUnderstandingComplete={handleUnderstandingComplete}
      onNeedsComplete={handleNeedsComplete}
    />
  );
};

export default LetsWorkThisOut;
