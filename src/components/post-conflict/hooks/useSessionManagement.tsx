
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
  const [currentStep, setCurrentStep] = useState(0); 
  const [sessionData, setSessionData] = useState<SessionData>(initialSessionData);
  const [partnerNotificationShown, setPartnerNotificationShown] = useState(false);
  const bothPartnersReady = sessionData.partner1.ready && sessionData.partner2.ready;

  // Initialize from session storage if available - no artificial delay
  useEffect(() => {
    const savedSession = sessionStorage.getItem('letsTalkSession');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setSessionData(parsed);
        
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

  // Show notification when partner completes (userA already completed and userB just completed)
  useEffect(() => {
    if (sessionData.partner1.ready && sessionData.partner2.ready && !partnerNotificationShown) {
      toast({
        title: "Your partner has completed their side",
        description: "Your summary is ready to view.",
      });
      setPartnerNotificationShown(true);
      
      // Play notification sound
      const audio = new Audio('/notification-sound.mp3');
      audio.play().catch(error => {
        console.error("Could not play notification sound:", error);
      });
    }
  }, [sessionData.partner1.ready, sessionData.partner2.ready, partnerNotificationShown]);

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
    sessionStorage.removeItem('letsTalkSession');
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
