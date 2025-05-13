
import { useState, useRef, RefObject } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseUnderstandingInputResult {
  understanding: string;
  setUnderstanding: (text: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
  handleStarterClick: (starter: string) => void;
  validateUnderstanding: () => boolean;
}

export const useUnderstandingInput = (): UseUnderstandingInputResult => {
  const { toast } = useToast();
  const [understanding, setUnderstanding] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle clicking on a sentence starter chip
  const handleStarterClick = (starter: string) => {
    setUnderstanding(starter);
    
    // Focus the textarea after selecting a starter
    if (textareaRef.current) {
      textareaRef.current.focus();
      
      // Position cursor at the end of the text
      const length = starter.length;
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 10);
    }
  };

  // Validate the understanding input
  const validateUnderstanding = (): boolean => {
    if (!understanding.trim()) {
      toast({
        title: "Empty field",
        description: "Please share what you wish your partner understood before continuing.",
      });
      return false;
    }
    return true;
  };

  return {
    understanding,
    setUnderstanding,
    textareaRef,
    handleStarterClick,
    validateUnderstanding,
  };
};
