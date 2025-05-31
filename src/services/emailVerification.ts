
import { supabase } from '@/integrations/supabase/client';

export const sendVerificationEmail = async (email: string, name?: string, userId?: string): Promise<boolean> => {
  try {
    console.log("=== SENDING VERIFICATION EMAIL ===");
    console.log("Email:", email, "Name:", name, "UserID:", userId);
    
    let targetUserId = userId;
    
    // If no userId provided, try to get current user
    if (!targetUserId) {
      console.log("No userId provided, getting current user");
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log("Current user result:", { hasUser: !!user, error: userError });
      
      if (user) {
        targetUserId = user.id;
      } else {
        // Try session as fallback
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("Session result:", { hasSession: !!session, error: sessionError });
        
        if (session?.user) {
          targetUserId = session.user.id;
        }
      }
    }

    if (!targetUserId) {
      console.error("No user ID found");
      return false;
    }

    console.log("Using user ID:", targetUserId);

    // Call the simplified edge function
    const { data, error } = await supabase.functions.invoke('send-verification-email', {
      body: { 
        email, 
        name,
        userId: targetUserId
      }
    });

    console.log("Edge function response:", { data, error });

    if (error) {
      console.error("Edge function error:", error);
      return false;
    }

    if (data?.success) {
      console.log("=== EMAIL SENT SUCCESSFULLY ===");
      return true;
    } else {
      console.error("Email send failed:", data);
      return false;
    }
    
  } catch (error) {
    console.error("=== VERIFICATION EMAIL EXCEPTION ===", error);
    return false;
  }
};

export const resendVerificationEmail = async (email: string): Promise<boolean> => {
  try {
    console.log("=== RESENDING VERIFICATION EMAIL ===");
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log("Current user for resend:", { hasUser: !!user, error: userError });
    
    if (!user) {
      console.error('No user found for resend');
      return false;
    }

    return await sendVerificationEmail(email, user.user_metadata?.name, user.id);
  } catch (error) {
    console.error('=== RESEND ERROR ===', error);
    return false;
  }
};
