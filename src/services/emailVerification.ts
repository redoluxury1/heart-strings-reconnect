
import { supabase } from '@/integrations/supabase/client';

export const sendVerificationEmail = async (email: string, name?: string): Promise<boolean> => {
  try {
    // Generate verification token
    const token = crypto.randomUUID();
    
    // Get user ID (assuming they just signed up)
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No user found');
    }

    // Store verification token in database
    const { error: tokenError } = await supabase
      .from('email_verification_tokens')
      .insert({
        user_id: user.id,
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });

    if (tokenError) {
      throw tokenError;
    }

    // Send verification email via edge function
    const { data, error } = await supabase.functions.invoke('send-verification-email', {
      body: { email, token, name }
    });

    if (error) {
      throw error;
    }

    return data.success;
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
    return await sendVerificationEmail(email, user.user_metadata?.name);
  } catch (error) {
    console.error('Error resending verification email:', error);
    return false;
  }
};
