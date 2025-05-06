
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
            onClick={() => onColorSelect(color.hex)}
          >
            <span className={`text-xs font-medium ${['#F4D03F', '#58D68D'].includes(color.hex) ? 'text-gray-800' : 'text-white'}`}>
              {color.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-8 w-full max-w-md">
        <label className="block text-sm text-gray-600 mb-2">Or select a custom color:</label>
        <Input 
          type="color" 
          value={selectedColor}
          onChange={(e) => onColorSelect(e.target.value)}
          className="h-12 w-full cursor-pointer"
        />
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
