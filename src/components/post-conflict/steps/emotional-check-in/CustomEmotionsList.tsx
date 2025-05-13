
import React from 'react';
import { EmotionChip } from './data/emotionCategoriesData';

interface CustomEmotionsListProps {
  customEmotions: EmotionChip[];
  selectedEmotions: string[];
  onEmotionToggle: (emotionId: string) => void;
}

const CustomEmotionsList: React.FC<CustomEmotionsListProps> = ({ 
  customEmotions, 
  selectedEmotions, 
  onEmotionToggle 
}) => {
  if (customEmotions.length === 0) return null;
  
  return (
    <div className="w-full">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#555555] mb-3">
        YOUR ADDITIONS
      </h3>
      <div className="flex flex-wrap gap-2">
        {customEmotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => onEmotionToggle(emotion.id)}
            className={`rounded-full px-4 py-2 text-sm transition-all ${
              selectedEmotions.includes(emotion.id)
                ? 'bg-[#85607D] text-white scale-105'
                : 'bg-transparent border border-[#C4B9B2] text-[#2C2C2C] hover:bg-[#C4B9B2]/20'
            }`}
          >
            {emotion.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomEmotionsList;
