
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircleHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GroundingStepProps {
  onResponse: (response: boolean) => void;
  onExit: () => void;
  onNext: () => void;
}

const GroundingStep: React.FC<GroundingStepProps> = ({ onResponse, onExit, onNext }) => {
  const navigate = useNavigate();

  const handleNotYet = () => {
    onResponse(false);
    // Navigate to the timer section on the mid-fight page
    navigate('/during-conflict');
  };

  const handleYes = () => {
    onResponse(true);
    // Directly go to the next step
    onNext();
  };

  return (
    <div className="text-center">
      <MessageCircleHeart className="h-12 w-12 mx-auto text-blue-500 mb-4" />
      
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
        Are you both ready to talk?
      </h2>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 max-w-sm mx-auto">
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white py-6"
          onClick={handleYes}
        >
          Yes
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-300 text-gray-700 py-6"
          onClick={handleNotYet}
        >
          Not yet
        </Button>
      </div>
      
      <p className="mt-6 text-gray-500 text-sm max-w-md mx-auto">
        It's okay if you're not ready. Sometimes taking space is the best thing you can do before talking.
      </p>
    </div>
  );
};

export default GroundingStep;
