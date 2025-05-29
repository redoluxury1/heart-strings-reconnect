
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
    emailConfirmed: userData?.user?.email_confirmed_at,
    userId: userData?.user?.id
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

  // CRITICAL FIX: Use the proper Supabase method to confirm email
  console.log("Confirming user email via admin.updateUserById...");
  const { data: confirmData, error: confirmError } = await supabaseClient.auth.admin.updateUserById(
    userId,
    { 
      email_confirm: true
    }
  );

  if (confirmError) {
    console.error("Error confirming user email:", confirmError);
    return {
      success: false,
      error: "Failed to verify your email. Please try again or sign up with a new account.",
      action: "signup_again"
    };
  }

  console.log("Email confirmation result:", {
    success: !!confirmData?.user,
    userId: confirmData?.user?.id,
    emailConfirmedAt: confirmData?.user?.email_confirmed_at
  });
  
  // Verify the confirmation worked by checking the updated user
  if (confirmData?.user?.email_confirmed_at) {
    console.log("Email successfully confirmed for user:", userId);
    return {
      success: true,
      message: "Email verified successfully! You can now log in to your account.",
      action: "verified"
    };
  } else {
    console.error("Email confirmation failed - no confirmation timestamp");
    return {
      success: false,
      error: "Email verification failed. Please try signing up again with the same email address.",
      action: "signup_again"
    };
  }
};
