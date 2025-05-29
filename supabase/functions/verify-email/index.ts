
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { token } = await req.json();
    console.log("Verifying token:", token?.substring(0, 10) + "...");

    if (!token) {
      console.error("No token provided");
      return new Response(
        JSON.stringify({ error: "Verification token is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get the user from the verification token
    const { data: tokenData, error: tokenError } = await supabaseClient
      .from('email_verification_tokens')
      .select('user_id, expires_at')
      .eq('token', token)
      .eq('used', false)
      .single();

    console.log("Token lookup result:", { tokenData, tokenError });

    if (tokenError || !tokenData) {
      console.error("Invalid token or token lookup failed:", tokenError);
      return new Response(
        JSON.stringify({ error: "Invalid or expired verification token" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      console.error("Token expired:", tokenData.expires_at);
      return new Response(
        JSON.stringify({ error: "Verification token has expired" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Attempting to confirm user email for user:", tokenData.user_id);

    // Try to get user info first
    const { data: userData, error: userFetchError } = await supabaseClient.auth.admin.getUserById(tokenData.user_id);
    
    console.log("User fetch result:", { hasUser: !!userData?.user, error: userFetchError });

    if (userFetchError || !userData?.user) {
      console.error("User not found in auth system:", userFetchError);
      
      // Mark token as used since it was valid but user is missing
      await supabaseClient
        .from('email_verification_tokens')
        .update({ used: true })
        .eq('token', token);
      
      return new Response(
        JSON.stringify({ 
          error: "Your account verification link is valid, but we couldn't find your account in our system. This can happen if there was an issue during signup. Please try signing up again.",
          action: "signup_again"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // If user exists but is already confirmed, that's okay - just mark token as used
    if (userData.user.email_confirmed_at) {
      console.log("User email already confirmed");
      
      // Mark token as used
      await supabaseClient
        .from('email_verification_tokens')
        .update({ used: true })
        .eq('token', token);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email already verified. You can now log in.",
          action: "already_verified"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Confirm the user's email
    const { error: updateError } = await supabaseClient.auth.admin.updateUserById(
      tokenData.user_id,
      { email_confirm: true }
    );

    if (updateError) {
      console.error("Error confirming user email:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to verify email. Please try again or contact support." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("User email confirmed successfully");

    // Mark token as used
    const { error: tokenUpdateError } = await supabaseClient
      .from('email_verification_tokens')
      .update({ used: true })
      .eq('token', token);

    if (tokenUpdateError) {
      console.error("Error marking token as used:", tokenUpdateError);
      // Don't fail the request for this
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email verified successfully! You can now log in with your email and password.",
        action: "verified"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in verify-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred during verification. Please try again or contact support.",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
