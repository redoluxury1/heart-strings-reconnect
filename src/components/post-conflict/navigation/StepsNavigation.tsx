
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSession } from '../context/SessionContext';

interface StepsNavigationProps {
  totalSteps: number;
}

const StepsNavigation: React.FC<StepsNavigationProps> = ({ totalSteps }) => {
  const { currentStep, setCurrentStep, bothPartnersReady } = useSession();
  
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Don't show navigation on the first and last steps
  if (currentStep === 0 || currentStep === totalSteps - 1) {
    return null;
  }
  
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 0 && (
        <Button 
          variant="outline" 
          onClick={handlePrevStep}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Back
        </Button>
      )}
      
      <div className="ml-auto">
        {bothPartnersReady && (
          <Button 
            onClick={handleNextStep}
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepsNavigation;
