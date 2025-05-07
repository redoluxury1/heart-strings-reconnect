
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from '../context/SessionContext';

interface StepsNavigationProps {
  totalSteps: number;
}

const StepsNavigation: React.FC<StepsNavigationProps> = ({ totalSteps }) => {
  const { currentStep, setCurrentStep } = useSession();
  
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of the page when navigating to ensure user sees the beginning of content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of the page when navigating to ensure user sees the beginning of content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Don't show navigation on the first step (ready check) or final step
  if (currentStep === 0 || currentStep === totalSteps - 1) {
    return null;
  }
  
  return (
    <div className="flex justify-between mt-8 pt-4">
      <Button 
        onClick={goBack} 
        variant="outline" 
        className="border-gray-300 text-midnight-indigo bg-gray-50 hover:bg-gray-100"
      >
        Go Back
      </Button>
      
      <Button 
        onClick={goNext} 
        className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
      >
        Keep Going
      </Button>
    </div>
  );
};

export default StepsNavigation;
