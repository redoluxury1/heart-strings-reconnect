
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
      // Save partner status to localStorage first
      localStorage.setItem('bridge-partner-status', partnerStatus);
      console.log("💾 Saved partner status to localStorage");
      
      // Set default interface style
      updateGlobalInterfaceStyle('emotionally-reflective');
      console.log("🎨 Set interface style to emotionally-reflective");
      
      // Update global partner status
      updateGlobalPartnerStatus(partnerStatus);
      console.log("🤝 Updated global partner status");

      // Update user metadata with their partner status choice (but don't block navigation on this)
      if (user) {
        console.log(`📝 Updating user with partner status: ${partnerStatus}`);
        
        // Do this asynchronously without awaiting
        supabase.auth.updateUser({
          data: {
            usage_mode: partnerStatus,
            onboarding_complete: true
          }
        }).then(({ error: authError }) => {
          if (authError) {
            console.error("❌ Error updating auth user:", authError);
          } else {
            console.log(`✅ Updated user metadata: usage_mode = ${partnerStatus}, onboarding_complete = true`);
          }
        });
        
        // Also update the profile table asynchronously
        supabase.from('profiles')
          .update({ 
            usage_mode: partnerStatus, 
            role: partnerStatus === 'couple' ? 'partner' : 'individual',
            onboarding_complete: true
          })
          .eq('id', user.id)
          .then(({ error: profileError }) => {
            if (profileError) {
              console.error("⚠️ Error updating profile:", profileError);
            }
          });
      }
      
      console.log("🏠 Navigating to homepage...");
      
      // Show success toast
      toast({
        title: "Welcome to Bridge!",
        description: "You're all set to start building better conversations.",
      });
      
      // Navigate immediately without waiting for database updates
      navigate('/', { replace: true });
      console.log("✅ Navigation completed successfully");
      
    } catch (error) {
      console.error("💥 Error completing onboarding:", error);
      
      // Even if there's an error, try to navigate anyway
      console.log("🔄 Attempting navigation despite error...");
      navigate('/', { replace: true });
      
      toast({
        title: "Welcome to Bridge!",
        description: "You're all set to start exploring.",
      });
    }
  };
  
  return { completeOnboarding };
};
