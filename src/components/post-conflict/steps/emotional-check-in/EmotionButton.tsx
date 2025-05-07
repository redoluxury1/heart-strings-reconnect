
import React from 'react';

interface EmotionButtonProps {
  emotion: string;
  isSelected: boolean;
  onToggle: (emotion: string) => void;
  backgroundColor?: string;
  textColor?: string;
}

const EmotionButton: React.FC<EmotionButtonProps> = ({ 
  emotion, 
  isSelected, 
  onToggle,
  backgroundColor = 'bg-lavender-100',
  textColor = 'text-navy-800'
}) => {
  return (
    <button
      type="button"
      className={`${backgroundColor} ${textColor} px-4 py-2 rounded-full text-sm transition-all ${
        isSelected ? 'ring-2 ring-midnight-indigo font-medium' : 'font-normal'
      }`}
      onClick={() => onToggle(emotion)}
    >
      {emotion}
    </button>
  );
};

export default EmotionButton;
