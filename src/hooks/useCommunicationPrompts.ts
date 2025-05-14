
import { useState, useEffect } from 'react';
import { communicationSubcategories, CommunicationSubcategoryData } from '@/data/communication-subcategories';

export const useCommunicationPrompts = (subcategoryId: string) => {
  const [subcategory, setSubcategory] = useState<CommunicationSubcategoryData | null>(null);
  const [openEndedPrompts, setOpenEndedPrompts] = useState<string[]>([]);
  const [yesNoSometimesPrompts, setYesNoSometimesPrompts] = useState<string[]>([]);

  useEffect(() => {
    const foundSubcategory = communicationSubcategories.find(sub => sub.id === subcategoryId);
    
    if (foundSubcategory) {
      setSubcategory(foundSubcategory);
      setOpenEndedPrompts(foundSubcategory.prompts.openEnded);
      setYesNoSometimesPrompts(foundSubcategory.prompts.yesNoSometimes);
    }
  }, [subcategoryId]);

  return {
    subcategory,
    openEndedPrompts,
    yesNoSometimesPrompts
  };
};
