
import React, { useEffect } from 'react';
import { SessionProvider, useSession } from './context/SessionContext';
import ProgressIndicator from './navigation/ProgressIndicator';
import StepsNavigation from './navigation/StepsNavigation';
import { useSteps } from './config/stepsConfig';

interface WorkThroughSessionProps {
  onExit: () => void;
}

const WorkThroughSessionContent: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { currentStepContent, totalSteps } = useSteps(onExit);
  const { currentStep } = useSession();
  
  // Scroll to top whenever the current step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);
  
  return (
    <div className="bg-[#f5f0e8] rounded-xl shadow-md overflow-hidden">
      <ProgressIndicator totalSteps={totalSteps} />
      
      <div className="p-6 md:p-8">
        {currentStepContent}
        
        <StepsNavigation totalSteps={totalSteps} />
      </div>
    </div>
  );
};

const LetsTalkSession: React.FC<WorkThroughSessionProps> = ({ onExit }) => {
  return <WorkThroughSessionContent onExit={onExit} />;
};

export default LetsTalkSession;
