
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smile, Zap, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CommonPattern } from '../types';

interface PatternRepairScreenProps {
  pattern?: CommonPattern | null;
  onContinue: () => void;
}

const PatternRepairScreen: React.FC<PatternRepairScreenProps> = ({ pattern, onContinue }) => {
  const navigate = useNavigate();
  
  const handleTryInRealLife = () => {
    navigate('/during-conflict');
  };

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="mb-4 w-full">
        <h1 className="text-4xl md:text-5xl font-cormorant font-medium text-[#14213d] mb-4">
          You're not enemies—you're overwhelmed.
        </h1>
        
        <h2 className="text-xl text-[#444] font-cormorant">
          Try these steps to interrupt the cycle and reconnect.
        </h2>
      </div>
      
      <div className="w-full my-6">
        <img
          src="/lovable-uploads/3b284c19-cb83-4bd1-85b3-a1d36fd5aaab.png"
          alt="Couple calmly connecting and seated together after conflict"
          className="w-[65%] mx-auto h-auto"
        />
      </div>
      
      <div className="w-full space-y-4 mt-4">
        <Card className="p-4 flex items-start">
          <div className="mr-4 mt-1">
            <Smile size={28} className="text-[#8B4513]" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-[#14213d]">Soften the Start</h3>
            <p className="text-[#333333]">
              Use gentle language, not blame. Try "<span className="italic">I'm feeling...</span>" instead of "<span className="italic">You always...</span>"
            </p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-start">
          <div className="mr-4 mt-1">
            <Zap size={28} className="text-[#FF8C00]" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-[#14213d]">Breathe Before You Defend</h3>
            <p className="text-[#333333]">
              Pause and reflect instead of reacting. Defensiveness blocks connection.
            </p>
          </div>
        </Card>
        
        <Card className="p-4 flex items-start">
          <div className="mr-4 mt-1">
            <MessageSquare size={28} className="text-[#FF8C00]" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-[#14213d]">Repair Before You Retreat</h3>
            <p className="text-[#333333]">
              Instead of shutting down, say: "<span className="italic">Can we reset?</span>" or "<span className="italic">I need a sec, but I want to come back.</span>"
            </p>
          </div>
        </Card>
      </div>
      
      <div className="w-full mt-10">
        <Button
          onClick={handleTryInRealLife}
          className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-3 px-8 rounded-full text-lg mx-auto"
        >
          Try in Real Life
        </Button>
      </div>
    </div>
  );
};

export default PatternRepairScreen;
