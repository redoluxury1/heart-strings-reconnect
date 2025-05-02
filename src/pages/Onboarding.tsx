
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentContainer from '../components/common/ContentContainer';
import OnboardingWelcome from '../components/onboarding/OnboardingWelcome';
import OnboardingStyleSelector from '../components/onboarding/OnboardingStyleSelector';
import OnboardingPartnerStatus from '../components/onboarding/OnboardingPartnerStatus';
import { useToast } from '../hooks/use-toast';
import { useInterface } from '../components/common/InterfaceProvider';

export type InterfaceStyle = 'emotionally-reflective' | 'solution-focused';
export type PartnerStatus = 'solo' | 'couple';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setInterfaceStyle: updateGlobalInterfaceStyle } = useInterface();
  const [step, setStep] = useState<number>(1);
  const [interfaceStyle, setInterfaceStyle] = useState<InterfaceStyle>('emotionally-reflective');
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  
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
      
      // Notify user of success
      toast({
        title: "You're all set!",
        description: "Your preferences have been saved.",
      });
      
      // Navigate to home page
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      interfaceStyle === 'emotionally-reflective' ? 'bg-soft-blush' : 'bg-[#90A3B0]'
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
            />
          )}
        </div>
      </ContentContainer>
    </div>
  );
};

export default Onboarding;
