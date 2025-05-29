
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { VerificationResponse } from "./types.ts";

export const getUserById = async (userId: string) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { data: userData, error: userFetchError } = await supabaseClient.auth.admin.getUserById(userId);
  
  console.log("User fetch result:", { hasUser: !!userData?.user, error: userFetchError });

  return { userData, userFetchError };
};

export const confirmUserEmail = async (userId: string): Promise<VerificationResponse> => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { userData, userFetchError } = await getUserById(userId);

  if (userFetchError || !userData?.user) {
    console.error("User not found in auth system, attempting to recreate verification link");
    return {
      success: false,
      error: "Your account needs to be recreated. Please sign up again with the same email.",
      action: "signup_again"
    };
  }

  if (userData.user.email_confirmed_at) {
    console.log("User email already confirmed");
    return {
      success: true,
      message: "Email already verified. You can now log in.",
      action: "already_verified"
    };
  }

  const { error: updateError } = await supabaseClient.auth.admin.updateUserById(
    userId,
    { email_confirm: true }
  );

  if (updateError) {
    console.error("Error confirming user email:", updateError);
    return {
      success: false,
      error: "Failed to verify email. Please try signing up again."
    };
  }

  console.log("User email confirmed successfully");
  return {
    success: true,
    message: "Email verified successfully! You can now log in.",
    action: "verified"
  };
};
