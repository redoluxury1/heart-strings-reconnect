
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
    console.log("=== VERIFY EMAIL STARTED ===");
    
    const { token } = await req.json();
    console.log("Verifying token:", token?.substring(0, 8) + "...");

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

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Look up the token in our custom table
    console.log("Looking up token in custom email_verification_tokens table");
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .from('email_verification_tokens')
      .select('user_id, email, expires_at, used')
      .eq('token', token)
      .single();

    if (tokenError || !tokenData) {
      console.error("Token not found:", tokenError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid or expired verification token. Please sign up again to receive a new verification email." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Token found for user:", tokenData.user_id);

    // Check if token is already used
    if (tokenData.used) {
      console.error("Token already used");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "This verification link has already been used. Please try logging in instead." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check if token is expired
    const now = new Date();
    const expiryDate = new Date(tokenData.expires_at);
    if (expiryDate < now) {
      console.error("Token expired");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Verification link has expired. Please sign up again to receive a new verification email." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark token as used FIRST
    console.log("Marking token as used");
    const { error: updateTokenError } = await supabaseAdmin
      .from('email_verification_tokens')
      .update({ used: true })
      .eq('token', token);

    if (updateTokenError) {
      console.error("Error marking token as used:", updateTokenError);
    }

    // MANUALLY confirm the user's email using Supabase Auth Admin API
    console.log("Confirming user email via Supabase Admin API");
    const { data: confirmData, error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
      tokenData.user_id,
      { 
        email_confirm: true 
      }
    );

    if (confirmError) {
      console.error("Error confirming email:", confirmError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to verify email. Please contact support or try signing up again." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Email confirmation successful:", {
      userId: confirmData?.user?.id,
      emailConfirmed: !!confirmData?.user?.email_confirmed_at
    });

    console.log("=== EMAIL VERIFICATION SUCCESSFUL ===");
    
    // Instead of redirecting to a verify page, redirect to auth page with success message
    const origin = req.headers.get("origin") || "https://your-app.com";
    const redirectUrl = `${origin}/auth?verified=true`;
    
    return new Response(
      null,
      {
        status: 302,
        headers: { 
          "Location": redirectUrl,
          ...corsHeaders 
        },
      }
    );

  } catch (error: any) {
    console.error("=== VERIFY EMAIL ERROR ===", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "An error occurred during verification. Please try again or contact support." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
