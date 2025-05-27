
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';
import { useInterface } from '../useInterfaceContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../integrations/supabase/client';
import { PartnerStatus } from '../../contexts/InterfaceContext';

export const useOnboardingCompletion = (partnerStatus: PartnerStatus) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setPartnerStatus: updateGlobalPartnerStatus, setInterfaceStyle: updateGlobalInterfaceStyle } = useInterface();
  const { user } = useAuth();
  
  const completeOnboarding = async () => {
    console.log("🚀 Starting onboarding completion process...");
    
    try {
      // Update user metadata with their partner status choice
      if (user) {
        console.log(`📝 Updating user with partner status: ${partnerStatus}`);
        
        const { error: authError } = await supabase.auth.updateUser({
          data: {
            usage_mode: partnerStatus,
            onboarding_complete: true
          }
        });
        
        if (authError) {
          console.error("❌ Error updating auth user:", authError);
          throw authError;
        }
        
        // Also update the profile table
        const { error: profileError } = await supabase.from('profiles')
          .update({ 
            usage_mode: partnerStatus, 
            role: partnerStatus === 'couple' ? 'partner' : 'individual',
            onboarding_complete: true
          })
          .eq('id', user.id);
        
        if (profileError) {
          console.error("⚠️ Error updating profile:", profileError);
          // Don't throw here as this is not critical
        }
        
        console.log(`✅ Updated user metadata: usage_mode = ${partnerStatus}, onboarding_complete = true`);
      }

      // Save partner status to localStorage
      localStorage.setItem('bridge-partner-status', partnerStatus);
      console.log("💾 Saved partner status to localStorage");
      
      // Set default interface style
      updateGlobalInterfaceStyle('emotionally-reflective');
      console.log("🎨 Set interface style to emotionally-reflective");
      
      // Update global partner status
      updateGlobalPartnerStatus(partnerStatus);
      console.log("🤝 Updated global partner status");
      
      console.log("🏠 Navigating to homepage...");
      
      // Show success toast before navigation
      toast({
        title: "Welcome to Bridge!",
        description: "You're all set to start building better conversations.",
      });
      
      // Navigate to homepage
      navigate('/', { replace: true });
      console.log("✅ Navigation completed successfully");
      
    } catch (error) {
      console.error("💥 Error completing onboarding:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return { completeOnboarding };
};
