
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
      emotions: ['anxious', 'chaotic', 'stressed', 'betrayed']
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
      <div className="flex justify-center mb-4">
        <img 
          src="/lovable-uploads/0e873fb6-7302-498a-a8ac-c7c5a5e83f57.png" 
          alt="Two people looking stressed and emotionally overwhelmed" 
          className="w-60 h-auto"
        />
      </div>
      
      <p className="text-center text-navy-800 text-md mb-8">
        Emotions run deep—let's name what came up for you.
      </p>
      
      {/* Emotion categories */}
      <div className="space-y-6 mb-6">
        {emotionCategories.map((category) => (
          <div key={category.category} className="space-y-2">
            <h3 className="text-xl font-medium text-[#7b4b69]">{category.category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
              {category.emotions.map((emotion) => (
                <EmotionButton
                  key={emotion}
                  emotion={emotion}
                  isSelected={emotions.includes(emotion)}
                  onToggle={onEmotionToggle}
                  backgroundColor={category.color}
                  textColor={category.textColor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add your own emotion */}
      <CustomEmotionInput onAddEmotion={onAddCustomEmotion} />
      
      {/* Continue button */}
      <div className="text-center">
        <Button 
          onClick={onSubmit}
          className="bg-[#7b4b69] hover:bg-[#6a3a58] text-white rounded-full px-6 py-5 text-md w-full max-w-md"
          disabled={emotions.length === 0}
        >
          I've named my emotions
        </Button>
      </div>
    </div>
  );
};

export default EmotionSelectionView;
