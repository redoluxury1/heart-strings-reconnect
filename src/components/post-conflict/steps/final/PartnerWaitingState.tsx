
import React from 'react';
import { HeartHandshake, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useSession } from '@/components/post-conflict/context/SessionContext';

const PartnerWaitingState: React.FC = () => {
  const navigate = useNavigate();
  const { sessionData } = useSession();
  
  // Helper function to get partner display name (using a default if no name is available)
  const getPartnerName = () => {
    return "your partner";
  };
  
  const handleWriteLoveNote = () => {
    navigate('/love-notes');
  };
  
  const handlePlayGame = () => {
    navigate('/games');
  };
  
  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon with refined styling */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <Clock className="h-8 w-8 text-[#D3876A]" strokeWidth={1.5} />
        </div>

        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-3 text-center">
          You've done your part.
        </h2>

        {/* Subheading */}
        <p className="text-center text-[#3A3A3A] mb-8">
          Now we'll wait for {getPartnerName()} to complete theirs.<br />
          Once they finish, we'll gently show what came up—and how to reconnect.
        </p>

        {/* CTA Section */}
        <div className="w-full mb-4">
          <h3 className="text-center text-[#3A3A3A] font-medium mb-4">
            In the meantime...
          </h3>
          
          {/* Primary CTA */}
          <div className="mb-5">
            <Button
              onClick={handleWriteLoveNote}
              className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full px-6 py-5 w-full"
            >
              Write a Love Note
            </Button>
            <p className="text-center text-sm text-[#3A3A3A] mt-2">
              Say something kind while you wait.
            </p>
          </div>
          
          {/* Secondary CTA */}
          <div>
            <Button
              variant="outline"
              onClick={handlePlayGame}
              className="border-[#5D3A5A] text-[#5D3A5A] hover:bg-[#5D3A5A]/10 bg-transparent rounded-full px-6 py-5 w-full"
            >
              Play Would You Rather
            </Button>
            <p className="text-center text-sm text-[#3A3A3A] mt-2">
              Lighten the mood with a quick game.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerWaitingState;
