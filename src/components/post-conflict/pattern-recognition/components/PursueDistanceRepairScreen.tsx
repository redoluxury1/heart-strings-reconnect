
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { User, Speaker, ConnectIcon } from './PursueDistanceIcons';

interface PursueDistanceRepairScreenProps {
  onContinue: () => void;
}

const PursueDistanceRepairScreen: React.FC<PursueDistanceRepairScreenProps> = ({ onContinue }) => {
  const navigate = useNavigate();
  
  const handleTryInRealLife = () => {
    navigate('/during-conflict');
  };

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="mb-4 w-full">
        <h1 className="text-3xl md:text-4xl font-medium text-[#1A1A2E] mb-4">
          Connection can't be forced—but it can be invited.
        </h1>
        
        <h2 className="text-lg text-[#444]">
          Try these steps to reset the cycle and meet in the middle.
        </h2>
      </div>
      
      <div className="w-full my-6">
        <img
          src="/lovable-uploads/90ca9d1d-4881-4b84-bc51-96d9cb10c80a.png"
          alt="Couple seated calmly, reconnecting after emotional distance"
          className="w-[80%] mx-auto h-auto"
        />
      </div>
      
      <div className="w-full space-y-4 mt-4">
        <Card className="p-4 flex items-start bg-[#FFF8F3] border-0 shadow">
          <div className="mr-4 mt-1">
            <User className="text-[#D2691E] h-6 w-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-[#1A1A2E]">Take the Pressure Off</h3>
            <p className="text-[#333333]">
              If you're the pursuer, slow down. Start with warmth, not urgency. Try "I miss you" instead of "Why are you ignoring me?"
            </p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-start bg-[#FFF8F3] border-0 shadow">
          <div className="mr-4 mt-1">
            <Speaker className="text-[#D2691E] h-6 w-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-[#1A1A2E]">Signal Safety</h3>
            <p className="text-[#333333]">
              If you're the distancer, let them know you're still here. Even "I'm just overwhelmed" builds connection.
            </p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-start bg-[#FFF8F3] border-0 shadow">
          <div className="mr-4 mt-1">
            <ConnectIcon className="text-[#D2691E] h-6 w-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-[#1A1A2E]">Reconnect Without Solving</h3>
            <p className="text-[#333333]">
              Pause problem-solving. Just share space, listen, or be near each other without fixing anything.
            </p>
          </div>
        </Card>
      </div>
      
      <div className="w-full mt-10">
        <Button
          onClick={handleTryInRealLife}
          className="bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white font-medium py-3 px-8 rounded-xl text-lg mx-auto"
        >
          Try These in Real Life
        </Button>
      </div>
    </div>
  );
};

export default PursueDistanceRepairScreen;
