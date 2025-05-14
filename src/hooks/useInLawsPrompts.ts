
import { useState } from 'react';
import { inLawsSubcategories } from '@/data/in-laws-subcategories';

export const useInLawsPrompts = (subcategoryId: string) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  
  const subcategory = inLawsSubcategories.find(sub => sub.id === subcategoryId);
  
  const openEndedPrompts = subcategory?.prompts.openEnded || [];
  const yesNoSometimesPrompts = subcategory?.prompts.yesNoSometimes || [];
  
  const goToNextPrompt = () => {
    setCurrentPromptIndex((prev) => {
      if (prev < openEndedPrompts.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  };
  
  const goToPrevPrompt = () => {
    setCurrentPromptIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };
  
  const currentOpenEndedPrompt = openEndedPrompts[currentPromptIndex] || '';
  
  return {
    subcategory,
    currentPromptIndex,
    openEndedPrompts,
    yesNoSometimesPrompts,
    currentOpenEndedPrompt,
    goToNextPrompt,
    goToPrevPrompt,
    hasNextPrompt: currentPromptIndex < openEndedPrompts.length - 1,
    hasPrevPrompt: currentPromptIndex > 0
  };
};
