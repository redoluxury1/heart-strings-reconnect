
import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import SetToneTool from './SetToneTool';
import WhereIsYourHeadAt from '@/components/post-conflict/steps/emotional-check-in/WhereIsYourHeadAt';
import YourPerspective from '@/components/post-conflict/steps/perspective/YourPerspective';
import WishPartnerUnderstood from '@/components/post-conflict/steps/partner-understanding/WishPartnerUnderstood';
import WhatDoYouNeed from '@/components/post-conflict/steps/needs/WhatDoYouNeed';
import PartnerWaitingState from '@/components/post-conflict/steps/final/PartnerWaitingState';
import ReflectionSummary from '@/components/post-conflict/steps/summary/ReflectionSummary';
import { useSession } from '@/components/post-conflict/context/SessionContext';

interface LetsWorkThisOutProps {
  onClose?: () => void;
  onReady?: () => void;
  onNeedTime?: () => void;
}

const LetsWorkThisOut: React.FC<LetsWorkThisOutProps> = ({ 
  onClose, 
  onReady, 
  onNeedTime 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);
  const { currentStep, setCurrentStep, sessionData, handleResponse, bothPartnersReady } = useSession();
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

  // Set mock data for partner2 for demo purposes
  useEffect(() => {
    // This is just for demonstration - in a real app, this would be handled by the actual partner
    if (sessionData.partner1.ready && currentStep === 6) {
      // Simulate partner completing their responses after a delay
      const timer = setTimeout(() => {
        handleResponse('partner2', 'complete', {
          perspective: "I felt like we weren't really listening to each other. I was trying to explain my feelings but it seemed like we were talking past each other.",
          understanding: "I wish you understood that sometimes I need time to process before discussing things. When I'm pushed to respond immediately, I get defensive.",
          needs: "I need us to set aside dedicated time for important conversations when we're both calm and can really listen.",
          intent: "Let's work through this together"
        });
      }, 5000); // 5 second delay for demo purposes
      
      return () => clearTimeout(timer);
    }
  }, [sessionData.partner1.ready, currentStep, handleResponse]);
  
  // Show the appropriate content based on current step
  const renderStepContent = () => {
    // If both partners are ready, show the summary screen
    if (bothPartnersReady) {
      return <ReflectionSummary />;
    }
    
    switch (currentStep) {
      case 0: // Intro - ready check
        return (
          <div className="bg-[#FDFBF9] rounded-xl border border-[#D7B4A8] shadow-sm p-6 max-w-xl mx-auto">
            <div className="flex flex-col items-center">
              {/* Icon with animation */}
              <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
                <Compass 
                  className={`h-7 w-7 text-[#D3876A] ${isAnimating ? 'animate-rotate-compass' : ''}`} 
                  onAnimationEnd={() => setIsAnimating(false)}
                />
              </div>
              
              {/* Header */}
              <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-4 text-center">
                Let's Work This Out
              </h2>
              
              {/* Body Paragraphs */}
              <div className="text-center space-y-4 mb-6">
                <p className="text-[#3A3A3A] leading-[1.6]">
                  This is a space to reflect on what just happened—privately and honestly.
                </p>
                <p className="text-[#3A3A3A] leading-[1.6]">
                  You'll answer a few questions about how it felt for you. Your partner will do the same. When you're both done, we'll gently show where you align—and where to grow.
                </p>
              </div>
              
              {/* Primary CTA */}
              <Button 
                className="rounded-full bg-[#C47463] hover:bg-[#C47463]/90 text-white font-medium py-3 px-6 mt-6 w-full max-w-md"
                onClick={handleReadyClick}
              >
                Yes — I'm ready to move forward
              </Button>
              
              {/* Secondary CTA */}
              <Button 
                variant="outline" 
                className="rounded-full border-[1.5px] border-[#C47463] text-[#C47463] font-normal py-3 px-6 mt-3 hover:bg-[#C47463]/10 hover:text-[#C47463] bg-transparent w-full max-w-md"
                onClick={handleNeedTimeClick}
              >
                No — I need more time to decompress
              </Button>
            </div>
          </div>
        );
        
      case 1: // Set tone
        return <SetToneTool onComplete={handleToneSelected} onBack={handleBackToIntro} />;
        
      case 2: // Emotional check-in
        return <WhereIsYourHeadAt onComplete={handleEmotionalCheckComplete} />;
        
      case 3: // Your perspective
        return <YourPerspective onComplete={handlePerspectiveComplete} />;
      
      case 4: // What do you wish your partner understood
        return <WishPartnerUnderstood onComplete={handleUnderstandingComplete} />;
      
      case 5: // What do you need to move forward
        return <WhatDoYouNeed onComplete={handleNeedsComplete} />;
        
      case 6: // Partner waiting state
        return <PartnerWaitingState />;
        
      default:
        return <div>Loading...</div>;
    }
  };
  
  return renderStepContent();
};

export default LetsWorkThisOut;
