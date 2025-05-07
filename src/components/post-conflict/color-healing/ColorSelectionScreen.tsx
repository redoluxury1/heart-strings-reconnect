
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CircleDot, ColorPicker } from 'lucide-react';

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
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);

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

  // Convert HSL to hex for the custom color
  const getCustomColor = () => {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Toggle between preset colors and custom color picker
  const toggleCustomPicker = () => {
    setShowCustomPicker(!showCustomPicker);
    if (!showCustomPicker) {
      // When switching to custom picker, set the current color as the starting point
      const customColor = getCustomColor();
      onColorSelect(customColor);
    }
  };

  // Update the custom color when sliders change
  const updateCustomColor = () => {
    const customColor = getCustomColor();
    onColorSelect(customColor);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Choose a Color That Feels Healing to You
      </h2>
      
      <p className="text-center text-gray-700 mb-8">
        Color can have remarkable effects on our emotional state. Select a color that resonates with 
        your feelings right now - one that feels soothing, supportive, or healing.
      </p>

      <div className="flex justify-center mb-6">
        <button 
          onClick={toggleCustomPicker}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors
            ${showCustomPicker ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
        >
          {showCustomPicker ? (
            <>
              <CircleDot size={16} />
              <span>Choose from presets</span>
            </>
          ) : (
            <>
              <ColorPicker size={16} />
              <span>Create custom color</span>
            </>
          )}
        </button>
      </div>

      {!showCustomPicker ? (
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
                  // Remove the invalid ringColor property
                }}
              />
              <span className="text-sm font-medium">{color.name}</span>
              <span className="text-xs text-gray-500">{color.description}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-md mb-8 p-6 bg-white rounded-xl shadow-sm">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hue
              </label>
              <Slider
                defaultValue={[hue]} 
                max={360}
                step={1}
                onValueChange={(value) => {
                  setHue(value[0]);
                  updateCustomColor();
                }}
                className="mb-2"
              />
              <div className="h-2 rounded-full w-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saturation
              </label>
              <Slider
                defaultValue={[saturation]} 
                max={100}
                step={1}
                onValueChange={(value) => {
                  setSaturation(value[0]);
                  updateCustomColor();
                }}
                className="mb-2"
              />
              <div className="h-2 rounded-full w-full" style={{
                background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`
              }} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brightness
              </label>
              <Slider
                defaultValue={[lightness]} 
                max={100}
                step={1}
                onValueChange={(value) => {
                  setLightness(value[0]);
                  updateCustomColor();
                }}
                className="mb-2"
              />
              <div className="h-2 rounded-full w-full" style={{
                background: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))` 
              }} />
            </div>
          </div>
        </div>
      )}

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
