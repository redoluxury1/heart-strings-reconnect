
import React from 'react';
import OnboardingContainer from '../components/onboarding/OnboardingContainer';
import OnboardingLoader from '../components/onboarding/OnboardingLoader';
import NotificationPermissionScreen from '../components/onboarding/NotificationPermissionScreen';
import PartnerInvite from '../components/onboarding/PartnerInvite';
import OnboardingPaywall from '../components/onboarding/OnboardingPaywall';
import { useOnboarding } from '../hooks/onboarding/useOnboarding';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getPostOnboardingRedirect, clearPostOnboardingRedirect } from '@/utils/redirectStorage';
import { isOnboardingBypassEnabled } from '@/utils/debugBypass';

const Onboarding = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const {
    loading,
    step,
    partnerStatus,
    handleNextStep,
    handlePartnerInviteComplete,
    handleSkipNotifications,
    handleSkipPaywall
  } = useOnboarding();

  // If user is already authenticated and has completed onboarding, redirect to stored destination or home
  useEffect(() => {
    if (!authLoading && user && user.user_metadata?.onboarding_complete) {
      console.log("User has completed onboarding, redirecting");
      const redirectTo = getPostOnboardingRedirect();
      clearPostOnboardingRedirect();
      navigate(redirectTo || '/');
    }
  }, [user, authLoading, navigate]);

  // Redirect to auth if not authenticated (unless bypass enabled)
  useEffect(() => {
    if (!authLoading && !user) {
      if (isOnboardingBypassEnabled()) {
        console.log("Onboarding bypass enabled, redirecting to home");
        navigate('/');
        return;
      }
      console.log("User not authenticated, redirecting to signup-choice");
      navigate('/signup-choice');
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
          partnerStatus={partnerStatus}
        />
      )}

      {step === 3 && (
        <OnboardingPaywall
          onContinue={handleNextStep}
          onSkip={handleSkipPaywall}
        />
      )}

      {/* Fallback for unexpected states */}
      {step === 1 && partnerStatus === 'solo' && (
        <NotificationPermissionScreen
          onContinue={handleNextStep}
          onSkip={handleSkipNotifications}
          partnerStatus={partnerStatus}
        />
      )}
    </OnboardingContainer>
  );
};

export default Onboarding;
