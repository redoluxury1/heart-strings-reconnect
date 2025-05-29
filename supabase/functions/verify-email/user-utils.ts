
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { VerificationResponse } from "./types.ts";

export const getUserById = async (userId: string) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  console.log("Looking up user by ID:", userId);
  
  const { data: userData, error: userFetchError } = await supabaseClient.auth.admin.getUserById(userId);
  
  console.log("User fetch result:", { 
    hasUser: !!userData?.user, 
    error: userFetchError,
    emailConfirmed: userData?.user?.email_confirmed_at 
  });

  return { userData, userFetchError };
};

export const confirmUserEmail = async (userId: string): Promise<VerificationResponse> => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  console.log("Starting email confirmation for user:", userId);

  const { userData, userFetchError } = await getUserById(userId);

  if (userFetchError || !userData?.user) {
    console.error("User not found in auth system:", userFetchError);
    return {
      success: false,
      error: "Your verification link is invalid or expired. Please sign up again with the same email.",
      action: "signup_again"
    };
  }

  console.log("User found, current email_confirmed_at:", userData.user.email_confirmed_at);

  if (userData.user.email_confirmed_at) {
    console.log("User email already confirmed");
    return {
      success: true,
      message: "Your email is already verified. You can now log in.",
      action: "already_verified"
    };
  }

  // Confirm the user's email using the admin API - this is the key fix
  console.log("Confirming user email via admin API...");
  const { data: updateData, error: updateError } = await supabaseClient.auth.admin.updateUserById(
    userId,
    { email_confirm: true }
  );

  if (updateError) {
    console.error("Error confirming user email:", updateError);
    return {
      success: false,
      error: "Failed to verify your email. Please try again or sign up with a new account."
    };
  }

  console.log("User email confirmed successfully:", updateData?.user?.email_confirmed_at);
  
  // Double-check that the confirmation worked
  const { userData: verifiedUserData } = await getUserById(userId);
  if (verifiedUserData?.user?.email_confirmed_at) {
    return {
      success: true,
      message: "Email verified successfully! You can now log in to your account.",
      action: "verified"
    };
  } else {
    console.error("Email confirmation may have failed - user still not confirmed");
    return {
      success: false,
      error: "Email verification may have failed. Please try logging in or sign up again."
    };
  }
};
