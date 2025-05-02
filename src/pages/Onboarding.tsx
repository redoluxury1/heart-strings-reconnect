
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentContainer from '../components/common/ContentContainer';
import OnboardingWelcome from '../components/onboarding/OnboardingWelcome';
import OnboardingPartnerStatus from '../components/onboarding/OnboardingPartnerStatus';
import PartnerInvite from '../components/onboarding/PartnerInvite';
import { useToast } from '../hooks/use-toast';
import { useInterface } from '../hooks/useInterfaceContext';

export type PartnerStatus = 'solo' | 'couple';

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setPartnerStatus: updateGlobalPartnerStatus } = useInterface();
  const [step, setStep] = useState<number>(1);
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerInvited, setIsPartnerInvited] = useState(false);
  const [isPartnerFlow, setIsPartnerFlow] = useState(false);
  
  // Check if this is a partner flow (coming from invite)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const inviteToken = params.get('invite');
    if (inviteToken) {
      setIsPartnerFlow(true);
      setPartnerStatus('couple');
      // In a real app, we would validate the token
    }
  }, [location.search]);
  
  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Save preferences to localStorage
      localStorage.setItem('bridge-partner-status', partnerStatus);
      updateGlobalPartnerStatus(partnerStatus);
      
      // Notify user of success
      toast({
        title: "You're all set!",
        description: "Your preferences have been saved.",
      });
      
      // Navigate to home page
      navigate('/');
    }
  };
  
  const handleAddPartner = () => {
    setStep(3); // Go to partner invite step
  };
  
  const handleBackFromPartnerInvite = () => {
    setStep(2); // Back to partner status step
  };
  
  const handlePartnerInviteComplete = () => {
    setIsPartnerInvited(true);
    setStep(2);
    toast({
      title: "Partner invited",
      description: "Your partner will receive an invitation to join Bridge For Couples.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-blush">
      <ContentContainer className="max-w-xl">
        <div className="rounded-xl p-8 bg-white shadow-lg">
          {step === 1 && (
            <OnboardingWelcome 
              onContinue={handleNextStep}
            />
          )}
          
          {step === 2 && (
            <OnboardingPartnerStatus
              partnerStatus={partnerStatus}
              setPartnerStatus={setPartnerStatus}
              onContinue={handleNextStep}
              onAddPartner={handleAddPartner}
              isPartnerInvited={isPartnerInvited || isPartnerFlow}
            />
          )}
          
          {step === 3 && (
            <PartnerInvite
              onBack={handleBackFromPartnerInvite}
              onComplete={handlePartnerInviteComplete}
            />
          )}
        </div>
      </ContentContainer>
    </div>
  );
};

export default Onboarding;
