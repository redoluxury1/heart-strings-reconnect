
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PartnerInviteEmailRequest {
  partnerEmail: string;
  partnerName?: string;
  inviterName: string;
  inviteToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { partnerEmail, partnerName, inviterName, inviteToken }: PartnerInviteEmailRequest = await req.json();

    console.log("Sending partner invite email to:", partnerEmail);

    const inviteUrl = `https://khkytmxfrbtcwppmehkd.supabase.co/partner-invite?token=${inviteToken}`;
    
    const greeting = partnerName ? `Hi ${partnerName}` : "Hi there";
    const subject = `${inviterName} invited you to join Bridge For Couples`;

    const emailResponse = await resend.emails.send({
      from: "Bridge For Couples <onboarding@resend.dev>",
      to: [partnerEmail],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2e4059; font-size: 28px; margin-bottom: 10px;">Bridge For Couples</h1>
            <p style="color: #666; font-size: 16px;">Strengthen your relationship together</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #2e4059; font-size: 22px; margin-bottom: 15px;">${greeting}!</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              <strong>${inviterName}</strong> has invited you to join Bridge For Couples - an app designed to help couples communicate better, resolve conflicts, and strengthen their relationship.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Together, you'll have access to:
            </p>
            <ul style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 25px; padding-left: 20px;">
              <li>Guided conversation tools during conflicts</li>
              <li>Better ways to express difficult feelings</li>
              <li>Shared activities to reconnect after fights</li>
              <li>Tools to understand each other's communication styles</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${inviteUrl}" 
                 style="background: #D3876A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
                Accept Invitation
              </a>
            </div>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>If you can't click the button above, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; margin: 10px 0;">${inviteUrl}</p>
            <p style="margin-top: 20px;">
              If you didn't expect this invitation, you can safely ignore this email.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Partner invite email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending partner invite email:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
