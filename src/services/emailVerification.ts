
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

    // Try to store token directly first, but handle RLS blocking
    console.log("Attempting to store verification token...");
    const { error: tokenError } = await supabase
      .from('email_verification_tokens')
      .insert({
        user_id: targetUserId,
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });

    let tokenStored = !tokenError;

    if (tokenError) {
      console.error("Client-side token storage failed (likely RLS):", tokenError);
      console.log("Will use edge function to store token with service role...");
    } else {
      console.log("Token stored successfully via client");
    }

    // Send verification email via edge function
    const { data, error } = await supabase.functions.invoke('send-verification-email', {
      body: { 
        email, 
        token, 
        name,
        userId: targetUserId,
        storeToken: !tokenStored // Only ask edge function to store if client failed
      }
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
