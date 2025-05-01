
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GroundingStep from './steps/GroundingStep';
import ToneSettingStep from './steps/ToneSettingStep';
import PerspectiveStep from './steps/PerspectiveStep';
import EmotionalCheckIn from './steps/EmotionalCheckIn';
import NeedsRepairStep from './steps/NeedsRepairStep';
import ConnectionPromptStep from './steps/ConnectionPromptStep';
import EndSessionStep from './steps/EndSessionStep';
import { toast } from '@/hooks/use-toast';

interface LetsTalkSessionProps {
  onExit: () => void;
}

const LetsTalkSession: React.FC<LetsTalkSessionProps> = ({ onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionData, setSessionData] = useState<Record<string, any>>({
    partner1: {
      responses: {},
      ready: false
    },
    partner2: {
      responses: {},
      ready: false
    }
  });
  
  // Initialize from session storage if available
  useEffect(() => {
    const savedSession = sessionStorage.getItem('letsTalkSession');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setSessionData(parsed);
        
        // If we have data, let's set the step to where they left off
        if (parsed.currentStep !== undefined) {
          setCurrentStep(parsed.currentStep);
        }
      } catch (error) {
        console.error("Error parsing saved session:", error);
      }
    }
  }, []);
  
  // Save to session storage when data changes
  useEffect(() => {
    sessionStorage.setItem('letsTalkSession', JSON.stringify({
      ...sessionData,
      currentStep
    }));
  }, [sessionData, currentStep]);
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      
      // Reset partner ready states for the new step
      setSessionData(prev => ({
        ...prev,
        partner1: { ...prev.partner1, ready: false },
        partner2: { ...prev.partner2, ready: false }
      }));
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleResponse = (partner: 'partner1' | 'partner2', stepId: string, response: any) => {
    setSessionData(prev => ({
      ...prev,
      [partner]: {
        ...prev[partner],
        responses: {
          ...prev[partner].responses,
          [stepId]: response
        },
        ready: true
      }
    }));
    
    // Simulate partner 2 response (In a real app, this would come from the other user)
    if (partner === 'partner1') {
      setTimeout(() => {
        setSessionData(prev => ({
          ...prev,
          partner2: {
            ...prev.partner2,
            ready: true
          }
        }));
        
        toast({
          title: "Partner ready",
          description: "Your partner has completed this step.",
        });
      }, 3000);
    }
  };
  
  const handleRestart = () => {
    // Clear session storage
    sessionStorage.removeItem('letsTalkSession');
    
    // Reset to initial state
    setCurrentStep(0);
    setSessionData({
      partner1: {
        responses: {},
        ready: false
      },
      partner2: {
        responses: {},
        ready: false
      }
    });
    
    toast({
      title: "Starting new session",
      description: "Let's talk through something else.",
    });
  };
  
  const bothPartnersReady = sessionData.partner1.ready && sessionData.partner2.ready;
  
  const steps = [
    {
      id: 'grounding',
      component: <GroundingStep 
        onResponse={(response) => handleResponse('partner1', 'grounding', response)} 
        onExit={onExit}
        onNext={handleNextStep}
      />
    },
    {
      id: 'tone',
      component: <ToneSettingStep 
        onResponse={(response) => handleResponse('partner1', 'tone', response)}
        partner1Response={sessionData.partner1.responses.tone}
        partner2Response={sessionData.partner2.ready ? "I want to listen more and react less" : null}
      />
    },
    {
      id: 'perspective',
      component: <PerspectiveStep 
        onResponse={(response) => handleResponse('partner1', 'perspective', response)}
        partner1Response={sessionData.partner1.responses.perspective}
        partner2Response={sessionData.partner2.ready ? "I felt like you weren't listening to me when I tried to explain how I was feeling." : null}
      />
    },
    {
      id: 'emotions',
      component: <EmotionalCheckIn 
        onResponse={(response) => handleResponse('partner1', 'emotions', response)}
        selectedEmotions={sessionData.partner1.responses.emotions}
        partner2Emotions={sessionData.partner2.ready ? ["hurt", "misunderstood", "frustrated"] : null}
      />
    },
    {
      id: 'needs',
      component: <NeedsRepairStep 
        onResponse={(response) => handleResponse('partner1', 'needs', response)}
        partner1Response={sessionData.partner1.responses.needs}
        partner2Response={sessionData.partner2.ready ? "I need reassurance that we can talk about difficult topics without things escalating." : null}
      />
    },
    {
      id: 'connection',
      component: <ConnectionPromptStep 
        onResponse={(response) => handleResponse('partner1', 'connection', response)}
        partner1Response={sessionData.partner1.responses.connection}
        partner2Response={sessionData.partner2.ready ? "I appreciate how you always try to make things right, even when it's hard." : null}
      />
    },
    {
      id: 'end',
      component: <EndSessionStep onSendLoveNote={onExit} />
    }
  ];
  
  steps[steps.length - 1] = {
    id: 'end',
    component: <EndSessionStep onSendLoveNote={onExit} onRestart={handleRestart} />
  };
  
  const currentStepContent = steps[currentStep].component;
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Progress indicator */}
      <div className="bg-gray-100 h-1 w-full">
        <div 
          className="bg-blue-500 h-1 transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
      
      <div className="p-6 md:p-8">
        {currentStepContent}
        
        {/* Navigation buttons */}
        {currentStep < steps.length - 1 && currentStep > 0 && (
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </Button>
            )}
            
            <div className="ml-auto">
              {bothPartnersReady && (
                <Button 
                  onClick={handleNextStep}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LetsTalkSession;
