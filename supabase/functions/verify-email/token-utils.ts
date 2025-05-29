
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { VerificationTokenData, VerificationResponse } from "./types.ts";

export const getVerificationToken = async (token: string) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { data: tokenData, error: tokenError } = await supabaseClient
    .from('email_verification_tokens')
    .select('user_id, expires_at, used')
    .eq('token', token)
    .maybeSingle();

  console.log("Token lookup result:", { tokenData, tokenError });

  return { tokenData, tokenError };
};

export const markTokenAsUsed = async (token: string) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { error: tokenUpdateError } = await supabaseClient
    .from('email_verification_tokens')
    .update({ used: true })
    .eq('token', token);

  if (tokenUpdateError) {
    console.error("Error marking token as used:", tokenUpdateError);
  }

  return tokenUpdateError;
};

export const validateToken = (tokenData: VerificationTokenData | null): VerificationResponse | null => {
  if (!tokenData) {
    console.error("Token not found in database");
    return {
      success: false,
      error: "Invalid verification token",
      action: "signup_again"
    };
  }

  if (tokenData.used) {
    console.log("Token already used");
    return {
      success: true,
      message: "Email already verified. You can now log in.",
      action: "already_verified"
    };
  }

  if (new Date(tokenData.expires_at) < new Date()) {
    console.error("Token expired:", tokenData.expires_at);
    return {
      success: false,
      error: "Verification token has expired. Please request a new one.",
      action: "signup_again"
    };
  }

  return null; // Token is valid
};
