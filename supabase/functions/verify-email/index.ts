
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
    console.log("Request method:", req.method);
    
    const requestBody = await req.json();
    const { token } = requestBody;
    console.log("Received verification request:", { 
      hasToken: !!token,
      tokenLength: token?.length,
      tokenPreview: token?.substring(0, 8) + "..."
    });

    if (!token) {
      console.error("No token provided in request");
      return createErrorResponse("Verification token is required", 400);
    }

    // Get the token data from the database
    console.log("Looking up token in database...");
    const { tokenData, tokenError } = await getVerificationToken(token);

    if (tokenError) {
      console.error("Database error during token lookup:", tokenError);
      return createErrorResponse("Database error occurred while verifying token", 500);
    }

    if (!tokenData) {
      console.error("Token not found in database");
      return createErrorResponse("Invalid or expired verification token. Please sign up again.", 400, "signup_again");
    }

    console.log("Token found for user:", {
      userId: tokenData.user_id,
      expiresAt: tokenData.expires_at,
      used: tokenData.used
    });
    
    // Validate the token (check expiry)
    const validationResult = await validateToken(tokenData);
    if (validationResult) {
      console.log("Token validation failed:", validationResult);
      
      // Mark token as used for expired tokens
      if (validationResult.action === "signup_again") {
        console.log("Marking expired/invalid token as used");
        await markTokenAsUsed(token);
      }
      
      return createResponse(validationResult, validationResult.success ? 200 : 400);
    }

    console.log("Token is valid, proceeding with email confirmation for user:", tokenData.user_id);

    // Confirm the user's email in Supabase Auth
    const confirmationResult = await confirmUserEmail(tokenData.user_id);
    console.log("Email confirmation result:", confirmationResult);

    // Always mark token as used after processing (success or failure)
    console.log("Marking token as used...");
    const markUsedError = await markTokenAsUsed(token);
    if (markUsedError) {
      console.error("Failed to mark token as used:", markUsedError);
    } else {
      console.log("Token marked as used successfully");
    }

    if (confirmationResult.success) {
      console.log("=== EMAIL VERIFICATION SUCCESSFUL ===");
      return createResponse(confirmationResult, 200);
    } else {
      console.error("=== EMAIL VERIFICATION FAILED ===");
      console.error("Failure reason:", confirmationResult.error);
      return createResponse(confirmationResult, 400);
    }

  } catch (error: any) {
    console.error("=== VERIFY EMAIL FUNCTION ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return createErrorResponse("An unexpected error occurred during verification. Please try again.", 500);
  }
};

serve(handler);
