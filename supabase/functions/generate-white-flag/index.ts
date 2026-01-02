import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, context, feeling } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const typeDescriptions: Record<string, string> = {
      'apology': 'a genuine apology that takes ownership without excessive guilt',
      'peace-offering': 'a peace offering that extends an olive branch and shows you want to reconnect',
      'needs': 'a message that gently expresses what you need while showing care for your partner'
    };

    const typeInstruction = typeDescriptions[type] || typeDescriptions['peace-offering'];

    const systemPrompt = `You are a compassionate relationship communication coach specializing in helping people repair after conflict.

Your job is to help someone draft ${typeInstruction}.

The message should:
- Sound natural and authentic (not scripted or formal)
- Take responsibility where appropriate without over-apologizing
- Show vulnerability and care
- Focus on moving forward together
- Be 2-4 sentences long

Respond with a JSON object:
{
  "drafts": [
    {
      "message": "The actual message they could say or send",
      "approach": "One word describing the approach (e.g., vulnerable, direct, gentle)"
    }
  ],
  "advice": "One brief piece of advice about delivering this message effectively"
}

Generate 3 different drafts with varying approaches.`;

    const userPrompt = `Help me write ${typeInstruction} for my partner.

What happened: ${context || "We had an argument and I want to make things right"}
How I'm feeling: ${feeling || "I want to reconnect but don't know what to say"}

Please give me 3 different ways I could express this.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate drafts");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in AI response");
    }

    const parsed = JSON.parse(content);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating white flag drafts:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
