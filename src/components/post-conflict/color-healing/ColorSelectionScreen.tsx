
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface ColorSelectionScreenProps {
  selectedColor?: string;
  onColorSelect: (color: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const ColorSelectionScreen: React.FC<ColorSelectionScreenProps> = ({ 
  selectedColor: initialColor,
  onColorSelect,
  onBack,
  onContinue
}) => {
  // Predefined color options
  const colorOptions = [
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Blue', value: '#0EA5E9' },
    { name: 'Pink', value: '#D946EF' },
    { name: 'Red', value: '#ea384c' },
  ];
  
  const [selectedColor, setSelectedColor] = useState<string>(initialColor || colorOptions[0].value);
  const [customColor, setCustomColor] = useState<string>(initialColor || colorOptions[0].value);
  const [showCustomColorPicker, setShowCustomColorPicker] = useState<boolean>(false);

  // Handle color option selection
  const handleColorOptionSelect = (color: string) => {
    setSelectedColor(color);
    setCustomColor(color);
    setShowCustomColorPicker(false);
  };

  // Handle custom color change via slider
  const handleSliderChange = (value: number[]) => {
    // Convert the slider value to a hue (0-360)
    const hue = Math.floor(value[0] * 360);
    const newColor = `hsl(${hue}, 80%, 50%)`;
    setCustomColor(newColor);
    setSelectedColor(newColor);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onColorSelect(selectedColor);
    onContinue(); // Call onContinue when the form is submitted
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-semibold text-[#473C85] mb-2">
        Choose a color that feels healing to you
      </h2>
      
      <div className="grid grid-cols-4 gap-4 w-full max-w-md">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            type="button"
            className={`w-16 h-16 rounded-full transition-all ${
              selectedColor === color.value ? 'ring-4 ring-offset-2 ring-opacity-50' : ''
            }`}
            style={{
              backgroundColor: color.value,
              boxShadow: selectedColor === color.value ? `0 0 15px ${color.value}` : 'none',
            }}
            onClick={() => handleColorOptionSelect(color.value)}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
      
      <div className="w-full max-w-md">
        <p className="text-center text-sm text-gray-600 mb-2">
          or choose your own custom color
        </p>
        
        <div className="relative h-12 px-2">
          <div 
            className="absolute inset-0 rounded-full h-6 mt-3 overflow-hidden"
            style={{
              background: 'linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)',
            }}
          />
          <Slider
            defaultValue={[0]}
            max={1}
            step={0.001}
            className="pt-3"
            onValueChange={handleSliderChange}
          />
        </div>
      </div>
      
      <div className="mt-8 w-full flex flex-col items-center">
        <div 
          className="w-24 h-24 rounded-full mb-4"
          style={{ 
            backgroundColor: customColor,
            boxShadow: `0 0 15px ${customColor}`
          }}
        />
        
        <p className="text-sm text-gray-600 italic mb-6">
          This color makes me feel safe and calm
        </p>
        
        <Button 
          type="submit"
          className="px-8 py-2 bg-[#7D5248] hover:bg-[#6a443b] text-white"
        >
          Continue with this color
        </Button>
      </div>
    </form>
  );
};

export default ColorSelectionScreen;
