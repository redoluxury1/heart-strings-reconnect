
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, createResponse, createErrorResponse } from "./response-utils.ts";
import { getVerificationToken, markTokenAsUsed, validateToken } from "./token-utils.ts";
import { confirmUserEmail } from "./user-utils.ts";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();
    console.log("Verifying token:", token?.substring(0, 10) + "...");

    if (!token) {
      console.error("No token provided");
      return createErrorResponse("Verification token is required", 400);
    }

    // Get the token data from the database
    const { tokenData, tokenError } = await getVerificationToken(token);

    if (tokenError) {
      console.error("Error looking up token:", tokenError);
      return createErrorResponse("Database error occurred", 500);
    }

    // Validate the token
    const validationResult = validateToken(tokenData);
    if (validationResult) {
      if (!validationResult.success && validationResult.action === "signup_again") {
        await markTokenAsUsed(token);
      }
      return createResponse(validationResult, validationResult.success ? 200 : 400);
    }

    console.log("Attempting to confirm user email for user:", tokenData!.user_id);

    // Confirm the user's email
    const confirmationResult = await confirmUserEmail(tokenData!.user_id);

    if (!confirmationResult.success) {
      await markTokenAsUsed(token);
      return createResponse(confirmationResult, 400);
    }

    // Mark token as used on success
    await markTokenAsUsed(token);

    return createResponse(confirmationResult);
  } catch (error: any) {
    console.error("Error in verify-email function:", error);
    return createErrorResponse("Verification failed. Please try signing up again.", 500);
  }
};

serve(handler);
