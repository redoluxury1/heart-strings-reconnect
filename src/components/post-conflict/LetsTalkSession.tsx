
import React from 'react';
import { SessionProvider } from './context/SessionContext';
import ProgressIndicator from './navigation/ProgressIndicator';
import StepsNavigation from './navigation/StepsNavigation';
import { useSteps } from './config/stepsConfig';

interface LetsTalkSessionProps {
  onExit: () => void;
}

const LetsTalkSessionContent: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { currentStepContent, totalSteps } = useSteps(onExit);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <ProgressIndicator totalSteps={totalSteps} />
      
      <div className="p-6 md:p-8">
        {currentStepContent}
        
        <StepsNavigation totalSteps={totalSteps} />
      </div>
    </div>
  );
};

const LetsTalkSession: React.FC<LetsTalkSessionProps> = ({ onExit }) => {
  // Use a single SessionProvider for the entire session
  return (
    <SessionProvider>
      <LetsTalkSessionContent onExit={onExit} />
    </SessionProvider>
  );
};

export default LetsTalkSession;
