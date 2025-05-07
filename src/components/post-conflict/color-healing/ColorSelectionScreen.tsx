
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
  const predefinedColors = [
    { name: 'Blue', hex: '#4A90E2' },
    { name: 'Purple', hex: '#9B87F5' },
    { name: 'Pink', hex: '#E887B2' },
    { name: 'Green', hex: '#58D68D' },
    { name: 'Gold', hex: '#F4D03F' },
    { name: 'Teal', hex: '#45B5AA' },
  ];
  
  // Rainbow gradient for the color picker
  const rainbowGradient = 'linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF)';
  
  // Convert hue value to an RGB hex color
  const hueToColor = (hue: number) => {
    // Convert the hue (0-360) to HSL and then to RGB
    const h = hue;
    const s = 1; // 100% saturation
    const l = 0.5; // 50% lightness
    
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - chroma / 2;
    
    let r, g, b;
    if (h >= 0 && h < 60) {
      [r, g, b] = [chroma, x, 0];
    } else if (h >= 60 && h < 120) {
      [r, g, b] = [x, chroma, 0];
    } else if (h >= 120 && h < 180) {
      [r, g, b] = [0, chroma, x];
    } else if (h >= 180 && h < 240) {
      [r, g, b] = [0, x, chroma];
    } else if (h >= 240 && h < 300) {
      [r, g, b] = [x, 0, chroma];
    } else {
      [r, g, b] = [chroma, 0, x];
    }
    
    const red = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    const green = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    const blue = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    
    return `#${red}${green}${blue}`;
  };
  
  // State for the hue value (0-360 degrees)
  const [hue, setHue] = useState(0);
  
  // State to track the current preview color (this ensures the UI stays in sync)
  const [previewColor, setPreviewColor] = useState(selectedColor);
  
  // Handle click on predefined color
  const handlePredefinedColorClick = (color: string) => {
    // Update both the parent component's state and our local preview
    onColorSelect(color);
    setPreviewColor(color);
  };
  
  // Update the selected color when hue changes
  useEffect(() => {
    const newColor = hueToColor(hue);
    onColorSelect(newColor);
    setPreviewColor(newColor); // Also update our local preview
  }, [hue, onColorSelect]);
  
  // Initialize hue from a selected color if one exists
  useEffect(() => {
    // This is a simplified way to get an approximate hue from a hex color
    // A complete implementation would need to convert hex to HSL properly
    if (selectedColor && selectedColor !== hueToColor(hue)) {
      // Just set a default hue when a predefined color is selected
      // In a more complete implementation, we would extract the hue from the selectedColor
      setHue(240);
      setPreviewColor(selectedColor); // Make sure our local preview is in sync
    }
  }, [selectedColor]);

  // Handler for both click and drag on the rainbow
  const handleRainbowInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    // Get the position for either mouse or touch event
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : (e as React.MouseEvent).clientX;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setHue(Math.round(percentage * 360));
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Choose Your Color
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg">
        What's a color that makes you feel safe, calm, or happy?
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md">
        {predefinedColors.map((color) => (
          <div 
            key={color.hex} 
            className={`h-16 rounded-md cursor-pointer flex items-center justify-center transition-all ${
              selectedColor === color.hex ? 'ring-4 ring-offset-2 ring-[#7d6272]' : 'hover:scale-105'
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handlePredefinedColorClick(color.hex)}
          >
            <span className={`text-xs font-medium ${['#F4D03F', '#58D68D'].includes(color.hex) ? 'text-gray-800' : 'text-white'}`}>
              {color.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-8 w-full max-w-md">
        <Label className="block text-sm text-gray-600 mb-2">Or select a custom color:</Label>
        
        {/* Interactive rainbow color picker */}
        <div 
          className="h-16 rounded-lg mb-4 relative cursor-pointer" 
          style={{ background: rainbowGradient }}
          onClick={handleRainbowInteraction}
          onMouseMove={(e) => {
            if (e.buttons === 1) { // Only track if mouse button is pressed
              handleRainbowInteraction(e);
            }
          }}
          onTouchMove={handleRainbowInteraction}
          aria-label="Color selection slider"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={hue}
        >
          {/* Cursor indicator */}
          <div 
            className="absolute top-0 bottom-0 w-2 bg-white border border-gray-300 shadow-md"
            style={{ 
              left: `calc(${(hue / 360) * 100}% - 2px)`,
              transform: 'translateX(-50%)'
            }}
          ></div>
        </div>
        
        {/* Color preview - now using our local state to ensure it updates immediately */}
        <div 
          className="h-16 w-full rounded-md border-2 border-gray-200 mb-4"
          style={{ backgroundColor: previewColor }}
          aria-label="Selected color preview"
        ></div>
      </div>
      
      <div className="flex space-x-4 mt-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-gray-300 text-gray-600 hover:text-[#7d6272]"
        >
          Back
        </Button>
        <Button 
          onClick={onContinue}
          className="bg-[#7d6272] hover:bg-[#6d5262] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ColorSelectionScreen;
