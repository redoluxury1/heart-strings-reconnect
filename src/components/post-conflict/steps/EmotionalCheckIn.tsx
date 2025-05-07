
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
    <div className="bg-[#f5f0e8] p-6 rounded-lg">
      <h2 className="text-4xl md:text-5xl font-cormorant text-[#22254a] mb-5 text-center">
        Where's Your Head At?
      </h2>
      
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
