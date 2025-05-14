
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { SubcategoryData } from '@/data/money-subcategories';

interface ResponseData {
  [promptId: string]: {
    response: string;
    sent: boolean;
  }
}

export const useMoneyPrompts = (subcategoryId: string, subcategory: SubcategoryData | undefined) => {
  // State for tracking responses to each prompt
  const [responses, setResponses] = useState<ResponseData>({});

  // Handle text input change
  const handleOpenResponseChange = (promptIndex: number, value: string) => {
    const promptId = `${subcategoryId}-${promptIndex}`;
    setResponses(prev => ({
      ...prev,
      [promptId]: {
        ...prev[promptId],
        response: value,
        sent: false
      }
    }));
  };

  // Handle yes/no/sometimes selection
  const handleMultiChoiceSelect = (promptIndex: number, value: string) => {
    const promptId = `${subcategoryId}-${promptIndex}`;
    setResponses(prev => ({
      ...prev,
      [promptId]: {
        ...prev[promptId],
        response: value,
        sent: true
      }
    }));
    
    // Show toast notification for multiple choice responses
    toast({
      title: "Response saved",
      description: "Your answer has been recorded."
    });
  };

  // Handle sending a response
  const handleSendResponse = (promptIndex: number) => {
    const promptId = `${subcategoryId}-${promptIndex}`;
    const response = responses[promptId]?.response;
    
    if (!response || response.trim() === '') {
      toast({
        title: "Empty response",
        description: "Please write a response before sending.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, here we would send the response to the partner
    setResponses(prev => ({
      ...prev,
      [promptId]: {
        ...prev[promptId],
        sent: true
      }
    }));
    
    // Show confirmation toast
    toast({
      title: "Response sent",
      description: "Your response has been sent to your partner."
    });
  };

  // Split prompts by type if subcategory exists
  const prompts = subcategory?.prompts || [];
  const openEndedPrompts = prompts.filter(prompt => prompt.type === 'open-ended');
  const yesNoPrompts = prompts.filter(prompt => prompt.type === 'yes-no');

  return {
    responses,
    openEndedPrompts,
    yesNoPrompts,
    handleOpenResponseChange,
    handleMultiChoiceSelect,
    handleSendResponse
  };
};
