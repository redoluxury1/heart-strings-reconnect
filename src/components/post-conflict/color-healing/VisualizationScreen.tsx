
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import OrbVisualization from './visualization/OrbVisualization';
import VisualizationInstructions from './visualization/VisualizationInstructions';
import useVisualization from './hooks/useVisualization';

interface VisualizationScreenProps {
  selectedColor: string;
  onContinue: () => void;
  onBack: () => void;
}

const VisualizationScreen: React.FC<VisualizationScreenProps> = ({ 
  selectedColor, 
  onContinue,
  onBack
}) => {
  const [showControls, setShowControls] = useState(false);
  const { fadeIn, setFadeIn } = useVisualization();
  const [imagePreloaded, setImagePreloaded] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const [countdownComplete, setCountdownComplete] = useState(false);

  // Preload next screen image
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/bfee4335-5a61-4d5c-bdc2-cda58c3beb29.png";
    img.onload = () => setImagePreloaded(true);
    
    return () => {
      img.onload = null;
    };
  }, []);
  
  // Automatically fade in the orb
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 1000);
    
    // Start countdown after a delay
    const controlsTimer = setTimeout(() => {
      setShowControls(true);
    }, 4000);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(controlsTimer);
    };
  }, [setFadeIn]);
  
  // Handle countdown logic
  useEffect(() => {
    if (!showControls) return;
    
    let timer: ReturnType<typeof setTimeout>;
    
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setCountdownComplete(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, showControls]);
  
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <VisualizationInstructions />
      
      <div className="relative w-full mb-12">
        <OrbVisualization 
          selectedColor={selectedColor}
          fadeIn={fadeIn}
          showButtons={showControls}
        />
      </div>
      
      {showControls && (
        <div className="w-full flex flex-col gap-4 items-center">
          <Button
            onClick={onContinue}
            disabled={!countdownComplete}
            className="bg-[#7D5248] hover:bg-[#6a443b] text-white rounded-full py-3 px-6 w-full max-w-xs text-lg"
          >
            {countdownComplete ? 'Continue' : `Continue in ${countdown}`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default VisualizationScreen;
