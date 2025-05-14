
import React from 'react';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import PerspectiveForm from './components/PerspectiveForm';

interface YourPerspectiveProps {
  onBack?: () => void;
  onComplete?: (perspective: string) => void;
}

const YourPerspective: React.FC<YourPerspectiveProps> = ({ onBack, onComplete }) => {
  const { setCurrentStep } = useSession();

  // Handle submission of the perspective
  const handleSubmitPerspective = (perspective: string) => {
    if (onComplete) {
      onComplete(perspective);
    }
    
    // Move to the next step
    setCurrentStep(4);
  };

  // Go back to the previous screen
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    setCurrentStep(2);
  };

  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <PerspectiveForm 
        onBack={handleBack}
        onSubmit={handleSubmitPerspective}
      />
    </div>
  );
};

export default YourPerspective;
