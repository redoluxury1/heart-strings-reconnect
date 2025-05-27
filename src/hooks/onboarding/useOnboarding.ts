
import { useOnboardingState } from './useOnboardingState';
import { useOnboardingEffects } from './useOnboardingEffects';
import { useOnboardingCompletion } from './useOnboardingCompletion';
import { useOnboardingActions } from './useOnboardingActions';

export const useOnboarding = () => {
  const {
    step,
    setStep,
    partnerStatus,
    setPartnerStatus,
    isPartnerFlow,
    setIsPartnerFlow,
    inviteToken,
    setInviteToken
  } = useOnboardingState();
  
  const { loading } = useOnboardingEffects({
    setIsPartnerFlow,
    setPartnerStatus,
    setInviteToken,
    inviteToken
  });
  
  const { completeOnboarding } = useOnboardingCompletion(partnerStatus);
  
  const {
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete
  } = useOnboardingActions({
    step,
    partnerStatus,
    setStep,
    completeOnboarding
  });
  
  return {
    loading,
    step,
    partnerStatus,
    setPartnerStatus,
    isPartnerFlow,
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete
  };
};
