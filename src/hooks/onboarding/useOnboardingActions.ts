
import { useAuth } from '../../contexts/AuthContext';

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
  
  const handleNextStep = () => {
    console.log(`📍 Current step: ${step}, moving to next step`);
    
    if (step === 1) {
      // From partner invite, go to notifications
      console.log("🎯 Partner invite complete - moving to notifications");
      setStep(2);
    } else if (step === 2) {
      // From notifications, go to paywall
      console.log("🎯 Notification step complete - moving to paywall");
      setStep(3);
    } else if (step === 3) {
      // From paywall, complete onboarding
      console.log("🎯 Paywall step complete - completing onboarding");
      completeOnboarding();
    }
  };
  
  const handleAddPartner = () => {
    // This function is no longer needed in the new flow
    // Partner invite is now step 1 for couples
    console.log("🎯 Partner invite already shown");
  };
  
  const handleBackFromPartnerInvite = () => {
    // Can't go back from partner invite in new flow
    console.log("🎯 Cannot go back from partner invite");
  };
  
  const handlePartnerInviteComplete = async () => {
    // Move to notifications after partner invite
    console.log("🎯 Partner invite complete - moving to notifications");
    setStep(2);
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
  
  return {
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete,
    handleSkipNotifications,
    handleSkipPaywall
  };
};
