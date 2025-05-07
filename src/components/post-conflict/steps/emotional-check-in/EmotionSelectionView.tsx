
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EmotionButton from './EmotionButton';
import CustomEmotionInput from './CustomEmotionInput';
import EmotionInsight from './EmotionInsight';

interface EmotionSelectionViewProps {
  emotions: string[];
  onEmotionToggle: (emotion: string) => void;
  onAddCustomEmotion: (emotion: string) => void;
  onSubmit: () => void;
}

const EmotionSelectionView: React.FC<EmotionSelectionViewProps> = ({
  emotions,
  onEmotionToggle,
  onAddCustomEmotion,
  onSubmit
}) => {
  // Define emotion categories with their colors
  const emotionCategories = [
    {
      category: 'overwhelmed',
      color: 'bg-lavender-100',
      textColor: 'text-navy-800',
      emotions: ['anxious', 'chaotic', 'stressed', 'retrayed']
    },
    {
      category: 'hurt',
      color: 'bg-peach-100',
      textColor: 'text-navy-800',
      emotions: ['rejected', 'guilty', 'betrayed', 'numb']
    },
    {
      category: 'shut down',
      color: 'bg-rose-200/60',
      textColor: 'text-navy-800',
      emotions: ['sad', 'withdrawn', 'numb', 'unheard']
    },
    {
      category: 'frustrated',
      color: 'bg-rose-300/70',
      textColor: 'text-navy-800',
      emotions: ['angry', 'misunderstood', 'unheard']
    }
  ];
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Main emotion illustration */}
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/a3832cf3-b101-4e12-b62e-e549e7dc9cf9.png" 
          alt="Person with hand on face, looking overwhelmed" 
          className="w-64 h-auto"
        />
      </div>
      
      <p className="text-center text-navy-800 text-xl mb-10">
        Emotions run deep—let's name what came up for you.
      </p>
      
      {/* Emotion categories */}
      <div className="space-y-8 mb-6">
        {emotionCategories.map((category) => (
          <div key={category.category} className="space-y-3">
            <h3 className="text-2xl font-medium text-[#7b4b69]">{category.category}</h3>
            <div className="flex flex-wrap gap-3">
              {category.emotions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => onEmotionToggle(emotion)}
                  className={`${category.color} ${category.textColor} px-6 py-3 rounded-full text-lg font-medium transition-colors ${
                    emotions.includes(emotion) ? 'ring-2 ring-midnight-indigo' : ''
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add your own emotion */}
      <div className="flex items-center max-w-xl mx-auto bg-white border border-[#22254a] rounded-full px-4 py-2 mb-8">
        <input
          type="text"
          placeholder="Didn't see yours? Add your own emotion here:"
          className="w-full bg-transparent border-none outline-none px-2 py-1 text-[#22254a]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              onAddCustomEmotion(e.currentTarget.value.trim());
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
      
      {/* Continue button */}
      <div className="text-center">
        <Button 
          onClick={onSubmit}
          className="bg-[#7b4b69] hover:bg-[#6a3a58] text-white rounded-full px-8 py-6 text-xl w-full max-w-md"
          disabled={emotions.length === 0}
        >
          I've named my emotions
        </Button>
      </div>
    </div>
  );
};

export default EmotionSelectionView;
