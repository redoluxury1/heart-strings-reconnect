
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, createResponse, createErrorResponse } from "./response-utils.ts";
import { getVerificationToken, markTokenAsUsed, validateToken } from "./token-utils.ts";
import { confirmUserEmail } from "./user-utils.ts";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== VERIFY EMAIL FUNCTION STARTED ===");
    
    const { token } = await req.json();
    console.log("Received token:", token?.substring(0, 10) + "...");

    if (!token) {
      console.error("No token provided in request");
      return createErrorResponse("Verification token is required", 400);
    }

    // Get the token data from the database
    console.log("Looking up token in database...");
    const { tokenData, tokenError } = await getVerificationToken(token);

    if (tokenError) {
      console.error("Database error during token lookup:", tokenError);
      return createErrorResponse("Database error occurred", 500);
    }

    if (!tokenData) {
      console.error("Token not found in database");
      return createErrorResponse("Invalid or expired verification token. Please sign up again.", 400, "signup_again");
    }

    console.log("Token found, validating...");
    
    // Validate the token
    const validationResult = validateToken(tokenData);
    if (validationResult) {
      console.log("Token validation result:", validationResult);
      
      if (!validationResult.success && validationResult.action === "signup_again") {
        console.log("Token invalid, marking as used");
        await markTokenAsUsed(token);
      }
      
      return createResponse(validationResult, validationResult.success ? 200 : 400);
    }

    console.log("Token is valid, confirming user email for user:", tokenData.user_id);

    // Confirm the user's email
    const confirmationResult = await confirmUserEmail(tokenData.user_id);
    console.log("Email confirmation result:", confirmationResult);

    // Always mark token as used after processing
    console.log("Marking token as used...");
    await markTokenAsUsed(token);

    if (confirmationResult.success) {
      console.log("=== EMAIL VERIFICATION SUCCESSFUL ===");
      return createResponse(confirmationResult, 200);
    } else {
      console.error("=== EMAIL VERIFICATION FAILED ===");
      return createResponse(confirmationResult, 400);
    }

  } catch (error: any) {
    console.error("=== VERIFY EMAIL FUNCTION ERROR ===");
    console.error("Error details:", error);
    return createErrorResponse("Verification failed. Please try signing up again.", 500);
  }
};

serve(handler);
