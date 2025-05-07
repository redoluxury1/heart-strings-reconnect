
import React, { useState, useEffect } from 'react';
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
    const updatedEmotions = emotions.includes(emotion)
      ? emotions.filter(e => e !== emotion)
      : [...emotions, emotion];
    
    setEmotions(updatedEmotions);
    
    // Only save the selections but don't auto-submit
    if (updatedEmotions.length > 0) {
      onResponse(updatedEmotions);
    }
  };
  
  const handleAddCustomEmotion = (emotion: string) => {
    if (!emotions.includes(emotion)) {
      const updatedEmotions = [...emotions, emotion];
      setEmotions(updatedEmotions);
      
      // Only save the selections but don't auto-submit
      if (updatedEmotions.length > 0) {
        onResponse(updatedEmotions);
      }
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
          onSubmit={() => {}} // Empty function as we'll auto-submit
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
