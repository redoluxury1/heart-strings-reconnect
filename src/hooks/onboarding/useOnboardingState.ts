
import { useState, useEffect } from 'react';
import { PartnerStatus } from '../../contexts/InterfaceContext';

export const useOnboardingState = () => {
  const [step, setStep] = useState<number>(1);
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerFlow, setIsPartnerFlow] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  
  // Check for signup mode from localStorage and set initial step
  useEffect(() => {
    const signupMode = localStorage.getItem('signupMode');
    if (signupMode === 'couple') {
      setPartnerStatus('couple');
      setIsPartnerFlow(true);
      setStep(1); // Start with partner invite for couples
    } else if (signupMode === 'solo') {
      setPartnerStatus('solo');
      setStep(2); // Start with notifications for solo users
    }
    // Clean up the signup mode from localStorage
    localStorage.removeItem('signupMode');
  }, []);
  
  return {
    step,
    setStep,
    partnerStatus,
    setPartnerStatus,
    isPartnerFlow,
    setIsPartnerFlow,
    inviteToken,
    setInviteToken
  };
};
