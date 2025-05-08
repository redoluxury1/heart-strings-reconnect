
import React, { useState, useEffect, useRef } from 'react';
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
  const [imagePreloaded, setImagePreloaded] = useState(false);
  const [countdown, setCountdown] = useState(12); // Changed from 7 to 12 seconds
  const [countdownComplete, setCountdownComplete] = useState(false);
  const { fadeIn, setFadeIn } = useVisualization();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll only within component when mounted, not to top of page
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

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
    
    return () => {
      clearTimeout(fadeTimer);
    };
  }, [setFadeIn]);
  
  // Handle countdown logic
  useEffect(() => {
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
  }, [countdown]);
  
  // Handle continue click without scrolling to top of page
  const handleContinueClick = (e) => {
    // Prevent default browser behavior
    e.preventDefault();
    onContinue();
  };
  
  return (
    <div ref={containerRef} className="flex flex-col items-center max-w-xl mx-auto">
      <VisualizationInstructions />
      
      <div className="relative w-full mb-12">
        <OrbVisualization 
          selectedColor={selectedColor}
          fadeIn={fadeIn}
          showButtons={false}
        />
      </div>
      
      <div className="w-full flex flex-col gap-4 items-center">
        <Button
          onClick={handleContinueClick}
          disabled={!countdownComplete}
          className="py-3 px-6 w-full max-w-xs text-lg text-white rounded-full"
          style={{
            backgroundColor: selectedColor,
          }}
        >
          {countdownComplete ? 'Continue' : `Continue in ${countdown}`}
        </Button>
      </div>
    </div>
  );
};

export default VisualizationScreen;
