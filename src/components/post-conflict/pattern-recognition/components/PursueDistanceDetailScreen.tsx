
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, PersonStanding, HeartCrack } from 'lucide-react';
import { ConversationIcon } from './PatternRecognitionIcons';

interface PursueDistanceDetailScreenProps {
  onBack: () => void;
  onViewCycle: () => void;
  onViewRepair: () => void;
}

const PursueDistanceDetailScreen: React.FC<PursueDistanceDetailScreenProps> = ({ onBack, onViewCycle, onViewRepair }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="mb-4 w-full">
        <h1 className="text-4xl md:text-5xl font-medium text-[#14213d] mb-4">
          One of you gets louder. The other pulls away.
        </h1>
        
        <h2 className="text-xl text-[#14213d] leading-relaxed">
          Both of you are trying to protect connection—you just do it differently.
        </h2>
      </div>
      
      <div className="w-full my-6 flex justify-center">
        <ConversationIcon className="w-64 h-64 text-[#14213d]" />
      </div>
      
      <div className="w-full px-6 py-5">
        <p className="text-[#333333] text-base leading-relaxed">
          This is one of the most common emotional cycles. One person moves toward the other—asking, even criticizing—trying to reconnect. 
          The other feels pressured or overwhelmed, so they shut down or create space. Over time, both feel misunderstood, rejected, or exhausted.
        </p>
      </div>
      
      <div className="w-full px-6 mt-8 text-left">
        <h3 className="text-xl font-bold text-[#14213d] mb-6">Spot the Signs</h3>
        
        <ul className="space-y-5">
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <MessageCircle size={20} className="text-[#14213d]" />
            </div>
            <div>
              <span className="font-bold text-[#14213d]">Pursuer: </span>
              <span className="text-[#333333]">says "Why won't you just talk to me?"</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <PersonStanding size={20} className="text-[#14213d]" />
            </div>
            <div>
              <span className="font-bold text-[#14213d]">Distancer: </span>
              <span className="text-[#333333]">avoids eye contact, retreats into silence or phone</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <HeartCrack size={20} className="text-[#14213d]" />
            </div>
            <div>
              <span className="font-bold text-[#14213d]">Both: </span>
              <span className="text-[#333333]">end up feeling abandoned or smothered</span>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="w-full px-6 mt-10 flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-[#14213d] hover:text-[#14213d]/90 font-medium"
        >
          Back
        </Button>
        <Button
          onClick={onViewRepair}
          className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-2 px-5 rounded-full text-sm"
        >
          What to Try Instead
        </Button>
      </div>
    </div>
  );
};

export default PursueDistanceDetailScreen;
