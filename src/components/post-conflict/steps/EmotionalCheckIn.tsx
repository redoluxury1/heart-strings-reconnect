
import React, { useState } from 'react';
import EmotionSelectionView from './emotional-check-in/EmotionSelectionView';
import EmotionSummaryView from './emotional-check-in/EmotionSummaryView';
import { useEmotionalInsights } from './emotional-check-in/useEmotionalInsights';

interface EmotionalCheckInProps {
  onResponse: (emotions: string[]) => void;
  selectedEmotions: string[] | null;
  partner2Emotions: string[] | null;
}

const EmotionalCheckIn: React.FC<EmotionalCheckInProps> = ({ 
  onResponse, 
  selectedEmotions,
  partner2Emotions 
}) => {
  const [emotions, setEmotions] = useState<string[]>(selectedEmotions || []);
  const [isSubmitted, setIsSubmitted] = useState(!!selectedEmotions);
  
  const emotionalInsight = useEmotionalInsights(emotions);
  
  const handleEmotionToggle = (emotion: string) => {
    if (emotions.includes(emotion)) {
      setEmotions(emotions.filter(e => e !== emotion));
    } else {
      setEmotions([...emotions, emotion]);
    }
  };
  
  const handleAddCustomEmotion = (emotion: string) => {
    if (!emotions.includes(emotion)) {
      setEmotions([...emotions, emotion]);
    }
  };
  
  const handleSubmit = () => {
    if (emotions.length > 0) {
      onResponse(emotions);
      setIsSubmitted(true);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-3 text-center">
        Emotional Check-In
      </h2>
      
      <p className="text-center text-gray-700 mb-6">
        What emotions came up for you during the fight?
      </p>
      
      {!isSubmitted ? (
        <EmotionSelectionView
          emotions={emotions}
          onEmotionToggle={handleEmotionToggle}
          onAddCustomEmotion={handleAddCustomEmotion}
          onSubmit={handleSubmit}
        />
      ) : (
        <EmotionSummaryView
          emotions={emotions}
          partnerEmotions={partner2Emotions}
          emotionalInsight={emotionalInsight}
        />
      )}
    </div>
  );
};

export default EmotionalCheckIn;
