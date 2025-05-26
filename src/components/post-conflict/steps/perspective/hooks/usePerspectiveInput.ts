
import { useState, useRef, RefObject } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UsePerspectiveInputResult {
  perspective: string;
  setPerspective: (text: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
  handleStarterClick: (starter: string) => void;
  validatePerspective: () => boolean;
  selectedStarter: string | undefined;
}

export const usePerspectiveInput = (): UsePerspectiveInputResult => {
  const { toast } = useToast();
  const [perspective, setPerspective] = useState<string>('');
  const [selectedStarter, setSelectedStarter] = useState<string | undefined>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle clicking on a sentence starter chip
  const handleStarterClick = (starter: string) => {
    setPerspective(starter);
    setSelectedStarter(starter);
    
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

  // Validate the perspective input
  const validatePerspective = (): boolean => {
    if (!perspective.trim()) {
      toast({
        title: "Empty perspective",
        description: "Please share your perspective before continuing.",
      });
      return false;
    }
    return true;
  };

  return {
    perspective,
    setPerspective,
    textareaRef,
    handleStarterClick,
    validatePerspective,
    selectedStarter,
  };
};
