
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentContainer from '../components/common/ContentContainer';
import OnboardingWelcome from '../components/onboarding/OnboardingWelcome';
import OnboardingStyleSelector from '../components/onboarding/OnboardingStyleSelector';
import OnboardingPartnerStatus from '../components/onboarding/OnboardingPartnerStatus';
import PartnerInvite from '../components/onboarding/PartnerInvite';
import { useToast } from '../hooks/use-toast';
import { useInterface } from '../components/common/InterfaceProvider';

export type InterfaceStyle = 'emotionally-reflective' | 'solution-focused';
export type PartnerStatus = 'solo' | 'couple';

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setInterfaceStyle: updateGlobalInterfaceStyle, setPartnerStatus: updateGlobalPartnerStatus } = useInterface();
  const [step, setStep] = useState<number>(1);
  const [interfaceStyle, setInterfaceStyle] = useState<InterfaceStyle>('emotionally-reflective');
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerInvited, setIsPartnerInvited] = useState(false);
  const [isPartnerFlow, setIsPartnerFlow] = useState(false);
  
  // Check if this is a partner flow (coming from invite)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const inviteToken = params.get('invite');
    if (inviteToken) {
      setIsPartnerFlow(true);
      // In a real app, we would validate the token
    }
  }, [location.search]);

  // Update interface style both locally and globally
  const handleInterfaceStyleChange = (style: InterfaceStyle) => {
    setInterfaceStyle(style);
    updateGlobalInterfaceStyle(style);
  };
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save preferences to localStorage
      localStorage.setItem('bridge-interface-style', interfaceStyle);
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
    setStep(4); // Go to partner invite step
  };
  
  const handleBackFromPartnerInvite = () => {
    setStep(3); // Back to partner status step
  };
  
  const handlePartnerInviteComplete = () => {
    setIsPartnerInvited(true);
    setStep(3);
    toast({
      title: "Partner invited",
      description: "Your partner will receive an invitation to join Bridge For Couples.",
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      interfaceStyle === 'emotionally-reflective' ? 'bg-soft-blush' : 'bg-[#6a8cb3]'
    }`}>
      <ContentContainer className="max-w-xl">
        <div className={`rounded-xl p-8 ${
          interfaceStyle === 'emotionally-reflective' ? 'bg-white shadow-lg' : 'bg-gray-900 text-white shadow-xl'
        }`}>
          {step === 1 && (
            <OnboardingWelcome 
              interfaceStyle={interfaceStyle}
              onContinue={handleNextStep}
            />
          )}
          
          {step === 2 && (
            <OnboardingStyleSelector
              interfaceStyle={interfaceStyle}
              setInterfaceStyle={handleInterfaceStyleChange}
              onContinue={handleNextStep}
            />
          )}
          
          {step === 3 && (
            <OnboardingPartnerStatus
              interfaceStyle={interfaceStyle}
              partnerStatus={partnerStatus}
              setPartnerStatus={setPartnerStatus}
              onContinue={handleNextStep}
              onAddPartner={handleAddPartner}
              isPartnerInvited={isPartnerInvited || isPartnerFlow}
            />
          )}
          
          {step === 4 && (
            <PartnerInvite
              interfaceStyle={interfaceStyle}
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
