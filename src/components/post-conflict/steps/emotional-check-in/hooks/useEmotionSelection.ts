
import { useState } from 'react';
import { EmotionChip } from '../data/emotionCategoriesData';
import { useToast } from '@/hooks/use-toast';

export const useEmotionSelection = (maxSelections: number = 5) => {
  const { toast } = useToast();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [customEmotions, setCustomEmotions] = useState<EmotionChip[]>([]);

  const handleEmotionToggle = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      setSelectedEmotions(selectedEmotions.filter(id => id !== emotionId));
    } else {
      if (selectedEmotions.length >= maxSelections) {
        toast({
          title: "Maximum selections reached",
          description: `You can only select up to ${maxSelections} emotions.`,
        });
        return;
      }
      setSelectedEmotions([...selectedEmotions, emotionId]);
    }
  };

  const handleAddCustomEmotion = (emotion: string) => {
    // Check if maximum selections would be exceeded
    if (selectedEmotions.length + 1 > maxSelections) {
      toast({
        title: "Maximum selections reached",
        description: `You can only select up to ${maxSelections} emotions.`,
      });
      return;
    }

    const newCustomEmotion = {
      id: `custom-${Date.now()}`,
      label: emotion.toLowerCase().trim(),
      category: 'custom'
    };

    setCustomEmotions([...customEmotions, newCustomEmotion]);
    setSelectedEmotions([...selectedEmotions, newCustomEmotion.id]);
  };

  return {
    selectedEmotions,
    customEmotions,
    handleEmotionToggle,
    handleAddCustomEmotion,
    isMaxSelectionsReached: selectedEmotions.length >= maxSelections
  };
};
