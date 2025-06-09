
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../use-toast';
import { createRelationship } from '../../services/supabase';

export const useOnboardingCompletion = (partnerStatus: string) => {
  const navigate = useNavigate();
  const { user, updateUserMetadata } = useAuth();
  const { toast } = useToast();
  
  const completeOnboarding = async () => {
    if (!user) return;
    
    try {
      console.log("🎯 Completing onboarding for user:", user.id, "with partner status:", partnerStatus);
      
      // Create relationship record if user chose couple mode
      if (partnerStatus === 'couple') {
        console.log("Creating relationship for couple mode");
        await createRelationship(user.id);
      }
      
      // Update user metadata to mark onboarding as complete
      await updateUserMetadata({
        onboarding_complete: true,
        partner_status: partnerStatus
      });
      
      toast({
        title: "Welcome to Bridge for Couples!",
        description: "Your account has been set up successfully."
      });
      
      // Navigate to home
      navigate('/');
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Setup Error",
        description: "There was a problem setting up your account. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return { completeOnboarding };
};
