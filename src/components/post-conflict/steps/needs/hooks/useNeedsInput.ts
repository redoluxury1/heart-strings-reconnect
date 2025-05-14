
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useNeedsInput = () => {
  const [needs, setNeeds] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Function to handle sentence starter click
  const handleStarterClick = (text: string) => {
    setNeeds(text);
    
    // Focus the textarea after inserting text
    if (textareaRef.current) {
      textareaRef.current.focus();
      
      // Place cursor at end of text
      const length = text.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  };

  // Function to validate the needs input
  const validateNeeds = (): boolean => {
    if (!needs.trim()) {
      toast({
        title: "Please share what you need",
        description: "This helps your partner understand how to support you",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  return {
    needs,
    setNeeds,
    textareaRef,
    handleStarterClick,
    validateNeeds,
  };
};
