
import React from 'react';

interface EmotionCategoryProps {
  category: string;
  emotions: string[];
  selectedEmotions: string[];
  onEmotionToggle: (emotion: string) => void;
}

const EmotionCategory: React.FC<EmotionCategoryProps> = ({ 
  category, 
  emotions, 
  selectedEmotions, 
  onEmotionToggle 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-[#3A3A3A]">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => onEmotionToggle(emotion)}
            className={`rounded-full px-4 py-2 text-sm ${
              selectedEmotions.includes(emotion)
                ? 'bg-[#D3876A] text-white'
                : 'bg-[#F8F5F3] border border-[#D9B9AF] text-[#3A3A3A]'
            } hover:opacity-90 transition-colors`}
          >
            {emotion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionCategory;
