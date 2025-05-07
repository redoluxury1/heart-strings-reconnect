
import React from 'react';
import { Button } from '@/components/ui/button';
import { CommonPattern } from '../types';
import { MessageSquare, Shield, X } from 'lucide-react';

interface PatternDetailScreenProps {
  pattern: CommonPattern | null;
  onContinue: () => void;
}

const PatternDetailScreen: React.FC<PatternDetailScreenProps> = ({ pattern, onContinue }) => {
  if (!pattern) return null;

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="mb-4 w-full">
        <h1 className="text-4xl md:text-5xl font-medium text-[#1A1A2E] mb-4">
          You blame. They defend. Someone shuts down.
        </h1>
        
        <h2 className="text-xl text-[#444] leading-relaxed">
          It's a predictable cycle that keeps you stuck.
        </h2>
      </div>
      
      <div className="w-full my-6">
        <img
          src="/lovable-uploads/3b284c19-cb83-4bd1-85b3-a1d36fd5aaab.png"
          alt="Couple in pattern of blame and defense"
          className="w-full h-auto mx-auto"
        />
      </div>
      
      <div className="w-full px-6 py-5">
        <p className="text-[#333333] text-base leading-relaxed">
          This is one of the most common emotional cycles. One person criticizes, the other gets defensive, 
          and eventually someone withdraws to avoid more pain. Over time, 
          both feel unheard and connection starts to fade.
        </p>
      </div>
      
      <div className="w-full px-6 mt-8 text-left">
        <h3 className="text-xl font-bold text-[#1A1A2E] mb-6">Spot the Signs</h3>
        
        <ul className="space-y-5">
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <MessageSquare size={20} className="text-[#D2691E]" />
            </div>
            <div>
              <span className="font-bold text-[#1A1A2E]">Criticism: </span>
              <span className="text-[#333333]">"You never help around here."</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <Shield size={20} className="text-[#1A1A2E]" />
            </div>
            <div>
              <span className="font-bold text-[#1A1A2E]">Defense: </span>
              <span className="text-[#333333]">"That's not fair. I did the dishes yesterday!"</span>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-1">
              <X size={20} className="text-[#D2691E]" />
            </div>
            <div>
              <span className="font-bold text-[#1A1A2E]">Withdrawal: </span>
              <span className="text-[#333333]">Walking away, shutting down, or changing the subject</span>
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

export default PatternDetailScreen;
