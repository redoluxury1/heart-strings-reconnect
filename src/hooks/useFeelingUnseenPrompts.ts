
import { useState, useEffect } from 'react';
import { feelingUnseenSubcategories, FeelingUnseenSubcategoryData } from '@/data/feeling-unseen-subcategories';

export const useFeelingUnseenPrompts = (subcategoryId: string) => {
  const [subcategory, setSubcategory] = useState<FeelingUnseenSubcategoryData | null>(null);
  const [openEndedPrompts, setOpenEndedPrompts] = useState<string[]>([]);
  const [yesNoSometimesPrompts, setYesNoSometimesPrompts] = useState<string[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    const foundSubcategory = feelingUnseenSubcategories.find(sub => sub.id === subcategoryId);
    
    if (foundSubcategory) {
      setSubcategory(foundSubcategory);
      setOpenEndedPrompts(foundSubcategory.prompts.openEnded);
      setYesNoSometimesPrompts(foundSubcategory.prompts.yesNoSometimes);
      setCurrentPromptIndex(0);
    }
  }, [subcategoryId]);

  const currentOpenEndedPrompt = openEndedPrompts[currentPromptIndex];
  
  const goToNextPrompt = () => {
    if (currentPromptIndex < openEndedPrompts.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    }
  };
  
  const goToPrevPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(prev => prev - 1);
    }
  };

  const hasNextPrompt = currentPromptIndex < openEndedPrompts.length - 1;
  const hasPrevPrompt = currentPromptIndex > 0;

  return {
    subcategory,
    openEndedPrompts,
    yesNoSometimesPrompts,
    currentPromptIndex,
    currentOpenEndedPrompt,
    goToNextPrompt,
    goToPrevPrompt,
    hasNextPrompt,
    hasPrevPrompt
  };
};
