
import React from 'react';
import { Button } from '@/components/ui/button';
import { HeartHandshake, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NextStepsButtons: React.FC = () => {
  const navigate = useNavigate();
  
  const handleTalkTogether = () => {
    navigate('/reconnect');
  };
  
  const handleWriteLoveNote = () => {
    navigate('/love-notes');
  };
  
  const handlePlayGame = () => {
    navigate('/games');
  };
  
  const handleRetry = () => {
    // Navigate back to the beginning of the flow
    navigate('/post-conflict');
  };

  return (
    <div className="w-full">
      <h3 className="font-medium text-[#2C2C2C] text-center mb-4">Next Steps</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={handleTalkTogether}
          className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full flex items-center"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Talk This Through Together
        </Button>
        
        <Button
          onClick={handleWriteLoveNote}
          className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white rounded-full flex items-center"
        >
          <Heart className="mr-2 h-4 w-4" />
          Write a Love Note
        </Button>
        
        <Button
          variant="outline"
          onClick={handlePlayGame}
          className="border-[#5D3A5A] text-[#5D3A5A] hover:bg-[#5D3A5A]/10 bg-transparent rounded-full"
        >
          Play Would You Rather
        </Button>
        
        <Button
          variant="outline"
          onClick={handleRetry}
          className="border-[#D3876A] text-[#D3876A] hover:bg-[#D3876A]/10 bg-transparent rounded-full flex items-center"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Let's Try That Again
        </Button>
      </div>
    </div>
  );
};

export default NextStepsButtons;
