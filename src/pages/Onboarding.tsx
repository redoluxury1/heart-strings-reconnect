
import React from 'react';
import OnboardingScreen from '../components/onboarding/OnboardingScreen';
import OnboardingPartnerStatus from '../components/onboarding/OnboardingPartnerStatus';
import PartnerInvite from '../components/onboarding/PartnerInvite';
import OnboardingLoader from '../components/onboarding/OnboardingLoader';
import OnboardingContainer from '../components/onboarding/OnboardingContainer';
import OnboardingFeatures from '../components/onboarding/OnboardingFeatures';
import AuthForm from '../components/auth/AuthForm';
import { useOnboarding } from '../hooks/onboarding/useOnboarding';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Onboarding = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
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

  // If user is already authenticated and has completed onboarding, redirect to home
  useEffect(() => {
    if (!authLoading && user && user.user_metadata?.onboarding_complete) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  // Don't render the component until we've checked auth status
  if (loading || authLoading) {
    return <OnboardingLoader />;
  }

  // If user is not authenticated, show signup form
  if (!user) {
    return (
      <OnboardingContainer>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Create your account</h2>
          <AuthForm inviteToken={null} />
        </div>
      </OnboardingContainer>
    );
  }

  // If user is authenticated but hasn't completed onboarding, show onboarding steps
  return (
    <OnboardingContainer>
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
