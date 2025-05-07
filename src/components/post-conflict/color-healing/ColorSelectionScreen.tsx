
import React from 'react';
import { Button } from '@/components/ui/button';

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
  // Colors options
  const colorOptions = [
    { value: '#7D5248', name: 'Warm Brown', description: 'Stability & Security' },
    { value: '#E3A15A', name: 'Golden Yellow', description: 'Joy & Optimism' },
    { value: '#5F7973', name: 'Sage Green', description: 'Peace & Growth' },
    { value: '#7d6272', name: 'Mauve', description: 'Compassion & Understanding' },
    { value: '#5885AF', name: 'Soft Blue', description: 'Calmness & Communication' },
    { value: '#8B4513', name: 'Deep Brown', description: 'Grounding & Warmth' },
    { value: '#6b9080', name: 'Forest Green', description: 'Healing & Balance' },
    { value: '#677db7', name: 'Lavender Blue', description: 'Serenity & Harmony' },
  ];

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Choose a Color That Feels Healing to You
      </h2>
      
      <p className="text-center text-gray-700 mb-8">
        Color can have remarkable effects on our emotional state. Select a color that resonates with 
        your feelings right now - one that feels soothing, supportive, or healing.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {colorOptions.map((color) => (
          <div 
            key={color.value}
            onClick={() => onColorSelect(color.value)}
            className={`flex flex-col items-center space-y-1 cursor-pointer transition-transform duration-200 
              ${selectedColor === color.value ? 'scale-110' : 'scale-100 hover:scale-105'}`}
          >
            <div 
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer transition-all duration-300 
                ${selectedColor === color.value ? 'ring-4 ring-offset-2' : 'hover:ring-2 hover:ring-offset-1'}`}
              style={{ 
                backgroundColor: color.value,
                ringColor: color.value
              }}
            />
            <span className="text-sm font-medium">{color.name}</span>
            <span className="text-xs text-gray-500">{color.description}</span>
          </div>
        ))}
      </div>

      {/* Selected color visualization */}
      <div className="flex flex-col items-center mb-8">
        <div 
          className="w-32 h-32 rounded-full transition-all duration-500"
          style={{ 
            backgroundColor: selectedColor,
            boxShadow: `0 0 30px 5px ${selectedColor}`
          }}
        />
        <p className="mt-3 text-sm text-gray-600">This color makes me feel safe and calm</p>
      </div>

      <div className="flex justify-center w-full">
        <Button
          onClick={onContinue}
          className="py-3 px-6 w-full max-w-xs text-lg text-white rounded-full"
          style={{
            backgroundColor: selectedColor
          }}
        >
          Continue with this color
        </Button>
      </div>
    </div>
  );
};

export default ColorSelectionScreen;
