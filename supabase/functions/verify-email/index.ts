
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
        JSON.stringify({ 
          success: false,
          error: "Verification token is required" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get the user from the verification token
    const { data: tokenData, error: tokenError } = await supabaseClient
      .from('email_verification_tokens')
      .select('user_id, expires_at, used')
      .eq('token', token)
      .maybeSingle();

    console.log("Token lookup result:", { tokenData, tokenError });

    if (tokenError) {
      console.error("Error looking up token:", tokenError);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Database error occurred" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!tokenData) {
      console.error("Token not found in database");
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Invalid verification token",
          action: "signup_again"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check if token is already used
    if (tokenData.used) {
      console.log("Token already used");
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

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      console.error("Token expired:", tokenData.expires_at);
      
      // Mark token as used since it's expired
      await supabaseClient
        .from('email_verification_tokens')
        .update({ used: true })
        .eq('token', token);
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Verification token has expired. Please request a new one.",
          action: "signup_again"
        }),
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
      console.error("User not found in auth system, attempting to recreate verification link");
      
      // Instead of giving up, let's tell them to try signing up again
      // but mark the token as used so it can't be reused
      await supabaseClient
        .from('email_verification_tokens')
        .update({ used: true })
        .eq('token', token);
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Your account needs to be recreated. Please sign up again with the same email.",
          action: "signup_again"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // If user exists but is already confirmed, that's okay
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
        JSON.stringify({ 
          success: false,
          error: "Failed to verify email. Please try signing up again." 
        }),
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
        message: "Email verified successfully! You can now log in.",
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
        success: false,
        error: "Verification failed. Please try signing up again."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
