
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquareHeart, Gamepad2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EndSessionStepProps {
  onSendLoveNote: () => void;
  onRestart?: () => void;
}

const EndSessionStep: React.FC<EndSessionStepProps> = ({ 
  onSendLoveNote,
  onRestart
}) => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/');
  };

  const handleSendLoveNote = () => {
    // Navigate to home page and scroll to daily love note section
    navigate('/#daily-love-note');
  };

  const handlePlayGame = () => {
    // This will later link to the would you rather game
    navigate('/games');
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-red-500 fill-red-500 mr-2" />
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-4">
        You made it through!
      </h2>
      
      <p className="text-gray-700 mb-8 max-w-md mx-auto">
        Conflict doesn't mean disconnection — and you just proved it. What would you like to do next?
      </p>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
        <Button 
          className="bg-mauve-rose hover:bg-mauve-rose/90 text-white flex items-center gap-2"
          onClick={handleSendLoveNote}
        >
          <MessageSquareHeart size={18} />
          Send a Love Note
        </Button>
        
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          onClick={handlePlayGame}
        >
          <Gamepad2 size={18} />
          Play Would You Rather
        </Button>
      </div>
      
      {onRestart && (
        <Button 
          className="mb-4 bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 mx-auto"
          onClick={onRestart}
        >
          <RefreshCw size={18} />
          Talk through something else
        </Button>
      )}
      
      <Button 
        variant="outline" 
        className="border-gray-300 text-gray-700"
        onClick={handleDone}
      >
        Done
      </Button>
    </div>
  );
};

export default EndSessionStep;
