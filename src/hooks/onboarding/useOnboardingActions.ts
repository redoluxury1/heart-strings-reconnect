
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
      // From notification permission, complete onboarding and go to home
      console.log("🎯 Notification step complete - calling completeOnboarding");
      completeOnboarding();
    }
  };
  
  const handleAddPartner = () => {
    // Not used in new flow
  };
  
  const handleBackFromPartnerInvite = () => {
    // Not used in new flow
  };
  
  const handlePartnerInviteComplete = async () => {
    // Not used in new flow
  };
  
  const handleSkipNotifications = () => {
    // Skip notifications and complete onboarding
    completeOnboarding();
  };
  
  return {
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete,
    handleSkipNotifications
  };
};
