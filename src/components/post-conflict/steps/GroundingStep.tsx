
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircleHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useToast } from '@/hooks/use-toast';

interface GroundingStepProps {
  onResponse: (response: boolean) => void;
  onExit: () => void;
  onNext: () => void;
}

const GroundingStep: React.FC<GroundingStepProps> = ({ onResponse, onExit }) => {
  const navigate = useNavigate();
  const { setCurrentStep, sessionData } = useSession();
  const { toast } = useToast();

  // Check if partner is ready when this component mounts or partner status changes
  useEffect(() => {
    if (sessionData.partner2.ready) {
      toast({
        title: "Your partner is ready",
        description: "Your partner is ready to talk through what happened.",
      });
    }
  }, [sessionData.partner2.ready, toast]);

  const handleNotYet = () => {
    onResponse(false);
    // Navigate to the timer section on the mid-fight page
    navigate('/during-conflict');
  };

  const handleYes = () => {
    onResponse(true);
    // Notify that you're ready (in a real app, this would send to the partner)
    toast({
      title: "You're ready",
      description: "Your partner has been notified that you're ready to talk.",
    });
    // Directly go to the next step
    setCurrentStep(1);
  };

  return (
    <div className="text-center">
      <MessageCircleHeart className="h-12 w-12 mx-auto text-mauve-rose mb-4" />
      
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
        Are you both ready to talk?
      </h2>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 max-w-sm mx-auto">
        <Button 
          className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white py-6"
          onClick={handleYes}
        >
          Yes - I want to move forward
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-300 text-midnight-indigo hover:bg-gray-100 py-6"
          onClick={handleNotYet}
        >
          Not yet, I need to decompress
        </Button>
      </div>
      
      <p className="mt-6 text-gray-500 text-sm max-w-md mx-auto">
        It's okay if you're not ready. Sometimes taking space is the best thing you can do before talking.
      </p>
    </div>
  );
};

export default GroundingStep;
