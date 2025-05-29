
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
  token: string;
  name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token, name }: VerificationEmailRequest = await req.json();

    const verificationUrl = `${req.headers.get("origin")}/auth/verify?token=${token}`;

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

    console.log("Verification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending verification email:", error);
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
