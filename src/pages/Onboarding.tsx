
import React from 'react';
import OnboardingScreen from '../components/onboarding/OnboardingScreen';
import OnboardingPartnerStatus from '../components/onboarding/OnboardingPartnerStatus';
import PartnerInvite from '../components/onboarding/PartnerInvite';
import OnboardingLoader from '../components/onboarding/OnboardingLoader';
import OnboardingContainer from '../components/onboarding/OnboardingContainer';
import OnboardingFeatures from '../components/onboarding/OnboardingFeatures';
import { useOnboarding } from '../hooks/onboarding/useOnboarding';

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
        <OnboardingScreen />
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

      {step === 4 && (
        <OnboardingFeatures
          onContinue={handleNextStep}
        />
      )}
    </OnboardingContainer>
  );
};

export default Onboarding;
