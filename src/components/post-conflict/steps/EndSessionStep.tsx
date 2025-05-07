
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';

interface EndSessionStepProps {
  onSendLoveNote?: () => void;
  onRestart?: () => void;
}

const EndSessionStep: React.FC<EndSessionStepProps> = ({ 
  onRestart
}) => {
  const navigate = useNavigate();
  const [moodValue, setMoodValue] = useState([50]); // Default to middle of scale

  const handlePlayGame = () => {
    // This will link to the would you rather game
    navigate('/reconnect');
  };

  const handleNextSteps = () => {
    // Navigate to the "Okay, but what's next" section
    const okayButNowWhatSection = document.getElementById('okay-but-now-what');
    if (okayButNowWhatSection) {
      okayButNowWhatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-center max-w-md mx-auto">
      {/* Main couple illustration */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/08f3a4de-4e5d-48c7-a31d-baf49f58b59d.png" 
          alt="Couple sitting with popcorn" 
          className="w-full h-auto rounded-lg"
        />
      </div>
      
      <h2 className="text-4xl font-cormorant font-medium text-[#2e2a63] mb-4">
        Phew! How do you feel?
      </h2>
      
      <p className="text-gray-800 mb-8 text-lg">
        Conflict doesn't mean disconnection — and you just proved it. What would you like to do next?
      </p>
      
      <div className="mb-10">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Still Hurting</span>
          <span>Feeling Hopeful</span>
        </div>
        <Slider 
          value={moodValue} 
          onValueChange={setMoodValue} 
          max={100} 
          step={1} 
          className="mb-2"
        />
      </div>
      
      <div className="flex flex-col gap-3 mb-2">
        <Button 
          className="bg-[#2e2a63] hover:bg-[#1e1a43] text-white py-6 text-lg rounded-full"
          onClick={handleNextSteps}
        >
          What's next for us?
        </Button>
        
        <Button 
          className="bg-[#c06b6b] hover:bg-[#a35757] text-white py-6 text-lg rounded-full flex items-center justify-center gap-2"
          onClick={handlePlayGame}
        >
          <span className="text-white">🚗</span>
          <span>Play Would You Rather</span>
        </Button>
      </div>
      
      {onRestart && (
        <Button 
          className="bg-[#e3d5bd] hover:bg-[#d6c9b1] text-black py-6 text-lg rounded-full flex items-center justify-center gap-2 w-full"
          onClick={onRestart}
        >
          <span className="text-black">💬</span>
          <span>Talk through something else</span>
        </Button>
      )}
    </div>
  );
};

export default EndSessionStep;
