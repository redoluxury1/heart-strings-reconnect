
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

  // Use the correct method to confirm user email
  console.log("Confirming user email via admin API...");
  const { data: updateData, error: updateError } = await supabaseClient.auth.admin.updateUserById(
    userId,
    { 
      email_confirm: true,
      // Also ensure the user is marked as confirmed
      app_metadata: {
        ...userData.user.app_metadata,
        email_confirmed: true
      }
    }
  );

  if (updateError) {
    console.error("Error confirming user email:", updateError);
    return {
      success: false,
      error: "Failed to verify your email. Please try again or sign up with a new account."
    };
  }

  console.log("Update result:", updateData);
  
  // Verify the confirmation worked by fetching the user again
  const { userData: verifiedUserData, userFetchError: verifiedFetchError } = await getUserById(userId);
  
  if (verifiedFetchError) {
    console.error("Error re-fetching user after confirmation:", verifiedFetchError);
    return {
      success: false,
      error: "Email verification may have failed. Please try logging in or sign up again."
    };
  }

  console.log("Final verification check:", {
    emailConfirmedAt: verifiedUserData?.user?.email_confirmed_at,
    userExists: !!verifiedUserData?.user
  });
  
  if (verifiedUserData?.user?.email_confirmed_at) {
    return {
      success: true,
      message: "Email verified successfully! You can now log in to your account.",
      action: "verified"
    };
  } else {
    console.error("Email confirmation failed - user still not confirmed after update");
    return {
      success: false,
      error: "Email verification failed. Please try signing up again with the same email address."
    };
  }
};
