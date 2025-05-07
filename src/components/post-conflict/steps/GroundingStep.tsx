
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useToast } from '@/hooks/use-toast';

interface GroundingStepProps {
  onResponse: (response: boolean) => void;
  onExit: () => void;
  onNext: () => void;
}

// This component is now just for internal session navigation
// and shouldn't be shown directly as it would duplicate the entry point
const GroundingStep: React.FC<GroundingStepProps> = ({ onResponse, onExit }) => {
  const navigate = useNavigate();
  const { setCurrentStep } = useSession();
  const { toast } = useToast();

  // We'll automatically advance to the next step since this is now internal
  React.useEffect(() => {
    // Automatically go to the next step (tone setting)
    setCurrentStep(1);
  }, [setCurrentStep]);

  // These handlers are kept for API consistency but shouldn't be called
  const handleNotYet = () => {
    onResponse(false);
    navigate('/during-conflict');
  };

  const handleYes = () => {
    onResponse(true);
    toast({
      title: "You're ready",
      description: "Your partner has been notified that you're ready to talk.",
    });
    setCurrentStep(1);
  };

  // Return empty div as this component should not render any UI
  return <div className="hidden"></div>;
};

export default GroundingStep;
