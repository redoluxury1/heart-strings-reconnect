
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
        description: "Your partner is ready to work through what happened.",
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
      <img 
        src="/lovable-uploads/088d792b-f2dc-44de-9679-9ff534e02d4e.png" 
        alt="Couple sitting together" 
        className="h-24 w-auto mx-auto mb-6" 
      />
      
      <h2 className="text-4xl md:text-5xl font-cormorant font-medium mb-4 text-center text-midnight-indigo">
        Are you ready to work through this?
      </h2>
      
      <p className="text-center text-gray-700 mb-3 text-lg">
        Let's check in before we dive in.
      </p>
      <p className="text-center text-gray-700 mb-8 text-lg">
        It's okay if you need a little more time.
      </p>
      
      <div className="flex flex-col max-w-md mx-auto">
        <Button 
          className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white py-6 mb-4 rounded-full text-lg"
          onClick={handleYes}
        >
          Yes — I'm ready to move forward
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-300 text-midnight-indigo bg-white hover:bg-gray-100 py-6 mb-6 rounded-full text-lg"
          onClick={handleNotYet}
        >
          <span className="px-2">Not yet — I need to decompress first</span>
        </Button>
        
        <div className="text-gray-500 text-center">
          <p className="mb-2">
            Taking space is sometimes the most emotionally intelligent choice.
          </p>
          <p>
            Come back when you're ready.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroundingStep;
