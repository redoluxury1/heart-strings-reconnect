
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, PersonStanding, HeartCrack } from 'lucide-react';

interface PursueDistanceDetailScreenProps {
  onContinue: () => void;
}

const PursueDistanceDetailScreen: React.FC<PursueDistanceDetailScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="mb-4 w-full">
        <h1 className="text-4xl md:text-5xl font-cormorant font-medium text-[#1A1A2E] mb-4">
          One of you gets louder. The other pulls away.
        </h1>
        
        <h2 className="text-xl text-[#444] font-cormorant">
          Both of you are trying to protect connection—you just do it differently.
        </h2>
      </div>
      
      <div className="w-full my-6">
        <img
          src="/lovable-uploads/860f841f-3974-44d6-9b4b-bad84d8ec2f0.png"
          alt="One partner trying to connect while the other distances"
          className="w-full h-auto mx-auto"
        />
      </div>
      
      <div className="w-full px-6 py-5">
        <p className="text-[#333333] text-base leading-relaxed">
          This is one of the most common emotional cycles. One person moves toward the other—asking, even criticizing—trying to reconnect. 
          The other feels pressured or overwhelmed, so they shut down or create space. Over time, both feel misunderstood, rejected, or exhausted.
        </p>
      </div>
      
      <div className="w-full px-6 mt-8 text-left">
        <h3 className="text-xl font-bold text-[#1A1A2E] mb-6">Spot the Signs</h3>
        
        <ul className="space-y-5">
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <MessageCircle size={20} className="text-[#8B4513]" />
            </div>
            <div>
              <span className="font-bold text-[#1A1A2E]">Pursuer: </span>
              <span className="text-[#333333]">says "Why won't you just talk to me?"</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <PersonStanding size={20} className="text-[#1A1A2E]" />
            </div>
            <div>
              <span className="font-bold text-[#1A1A2E]">Distancer: </span>
              <span className="text-[#333333]">avoids eye contact, retreats into silence or phone</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <HeartCrack size={20} className="text-[#8B4513]" />
            </div>
            <div>
              <span className="font-bold text-[#1A1A2E]">Both: </span>
              <span className="text-[#333333]">end up feeling abandoned or smothered</span>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="w-full px-6 mt-10">
        <Button
          onClick={onContinue}
          className="bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white font-medium py-3 px-8 rounded-xl text-xl w-full"
        >
          What to Try Instead
        </Button>
      </div>
    </div>
  );
};

export default PursueDistanceDetailScreen;
