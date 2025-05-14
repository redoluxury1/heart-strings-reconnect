
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
      // Offset to account for any fixed headers
      const yOffset = -80; 
      const y = okayButNowWhatSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="text-center max-w-md mx-auto">
      {/* Add the couple image */}
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/4d7f62d0-dd67-4224-91ce-5befbd32a9bf.png" 
          alt="Couple relaxing together" 
          className="h-40 w-auto"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      
      <h2 className="text-4xl font-cormorant font-medium text-[#2e2a63] mb-4">
        Phew! How do you feel?
      </h2>
      
      <p className="text-[#2e2a63] mb-8 text-lg">
        Conflict doesn't mean disconnection — and you just proved it. What would you like to do next?
      </p>
      
      <div className="mb-10">
        <div className="flex justify-between text-sm text-[#2e2a63] mb-2">
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
          <span className="text-sm">What's next for us?</span>
        </Button>
        
        <Button 
          className="bg-[#c06b6b] hover:bg-[#a35757] text-white py-6 text-lg rounded-full"
          onClick={handlePlayGame}
        >
          <span className="text-sm">Play Would You Rather</span>
        </Button>
      </div>
      
      {onRestart && (
        <Button 
          className="bg-[#e3d5bd] hover:bg-[#d6c9b1] text-black py-6 text-lg rounded-full w-full"
          onClick={onRestart}
        >
          <span className="text-sm">Talk through something else</span>
        </Button>
      )}
    </div>
  );
};

export default EndSessionStep;
