
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CirclePicker } from 'react-color';

interface ColorSelectionScreenProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const ColorSelectionScreen: React.FC<ColorSelectionScreenProps> = ({
  selectedColor,
  onColorSelect,
  onContinue,
  onBack
}) => {
  const [showContinue, setShowContinue] = useState(false);
  const [imagePreloaded, setImagePreloaded] = useState(false);
  
  // Preload the visualization screen assets
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/bfee4335-5a61-4d5c-bdc2-cda58c3beb29.png";
    img.onload = () => setImagePreloaded(true);
    
    return () => {
      img.onload = null;
    };
  }, []);
  
  const colors = [
    '#a6cee3', // Light blue
    '#1f78b4', // Darker blue
    '#b2df8a', // Light green
    '#33a02c', // Darker green
    '#e5c494', // Light brown
    '#E6A98E', // Peach
    '#CC92E7', // Lavender
    '#fb9a99', // Light red/pink
    '#e31a1c', // Red
    '#fdbf6f', // Light orange
    '#ff7f00', // Orange
    '#cab2d6', // Light purple
    '#6a3d9a', // Purple
    '#7D5248', // Brown (default)
  ];
  
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Choose Your Color
      </h2>
      
      <p className="text-center text-gray-700 mb-3">
        Which color feels most healing to you right now?
      </p>
      
      <p className="text-center text-gray-500 mb-8 text-sm">
        Trust your intuition—there's no wrong answer
      </p>
      
      <div className="p-4 bg-white rounded-xl shadow-inner mb-8">
        <CirclePicker
          width="320px"
          circleSize={28}
          circleSpacing={14}
          colors={colors}
          color={selectedColor}
          onChange={(color) => {
            onColorSelect(color.hex);
            setShowContinue(true);
          }}
        />
      </div>
      
      <div className="flex justify-center items-center mb-6">
        <div 
          className="w-24 h-24 rounded-full transition-all duration-500"
          style={{ 
            backgroundColor: selectedColor,
            boxShadow: `0 0 20px 5px ${selectedColor}`,
          }}
        ></div>
      </div>
      
      <p className="text-center text-gray-600 mb-8 italic">
        "This color makes me feel safe and calm"
      </p>
      
      <div className="flex flex-col gap-4 mt-4 w-full max-w-sm">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full py-2 px-6"
        >
          Back
        </Button>
        
        <Button
          onClick={onContinue}
          className="bg-[#7D5248] hover:bg-[#6a443b] text-white rounded-full py-2 px-6"
        >
          Continue with this color
        </Button>
      </div>
    </div>
  );
};

export default ColorSelectionScreen;
