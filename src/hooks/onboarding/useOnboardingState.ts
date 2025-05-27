
import { useState } from 'react';
import { PartnerStatus } from '../../contexts/InterfaceContext';

export const useOnboardingState = () => {
  const [step, setStep] = useState<number>(1); // Start with auth step
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerFlow, setIsPartnerFlow] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  
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
