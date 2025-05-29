
import { supabase } from '@/integrations/supabase/client';

export const sendVerificationEmail = async (email: string, name?: string, userId?: string): Promise<boolean> => {
  try {
    console.log("Starting sendVerificationEmail for:", email);
    
    // Generate verification token
    const token = crypto.randomUUID();
    console.log("Generated token:", token.substring(0, 10) + "...");
    
    // Use provided userId or try to get current user
    let targetUserId = userId;
    if (!targetUserId) {
      // Try to get user by email if no userId provided
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user from getUser:", user?.id);
      
      if (!user) {
        // If still no user, try to get from session
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session user:", session?.user?.id);
        
        if (session?.user) {
          targetUserId = session.user.id;
        } else {
          console.error("No user found and no userId provided");
          return false;
        }
      } else {
        targetUserId = user.id;
      }
    }

    console.log("Using user ID:", targetUserId);

    // Send verification email via edge function (let it handle token storage)
    const { data, error } = await supabase.functions.invoke('send-verification-email', {
      body: { 
        email, 
        token, 
        name,
        userId: targetUserId,
        storeToken: true // Always ask edge function to store token
      }
    });

    console.log("Edge function response:", { data, error });

    if (error) {
      console.error("Edge function error:", error);
      return false;
    }

    if (data && data.success) {
      console.log("Verification email sent successfully");
      return true;
    } else {
      console.error("Edge function returned unsuccessful response:", data);
      return false;
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

export const resendVerificationEmail = async (email: string): Promise<boolean> => {
  try {
    // Get user by email
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('No user found for resend');
      return false;
    }

    // Send new verification email (edge function will clean up old tokens)
    return await sendVerificationEmail(email, user.user_metadata?.name, user.id);
  } catch (error) {
    console.error('Error resending verification email:', error);
    return false;
  }
};
