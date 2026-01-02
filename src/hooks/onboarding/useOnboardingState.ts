
import { useState, useEffect } from 'react';
import { PartnerStatus } from '../../contexts/InterfaceContext';

export const useOnboardingState = () => {
  const [step, setStep] = useState<number>(2); // Start at notifications (skip partner invite)
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerFlow, setIsPartnerFlow] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  
  // All users now go through simplified solo flow
  useEffect(() => {
    // Clean up any leftover signup mode from localStorage
    localStorage.removeItem('signupMode');
    
    // Always start at step 2 (notifications) for all users
    console.log("🎯 Setting up streamlined solo flow - starting at step 2 (notifications)");
    setPartnerStatus('solo');
    setStep(2);
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
