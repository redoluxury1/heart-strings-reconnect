
import { supabase } from '@/integrations/supabase/client';

export const sendVerificationEmail = async (email: string, name?: string, userId?: string): Promise<boolean> => {
  try {
    console.log("Starting sendVerificationEmail for:", email, "with userId:", userId);
    
    // Generate verification token
    const token = crypto.randomUUID();
    console.log("Generated token:", token.substring(0, 10) + "...");
    
    // Use provided userId or try to get current user
    let targetUserId = userId;
    if (!targetUserId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user found and no userId provided");
        throw new Error('No user found');
      }
      targetUserId = user.id;
    }

    console.log("Using user ID:", targetUserId);

    // Store verification token in database
    const { error: tokenError } = await supabase
      .from('email_verification_tokens')
      .insert({
        user_id: targetUserId,
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });

    if (tokenError) {
      console.error("Error storing verification token:", tokenError);
      throw tokenError;
    }

    console.log("Token stored successfully, calling edge function...");

    // Send verification email via edge function
    const { data, error } = await supabase.functions.invoke('send-verification-email', {
      body: { email, token, name }
    });

    console.log("Edge function response:", { data, error });

    if (error) {
      console.error("Edge function error:", error);
      throw error;
    }

    if (data && data.success) {
      console.log("Verification email sent successfully");
      return true;
    } else {
      console.error("Edge function returned unsuccessful response:", data);
      throw new Error(data?.error || "Failed to send verification email");
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
      throw new Error('No user found');
    }

    // Delete old tokens for this user
    await supabase
      .from('email_verification_tokens')
      .delete()
      .eq('user_id', user.id);

    // Send new verification email
    return await sendVerificationEmail(email, user.user_metadata?.name, user.id);
  } catch (error) {
    console.error('Error resending verification email:', error);
    return false;
  }
};
