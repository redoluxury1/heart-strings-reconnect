
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
  const [sessionData, setSessionData] = useState<SessionData>(initialSessionData);
  const [currentStep, setCurrentStep] = useState(0);
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
    setSessionData(initialSessionData);
    
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
