
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import OrbVisualization from './visualization/OrbVisualization';
import VisualizationControls from './visualization/VisualizationControls';
import VisualizationInstructions from './visualization/VisualizationInstructions';
import { useVisualization } from './hooks/useVisualization';

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

  // Preload next screen image
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/bfee4335-5a61-4d5c-bdc2-cda58c3beb29.png";
    img.onload = () => setImagePreloaded(true);
    
    return () => {
      img.onload = null;
    };
  }, []);
  
  // Automatically fade in the orb and show controls after a delay
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 1000);
    
    const controlsTimer = setTimeout(() => {
      setShowControls(true);
    }, 4000);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(controlsTimer);
    };
  }, [setFadeIn]);
  
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
        <>
          <div className="w-full flex flex-col gap-4 items-center">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full py-2 px-6 w-full max-w-xs"
            >
              Back
            </Button>
            
            <Button
              onClick={onContinue}
              className="bg-[#7D5248] hover:bg-[#6a443b] text-white rounded-full py-2 px-6 w-full max-w-xs"
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VisualizationScreen;
