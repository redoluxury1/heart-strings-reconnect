
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

    if (!token) {
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

    if (tokenError || !tokenData) {
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
      return new Response(
        JSON.stringify({ error: "Verification token has expired" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark user as email confirmed
    const { error: updateError } = await supabaseClient.auth.admin.updateUserById(
      tokenData.user_id,
      { email_confirm: true }
    );

    if (updateError) {
      console.error("Error confirming user email:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to verify email" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark token as used
    await supabaseClient
      .from('email_verification_tokens')
      .update({ used: true })
      .eq('token', token);

    return new Response(
      JSON.stringify({ success: true, message: "Email verified successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in verify-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
