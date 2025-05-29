
import { VerificationResponse } from "./types.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export const createResponse = (
  response: VerificationResponse,
  status: number = 200
): Response => {
  return new Response(
    JSON.stringify(response),
    {
      status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    }
  );
};

export const createErrorResponse = (
  error: string,
  status: number = 400,
  action?: string
): Response => {
  return createResponse(
    {
      success: false,
      error,
      ...(action && { action })
    },
    status
  );
};
