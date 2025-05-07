
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CirclePicker } from 'react-color';
import { Slider } from '@/components/ui/slider';

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
  const [sliderValue, setSliderValue] = useState([180]); // Default to middle of hue range (0-360)
  
  // Preload the visualization screen assets
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/bfee4335-5a61-4d5c-bdc2-cda58c3beb29.png";
    img.onload = () => setImagePreloaded(true);
    
    return () => {
      img.onload = null;
    };
  }, []);

  // Convert hue value to RGB color
  const hueToColor = (hue: number): string => {
    // Convert HSL to RGB
    const h = hue / 360;
    const s = 1;
    const l = 0.5;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (x: number): string => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  
  // Update color when slider changes
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const color = hueToColor(value[0]);
    onColorSelect(color);
    setShowContinue(true);
  };
  
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
      
      <div className="p-4 bg-white rounded-xl shadow-inner mb-6">
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
      
      {/* Rainbow color slider */}
      <div className="w-full max-w-md px-4 mb-8">
        <p className="text-center text-gray-600 mb-2 text-sm">
          Or fine-tune with our color-o-meter
        </p>
        <div 
          className="h-2 w-full mb-4 rounded-full" 
          style={{ 
            background: 'linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)'
          }}
        ></div>
        <Slider
          value={sliderValue}
          min={0}
          max={360}
          step={1}
          onValueChange={handleSliderChange}
          className="w-full"
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
          className="bg-[#6a3d9a] hover:bg-[#5a2d8a] text-white rounded-full py-2 px-6"
        >
          Continue with this color
        </Button>
      </div>
    </div>
  );
};

export default ColorSelectionScreen;
