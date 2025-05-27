
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';
import { PartnerStatus } from '../../contexts/InterfaceContext';

export const useOnboardingCompletion = (partnerStatus: PartnerStatus) => {
  const { user, updateUserMetadata } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const completeOnboarding = async () => {
    console.log("🎯 Completing onboarding process");
    
    if (!user) {
      console.error("No user found during onboarding completion");
      return;
    }
    
    try {
      // Update user metadata to mark onboarding as complete
      await updateUserMetadata({
        onboarding_complete: true,
        partner_status: partnerStatus,
        completed_at: new Date().toISOString()
      });
      
      toast({
        title: "Welcome to Bridge for Couples!",
        description: "Your account is ready. Let's start building stronger connections.",
      });
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Setup incomplete",
        description: "There was an issue completing your setup. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return { completeOnboarding };
};
