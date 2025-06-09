
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
      // From notification permission, go to partner status selection
      console.log("🎯 Notification step complete - moving to partner status");
      setStep(2);
    } else if (step === 2) {
      // From partner status selection
      if (partnerStatus === 'solo') {
        // Complete onboarding for solo users
        console.log("🎯 Solo user - completing onboarding");
        completeOnboarding();
      } else {
        // For couples, complete onboarding (they can invite partner later from home)
        console.log("🎯 Couple user - completing onboarding");
        completeOnboarding();
      }
    } else if (step === 3) {
      // From partner invite, complete onboarding
      console.log("🎯 Partner invite complete - completing onboarding");
      completeOnboarding();
    }
  };
  
  const handleAddPartner = () => {
    // Move to partner invite step
    setStep(3);
  };
  
  const handleBackFromPartnerInvite = () => {
    // Go back to partner status selection
    setStep(2);
  };
  
  const handlePartnerInviteComplete = async () => {
    // Complete onboarding after sending invite
    completeOnboarding();
  };
  
  const handleSkipNotifications = () => {
    // Skip notifications and go to partner status
    setStep(2);
  };
  
  return {
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete,
    handleSkipNotifications
  };
};
