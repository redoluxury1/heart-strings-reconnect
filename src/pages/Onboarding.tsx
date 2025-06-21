
import React from 'react';
import OnboardingContainer from '../components/onboarding/OnboardingContainer';
import OnboardingLoader from '../components/onboarding/OnboardingLoader';
import NotificationPermissionScreen from '../components/onboarding/NotificationPermissionScreen';
import PartnerInvite from '../components/onboarding/PartnerInvite';
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
    handleNextStep,
    handlePartnerInviteComplete,
    handleSkipNotifications
  } = useOnboarding();

  // If user is already authenticated and has completed onboarding, redirect to home
  useEffect(() => {
    if (!authLoading && user && user.user_metadata?.onboarding_complete) {
      console.log("User has completed onboarding, redirecting to home");
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      console.log("User not authenticated, redirecting to intro");
      navigate('/intro');
    }
  }, [user, authLoading, navigate]);

  // Show loading while we're checking auth status or onboarding is loading
  if (loading || authLoading) {
    return <OnboardingLoader />;
  }

  // Only show onboarding if user is authenticated
  if (!user) {
    return <OnboardingLoader />;
  }

  console.log("User authenticated, showing onboarding step:", step, "Partner status:", partnerStatus);
  
  return (
    <OnboardingContainer>
      {step === 1 && partnerStatus === 'couple' && (
        <PartnerInvite
          onBack={() => {}} // No back option in new flow
          onComplete={handlePartnerInviteComplete}
        />
      )}
      
      {step === 2 && (
        <NotificationPermissionScreen
          onContinue={handleNextStep}
          onSkip={handleSkipNotifications}
        />
      )}
    </OnboardingContainer>
  );
};

export default Onboarding;
