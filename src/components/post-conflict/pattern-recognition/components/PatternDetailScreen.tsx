
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Frown } from 'lucide-react';

interface PatternDetailScreenProps {
  onContinue: () => void;
}

const PatternDetailScreen: React.FC<PatternDetailScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="mb-4 w-full">
        <h1 className="text-4xl md:text-5xl font-cormorant font-medium text-[#14213d] mb-4">
          You blame. They defend. Someone shuts down.
        </h1>
        
        <h2 className="text-xl text-gray-600 font-cormorant">
          Or vice versa.
        </h2>
      </div>
      
      <div className="w-full my-6">
        <img
          src="/lovable-uploads/f12fb5d9-a81f-4532-b321-307ece3be41e.png"
          alt="Couple in conflict, one partner pointing, the other crossing arms"
          className="w-[65%] mx-auto h-auto"
        />
      </div>
      
      <div className="w-full px-6 py-5">
        <p className="text-[#333333] text-base leading-relaxed">
          This pattern is about protection. One partner feels hurt or overwhelmed, so they lash out. 
          The other partner feels attacked, so they shut down. Both feel alone. Over time, it becomes 
          a loop that leaves no room for resolution.
        </p>
      </div>
      
      <div className="w-full px-6 mt-8 text-left">
        <h3 className="text-xl font-bold text-[#14213d] mb-6">Spot the Signs</h3>
        
        <ul className="space-y-5">
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <ArrowRight size={20} className="text-[#14213d]" />
            </div>
            <div>
              <span className="font-bold text-[#14213d]">Blame starts early</span>
              <span className="text-[#333333]"> – "You always…"</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <Zap size={20} className="text-[#14213d]" />
            </div>
            <div>
              <span className="font-bold text-[#14213d]">Defensiveness rises</span>
              <span className="text-[#333333]"> – "That's not fair!"</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <Frown size={20} className="text-[#14213d]" />
            </div>
            <div>
              <span className="font-bold text-[#14213d]">Disconnection follows</span>
              <span className="text-[#333333]"> – silence, shut down, or walking away</span>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="w-full px-6 mt-10">
        <Button
          onClick={onContinue}
          className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-3 px-8 rounded-xl text-xl w-full"
        >
          What to Try Instead
        </Button>
      </div>
    </div>
  );
};

export default PatternDetailScreen;
