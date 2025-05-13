
import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import SetToneTool from './SetToneTool';
import WhereIsYourHeadAt from '@/components/post-conflict/steps/emotional-check-in/WhereIsYourHeadAt';
import YourPerspective from '@/components/post-conflict/steps/perspective/YourPerspective';
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
  const { currentStep, setCurrentStep } = useSession();
  const [flow, setFlow] = useState<'intro' | 'set-tone'>('intro');
  const [selectedIntent, setSelectedIntent] = useState<string>('');
  const [userPerspective, setUserPerspective] = useState<string>('');
  
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
    // Setting step 4 would be handled by the component itself
  };
  
  // Show the appropriate content based on current step
  const renderStepContent = () => {
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
        
      default:
        return <div>Loading...</div>;
    }
  };
  
  return renderStepContent();
};

export default LetsWorkThisOut;
