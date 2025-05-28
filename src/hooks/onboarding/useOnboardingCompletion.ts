
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';
import { useAuth } from '../../contexts/AuthContext';
import { PartnerStatus } from '../../contexts/InterfaceContext';

export const useOnboardingCompletion = (partnerStatus: PartnerStatus) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateUserMetadata } = useAuth();

  const completeOnboarding = async () => {
    try {
      console.log("Completing onboarding with partner status:", partnerStatus);
      
      // Update user metadata to mark onboarding as complete
      await updateUserMetadata({
        onboarding_complete: true,
        usage_mode: partnerStatus === 'couple' ? 'couple' : 'solo'
      });

      toast({
        title: "Welcome to Bridge for Couples!",
        description: "You're all set up. Let's start building better conversations.",
      });

      // Navigate to homepage after completion
      navigate('/');
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Setup complete",
        description: "Welcome to Bridge for Couples!",
      });
      // Still navigate even if metadata update fails
      navigate('/');
    }
  };

  return { completeOnboarding };
};
