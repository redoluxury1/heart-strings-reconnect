
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { VerificationTokenData, VerificationResponse } from "./types.ts";

export const getVerificationToken = async (token: string) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  console.log("Querying verification token from database...");
  
  const { data: tokenData, error: tokenError } = await supabaseClient
    .from('email_verification_tokens')
    .select('user_id, expires_at, used')
    .eq('token', token)
    .maybeSingle();

  console.log("Token lookup result:", { 
    found: !!tokenData, 
    error: !!tokenError,
    userId: tokenData?.user_id,
    expired: tokenData ? new Date(tokenData.expires_at) < new Date() : null,
    used: tokenData?.used
  });

  return { tokenData, tokenError };
};

export const markTokenAsUsed = async (token: string) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  console.log("Marking token as used in database...");
  
  const { error: tokenUpdateError } = await supabaseClient
    .from('email_verification_tokens')
    .update({ used: true })
    .eq('token', token);

  if (tokenUpdateError) {
    console.error("Error marking token as used:", tokenUpdateError);
  } else {
    console.log("Token marked as used successfully");
  }

  return tokenUpdateError;
};

export const validateToken = (tokenData: VerificationTokenData): VerificationResponse | null => {
  if (!tokenData) {
    console.error("No token data provided for validation");
    return {
      success: false,
      error: "Invalid verification token",
      action: "signup_again"
    };
  }

  if (tokenData.used) {
    console.log("Token already used, but email may already be verified");
    return {
      success: true,
      message: "This verification link has already been used. Your email may already be verified. Try logging in.",
      action: "already_verified"
    };
  }

  const expiryDate = new Date(tokenData.expires_at);
  const now = new Date();
  
  if (expiryDate < now) {
    console.error("Token expired:", {
      expiryDate: expiryDate.toISOString(),
      currentTime: now.toISOString()
    });
    return {
      success: false,
      error: "Your verification link has expired. Please sign up again to receive a new verification email.",
      action: "signup_again"
    };
  }

  console.log("Token validation passed");
  return null; // Token is valid
};
