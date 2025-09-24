
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/post-conflict/context/SessionContext';

export const useWorkThisOut = (onClose?: () => void, onReady?: () => void, onNeedTime?: () => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);
  const { 
    currentStep, 
    setCurrentStep, 
    sessionData, 
    handleResponse, 
    bothPartnersReady 
  } = useSession();
  
  const [flow, setFlow] = useState<'intro' | 'set-tone'>('intro');
  const [selectedIntent, setSelectedIntent] = useState<string>('');
  const [userPerspective, setUserPerspective] = useState<string>('');
  const [userUnderstanding, setUserUnderstanding] = useState<string>('');
  const [userNeeds, setUserNeeds] = useState<string>('');

  // Add effect to scroll to top whenever the currentStep changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Check if both partners have completed their responses
  const userCompleted = sessionData.partner1.ready && !sessionData.partner2.ready;

  // Handler functions
  const handleReadyClick = () => {
    setFlow('set-tone');
    setCurrentStep(1); // Move to the first screen after intro
    if (onReady) {
      onReady();
    }
  };
  
  const handleNeedTimeClick = () => {
    if (onNeedTime) {
      onNeedTime();
    } else {
      toast({
        title: "That's okay",
        description: "Take all the time you need. We're here when you're ready.",
      });
      if (onClose) {
        onClose();
      }
    }
  };

  const handleToneSelected = (intent: string) => {
    setSelectedIntent(intent);
    toast({
      title: "Intention set",
      description: "You've set the tone for your conversation.",
    });
    setCurrentStep(2); // Move to the emotional check-in step
  };

  const handleBackToIntro = () => {
    setFlow('intro');
    setCurrentStep(0); // Go back to the intro step
  };

  const handleEmotionalCheckComplete = () => {
    setCurrentStep(3); // Move to the perspective step
  };

  const handlePerspectiveComplete = (perspective: string) => {
    setUserPerspective(perspective);
    toast({
      title: "Perspective saved",
      description: "Thank you for sharing your perspective.",
    });
    setCurrentStep(4); // Move to the wish your partner understood step
  };
  
  const handleUnderstandingComplete = (understanding: string) => {
    setUserUnderstanding(understanding);
    toast({
      title: "Understanding saved",
      description: "Thank you for sharing what you wish your partner understood.",
    });
    setCurrentStep(5); // Move to the what do you need step
  };
  
  const handleNeedsComplete = (needs: string) => {
    setUserNeeds(needs);
    
    // Mark user as completed
    handleResponse('partner1', 'complete', {
      perspective: userPerspective,
      understanding: userUnderstanding,
      needs: needs,
      intent: selectedIntent
    });
    
    toast({
      title: "Responses saved",
      description: "Thank you for sharing what you need to move forward.",
    });
    
    setCurrentStep(6); // Move to the partner waiting state
  };

  // Partner responses would be handled through real-time sync in production

  return {
    isAnimating,
    setIsAnimating,
    currentStep,
    setCurrentStep,
    flow,
    setFlow,
    selectedIntent,
    setSelectedIntent,
    userPerspective,
    setUserPerspective,
    userUnderstanding,
    setUserUnderstanding,
    userNeeds,
    setUserNeeds,
    sessionData,
    bothPartnersReady,
    userCompleted,
    handleReadyClick,
    handleNeedTimeClick,
    handleToneSelected,
    handleBackToIntro,
    handleEmotionalCheckComplete,
    handlePerspectiveComplete,
    handleUnderstandingComplete,
    handleNeedsComplete
  };
};
