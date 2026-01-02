
import { useState, useCallback } from 'react';
import { SessionData, PartnerData } from '../context/SessionContext';

const initialPartnerData: PartnerData = {
  responses: {},
  ready: false
};

const initialSessionData: SessionData = {
  partner1: { ...initialPartnerData },
  partner2: { ...initialPartnerData }
};

export const useSessionManagement = () => {
  const [sessionData, setSessionData] = useState<SessionData>(initialSessionData);
  const [currentStep, setCurrentStep] = useState(0);

  // Handle user responses
  const handleResponse = useCallback((partner: 'partner1' | 'partner2', stepId: string, response: any) => {
    setSessionData(prev => ({
      ...prev,
      [partner]: {
        ...prev[partner],
        responses: {
          ...prev[partner].responses,
          [stepId]: response
        },
        ready: stepId === 'complete'
      }
    }));
  }, []);

  // For solo mode, we don't need to check if "both" partners are ready
  // This can be used for future features but for now user just completes on their own
  const bothPartnersReady = false; // Always false for solo mode

  // Reset the session
  const handleRestart = useCallback(() => {
    setSessionData(initialSessionData);
    setCurrentStep(0);
  }, []);

  return {
    sessionData,
    currentStep,
    setCurrentStep,
    handleResponse,
    bothPartnersReady,
    handleRestart
  };
};
