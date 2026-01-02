
import { useAuth } from '../../contexts/AuthContext';
import { SubscriptionService } from '@/services/subscriptionService';
import { useEffect } from 'react';

interface UseOnboardingActionsProps {
  step: number;
  partnerStatus: string;
  setStep: (step: number) => void;
  completeOnboarding: () => Promise<void>;
}

export const useOnboardingActions = ({
  step,
  partnerStatus,
  setStep,
  completeOnboarding
}: UseOnboardingActionsProps) => {
  const { user, relationship } = useAuth();
  
  // Auto-skip paywall in debug mode
  useEffect(() => {
    if (step === 3 && SubscriptionService.isDebugModeActive()) {
      console.log("🎯 Debug mode active - auto-skipping paywall");
      completeOnboarding();
    }
  }, [step]);
  
  const handleNextStep = () => {
    console.log(`📍 Current step: ${step}, moving to next step`);
    
    if (step === 2) {
      // From notifications, go to paywall
      console.log("🎯 Notification step complete - moving to paywall");
      setStep(3);
    } else if (step === 3) {
      // From paywall, complete onboarding
      console.log("🎯 Paywall step complete - completing onboarding");
      completeOnboarding();
    }
  };
  
  const handleSkipNotifications = () => {
    // Move to paywall after skipping notifications
    console.log("🎯 Notifications skipped - moving to paywall");
    setStep(3);
  };

  const handleSkipPaywall = () => {
    // Complete onboarding after skipping paywall
    console.log("🎯 Paywall skipped - completing onboarding");
    completeOnboarding();
  };
  
  // Legacy handlers kept for compatibility but simplified
  const handleAddPartner = () => {
    console.log("🎯 Partner invite moved to settings");
  };
  
  const handleBackFromPartnerInvite = () => {
    console.log("🎯 Partner invite no longer in onboarding flow");
  };
  
  const handlePartnerInviteComplete = async () => {
    console.log("🎯 Partner invite moved to settings");
    setStep(2);
  };
  
  return {
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete,
    handleSkipNotifications,
    handleSkipPaywall
  };
};
