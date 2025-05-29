
import { supabase } from '@/integrations/supabase/client';

export const sendVerificationEmail = async (email: string, name?: string, userId?: string): Promise<boolean> => {
  try {
    console.log("=== STARTING EMAIL VERIFICATION ===");
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Provided User ID:", userId);
    
    // Generate verification token
    const token = crypto.randomUUID();
    console.log("Generated token:", token.substring(0, 10) + "...");
    
    let targetUserId = userId;
    
    // If no userId provided, try to get current user
    if (!targetUserId) {
      console.log("No userId provided, attempting to get current user...");
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log("getUser result:", { hasUser: !!user, error: userError });
      
      if (user) {
        targetUserId = user.id;
        console.log("Found user from getUser:", targetUserId);
      } else {
        // Try session as fallback
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("getSession result:", { hasSession: !!session, error: sessionError });
        
        if (session?.user) {
          targetUserId = session.user.id;
          console.log("Found user from session:", targetUserId);
        }
      }
    }

    if (!targetUserId) {
      console.error("=== NO USER ID FOUND ===");
      console.error("Cannot send verification email without user ID");
      return false;
    }

    console.log("Final target user ID:", targetUserId);

    // Call the edge function to send verification email
    console.log("Calling send-verification-email edge function...");
    const { data, error } = await supabase.functions.invoke('send-verification-email', {
      body: { 
        email, 
        token, 
        name,
        userId: targetUserId,
        storeToken: true
      }
    });

    console.log("Edge function response:", { data, error });

    if (error) {
      console.error("=== EDGE FUNCTION ERROR ===");
      console.error("Error details:", error);
      return false;
    }

    if (data?.success) {
      console.log("=== EMAIL SENT SUCCESSFULLY ===");
      return true;
    } else {
      console.error("=== EMAIL SEND FAILED ===");
      console.error("Response data:", data);
      return false;
    }
    
  } catch (error) {
    console.error("=== VERIFICATION EMAIL EXCEPTION ===");
    console.error('Error details:', error);
    return false;
  }
};

export const resendVerificationEmail = async (email: string): Promise<boolean> => {
  try {
    console.log("=== RESENDING VERIFICATION EMAIL ===");
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log("Current user for resend:", { hasUser: !!user, error: userError });
    
    if (!user) {
      console.error('No user found for resend');
      return false;
    }

    // Send new verification email
    return await sendVerificationEmail(email, user.user_metadata?.name, user.id);
  } catch (error) {
    console.error('=== RESEND ERROR ===');
    console.error('Error details:', error);
    return false;
  }
};
