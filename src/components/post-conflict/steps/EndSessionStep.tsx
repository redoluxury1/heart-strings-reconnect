
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquareHeart, Gamepad2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { useInterface } from '../../common/InterfaceProvider';

interface EndSessionStepProps {
  onSendLoveNote: () => void;
  onRestart?: () => void;
}

const EndSessionStep: React.FC<EndSessionStepProps> = ({ 
  onSendLoveNote,
  onRestart
}) => {
  const navigate = useNavigate();
  const [moodValue, setMoodValue] = useState([50]); // Default to middle of scale
  const { isEmotional } = useInterface();

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
        {isEmotional ? (
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500 fill-red-500 mr-2" />
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          </div>
        ) : (
          <div className="flex items-center">
            <RefreshCw className="h-8 w-8 text-[#589391] mr-2" />
          </div>
        )}
      </div>
      
      <h2 className={`text-2xl md:text-3xl ${isEmotional ? "font-cormorant" : ""} font-medium ${
        isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
      } mb-4`}>
        {isEmotional ? "Phew! How do you feel?" : "Progress Made. How are you feeling?"}
      </h2>
      
      <p className={`${isEmotional ? "text-gray-700" : "text-[#2C3E50]"} mb-8 max-w-md mx-auto`}>
        {isEmotional 
          ? "Conflict doesn't mean disconnection — and you just proved it. What would you like to do next?"
          : "You've addressed the issue constructively. What's your next step?"}
      </p>
      
      <div className="max-w-md mx-auto mb-10">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{isEmotional ? "Still Hurting" : "Needs Work"}</span>
          <span>{isEmotional ? "Feeling Hopeful" : "Resolved"}</span>
        </div>
        <Slider 
          value={moodValue} 
          onValueChange={setMoodValue} 
          max={100} 
          step={1} 
          className={`mb-2 ${!isEmotional && "accent-[#589391]"}`}
        />
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
        <Button 
          className={`flex items-center gap-2 ${
            isEmotional 
              ? "bg-mauve-rose hover:bg-mauve-rose/90 text-white" 
              : "bg-[#E51D2C] hover:bg-[#E51D2C]/90 text-white"
          }`}
          onClick={handleSendLoveNote}
        >
          <MessageSquareHeart size={18} />
          {isEmotional ? "Send a Love Note" : "Send a Note"}
        </Button>
        
        <Button 
          className={`flex items-center gap-2 ${
            isEmotional 
              ? "bg-midnight-indigo hover:bg-midnight-indigo/90 text-white" 
              : "bg-[#589391] hover:bg-[#589391]/90 text-white"
          }`}
          onClick={handlePlayGame}
        >
          <Gamepad2 size={18} />
          Play Would You Rather
        </Button>
      </div>
      
      {onRestart && (
        <Button 
          className={`mb-4 flex items-center gap-2 mx-auto ${
            isEmotional
              ? "bg-mauve-rose/30 hover:bg-mauve-rose/40 text-midnight-indigo" 
              : "bg-[#589391]/20 hover:bg-[#589391]/30 text-[#2C3E50]"
          }`}
          onClick={onRestart}
        >
          <RefreshCw size={18} />
          {isEmotional ? "Talk through something else" : "Address another issue"}
        </Button>
      )}
    </div>
  );
};

export default EndSessionStep;
