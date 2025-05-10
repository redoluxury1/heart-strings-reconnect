
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { SessionData, PartnerData } from '../context/SessionContext';

const initialSessionData: SessionData = {
  partner1: {
    responses: {},
    ready: false
  },
  partner2: {
    responses: {},
    ready: false
  }
};

export const useSessionManagement = () => {
  // Start with step 0 for the LetsTalkThis component, but will skip to step 1 when session starts
  const [currentStep, setCurrentStep] = useState(0); 
  const [sessionData, setSessionData] = useState<SessionData>(initialSessionData);
  const [partnerNotificationShown, setPartnerNotificationShown] = useState(false);
  const bothPartnersReady = sessionData.partner1.ready && sessionData.partner2.ready;

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
  };
  
  const handleRestart = () => {
    // Clear session storage
    sessionStorage.removeItem('letsTalkSession');
    
    // Reset to initial state
    setCurrentStep(0);
    setSessionData(initialSessionData);
    setPartnerNotificationShown(false);
    
    toast({
      title: "Starting new session",
      description: "Let's talk through something else.",
    });
  };

  return {
    sessionData,
    currentStep,
    setCurrentStep,
    handleResponse,
    bothPartnersReady,
    handleRestart
  };
};
