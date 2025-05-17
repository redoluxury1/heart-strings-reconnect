
import React from 'react';
import OnboardingWelcome from '../components/onboarding/OnboardingWelcome';
import OnboardingPartnerStatus from '../components/onboarding/OnboardingPartnerStatus';
import PartnerInvite from '../components/onboarding/PartnerInvite';
import OnboardingLoader from '../components/onboarding/OnboardingLoader';
import OnboardingContainer from '../components/onboarding/OnboardingContainer';
import { useOnboarding } from '../hooks/useOnboarding';

const Onboarding = () => {
  const {
    loading,
    step,
    partnerStatus,
    setPartnerStatus,
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete
  } = useOnboarding();

  // Don't render the component until we've checked auth status
  if (loading) {
    return <OnboardingLoader />;
  }

  return (
    <OnboardingContainer>
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
        />
      )}
      
      {step === 3 && (
        <PartnerInvite
          onBack={handleBackFromPartnerInvite}
          onComplete={handlePartnerInviteComplete}
        />
      )}
    </OnboardingContainer>
  );
};

export default Onboarding;
