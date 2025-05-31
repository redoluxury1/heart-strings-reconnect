
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { VerificationResponse } from "./types.ts";

export const getUserById = async (userId: string) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  console.log("Looking up user by ID:", userId);
  
  try {
    const { data: userData, error: userFetchError } = await supabaseClient.auth.admin.getUserById(userId);
    
    console.log("User fetch result:", { 
      hasUser: !!userData?.user, 
      error: !!userFetchError,
      errorMessage: userFetchError?.message,
      emailConfirmed: userData?.user?.email_confirmed_at,
      userId: userData?.user?.id,
      userEmail: userData?.user?.email
    });

    return { userData, userFetchError };
  } catch (error) {
    console.error("Exception during user lookup:", error);
    return { userData: null, userFetchError: error };
  }
};

export const confirmUserEmail = async (userId: string): Promise<VerificationResponse> => {
  console.log("Starting email confirmation for user:", userId);

  const { userData, userFetchError } = await getUserById(userId);

  if (userFetchError || !userData?.user) {
    console.error("User not found in auth system:", userFetchError?.message);
    
    // Let's try to wait a bit and retry once - sometimes there's a delay in user creation
    console.log("Waiting 2 seconds and retrying user lookup...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { userData: retryUserData, userFetchError: retryError } = await getUserById(userId);
    
    if (retryError || !retryUserData?.user) {
      console.error("User still not found after retry:", retryError?.message);
      
      return {
        success: false,
        error: "Your account verification failed. This may be due to a timing issue during account creation. Please try signing up again.",
        action: "signup_again"
      };
    }
    
    // Use the retry data for the rest of the function
    console.log("User found on retry, proceeding with confirmation");
    return await processEmailConfirmation(retryUserData.user.id, retryUserData.user);
  }

  return await processEmailConfirmation(userData.user.id, userData.user);
};

const processEmailConfirmation = async (userId: string, user: any): Promise<VerificationResponse> => {
  console.log("Processing email confirmation for user:", userId);
  console.log("User current email_confirmed_at:", user.email_confirmed_at);

  if (user.email_confirmed_at) {
    console.log("User email already confirmed");
    return {
      success: true,
      message: "Your email is already verified. You can now log in.",
      action: "already_verified"
    };
  }

  // Confirm the user's email using the proper Supabase method
  console.log("Confirming user email via admin.updateUserById...");
  
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
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
        error: "Failed to verify your email. Please try the verification link again or sign up again.",
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
        error: "Email verification failed. Please try the verification link again.",
        action: "signup_again"
      };
    }
  } catch (error: any) {
    console.error("Exception during email confirmation:", error);
    return {
      success: false,
      error: "An error occurred during verification. Please try again or sign up again.",
      action: "signup_again"
    };
  }
};
