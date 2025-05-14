
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

const GroundingStep: React.FC<GroundingStepProps> = ({ onResponse, onExit, onNext }) => {
  const navigate = useNavigate();
  const { setCurrentStep } = useSession();
  const { toast } = useToast();

  // Handle the "Yes" button click
  const handleYes = () => {
    onResponse(true);
    toast({
      title: "You're ready",
      description: "Let's get started with the conversation.",
    });
    // Go directly to tone setting step
    setCurrentStep(1);
    // Also notify the parent component via onNext
    onNext();
  };

  // Handle the "Not yet" button click
  const handleNotYet = () => {
    onResponse(false);
    navigate('/during-conflict');
  };

  // We don't want to auto-advance anymore, as it was causing the blank slide
  // Instead, we'll render proper UI that users can interact with
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <img 
        src="/lovable-uploads/088d792b-f2dc-44de-9679-9ff534e02d4e.png" 
        alt="Couple sitting together" 
        className="h-24 w-auto mb-6" 
        loading="eager"
        fetchPriority="high"
      />
      
      <h2 className="text-4xl md:text-5xl font-cormorant font-medium mb-4 text-center text-midnight-indigo">
        Let's work this out
      </h2>
      
      <p className="text-center text-gray-700 mb-3 text-lg">
        Ready to work through what happened?
      </p>
      <p className="text-center text-gray-700 mb-8 text-lg">
        It's okay if you need a little more time.
      </p>
      
      <Button 
        onClick={handleYes}
        className="bg-[#7d6272] border-none hover:bg-[#6d5262] text-white px-4 py-2 w-full max-w-md mb-4 rounded-full text-sm"
      >
        Yes — I'm ready to move forward
      </Button>
      
      <Button 
        variant="outline" 
        className="border-gray-300 text-[#7d6272] hover:text-[#6d5262] bg-white hover:bg-gray-100 py-1 w-full max-w-md mb-6 rounded-full"
        onClick={handleNotYet}
      >
        <span className="text-sm px-2">Not yet — I need to decompress first</span>
      </Button>
    </div>
  );
};

export default GroundingStep;
