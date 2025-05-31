
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  email: string;
  name?: string;
  userId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== SEND VERIFICATION EMAIL STARTED ===");
    
    const { email, name, userId }: VerificationEmailRequest = await req.json();
    console.log("Request:", { email, name, userId });

    if (!email || !userId) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Email and userId are required" }),
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

    // Generate a secure token
    const token = crypto.randomUUID();
    console.log("Generated token:", token.substring(0, 8) + "...");

    // Clean up any existing tokens for this user
    console.log("Cleaning up existing tokens for user:", userId);
    await supabaseAdmin
      .from('email_verification_tokens')
      .delete()
      .eq('user_id', userId);

    // Insert new token
    console.log("Storing new verification token");
    const { error: tokenError } = await supabaseAdmin
      .from('email_verification_tokens')
      .insert({
        user_id: userId,
        token,
        email,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });

    if (tokenError) {
      console.error("Error storing token:", tokenError);
      return new Response(
        JSON.stringify({ error: "Failed to store verification token" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Generate verification URL
    const origin = req.headers.get("origin") || req.headers.get("referer")?.split('/').slice(0, 3).join('/') || "https://your-app.com";
    const verificationUrl = `${origin}/auth/verify?token=${token}`;
    console.log("Verification URL:", verificationUrl);

    // Send email
    console.log("Sending verification email via Resend");
    const emailResponse = await resend.emails.send({
      from: "Bridge for Couples <hello@bridgeforcouples.com>",
      to: [email],
      subject: "Verify your email - Bridge for Couples",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2e4059; margin-bottom: 10px;">Welcome to Bridge for Couples!</h1>
            ${name ? `<p style="color: #666; font-size: 16px;">Hi ${name},</p>` : ''}
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Thank you for signing up! To complete your registration and start building better conversations, please verify your email address.
            </p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" 
                 style="background: #2e4059; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Verify Email Address
              </a>
            </div>
          </div>
          
          <div style="color: #666; font-size: 14px; text-align: center;">
            <p>If you didn't create an account, you can safely ignore this email.</p>
            <p>This link will expire in 24 hours for security.</p>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("=== EMAIL SENT SUCCESSFULLY ===");
    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("=== SEND EMAIL ERROR ===", error);
    return new Response(
      JSON.stringify({ error: "Failed to send verification email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
