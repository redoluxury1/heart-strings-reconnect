
import { useState, useEffect } from 'react';
import { PartnerStatus } from '../../contexts/InterfaceContext';

export const useOnboardingState = () => {
  const [step, setStep] = useState<number>(1); // Start with notifications screen
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerFlow, setIsPartnerFlow] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  
  // Check for signup mode from localStorage
  useEffect(() => {
    const signupMode = localStorage.getItem('signupMode');
    if (signupMode === 'partner') {
      setPartnerStatus('couple');
      setIsPartnerFlow(true);
    } else if (signupMode === 'solo') {
      setPartnerStatus('solo');
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
