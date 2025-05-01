
import React from 'react';
import { Button } from '@/components/ui/button';
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
  const emotionOptions = [
    'anger', 'sadness', 'fear', 'shame', 'hurt', 
    'overwhelmed', 'rejected', 'misunderstood', 'frustrated',
    'anxious', 'disappointed', 'betrayed', 'guilty'
  ];

  // Get custom emotions that aren't in our standard list
  const customEmotions = emotions.filter(e => !emotionOptions.includes(e));
  
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6 max-w-2xl mx-auto">
        {/* Standard emotion buttons */}
        {emotionOptions.map(emotion => (
          <EmotionButton 
            key={emotion}
            emotion={emotion}
            isSelected={emotions.includes(emotion)}
            onToggle={onEmotionToggle}
          />
        ))}
        
        {/* Custom emotions that have been added */}
        {customEmotions.map(emotion => (
          <EmotionButton 
            key={emotion}
            emotion={emotion}
            isSelected={true}
            onToggle={onEmotionToggle}
          />
        ))}
      </div>
      
      <CustomEmotionInput onAddEmotion={onAddCustomEmotion} />
      
      <EmotionInsight emotions={emotions} />
      
      <div className="text-center">
        <Button 
          onClick={onSubmit}
          className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white px-8"
          disabled={emotions.length === 0}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default EmotionSelectionView;
