
import { useAuth } from '../../contexts/AuthContext';
import { createRelationship } from '../../services/supabase';

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
    
    if (step === 2) {
      // From partner status step, check what the user selected
      if (partnerStatus === 'solo') {
        // Skip partner invite step and go directly to features intro
        setStep(4);
      } else {
        // Go to partner invite step for couple mode
        setStep(3);
      }
    } else if (step === 3) {
      // From partner invite step, go to features intro
      setStep(4);
    } else if (step === 4) {
      // From features intro, complete onboarding and navigate to homepage
      console.log("🎯 Step 4 complete - calling completeOnboarding");
      completeOnboarding();
    }
  };
  
  const handleAddPartner = () => {
    setStep(3); // Go to partner invite step
  };
  
  const handleBackFromPartnerInvite = () => {
    setStep(2); // Back to partner status step
  };
  
  const handlePartnerInviteComplete = async () => {
    // If the relationship doesn't exist yet, create it
    if (!relationship && user) {
      try {
        // Create a new relationship for this user
        await createRelationship(user.id);
      } catch (error) {
        console.error("Error creating relationship:", error);
      }
    }
    
    // Proceed to features intro step after inviting partner
    setStep(4);
  };
  
  return {
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete
  };
};
