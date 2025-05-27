
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationText, availablePatterns } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are a relationship conflict pattern analyzer. Analyze the conversation below and identify the primary conflict pattern.

Available patterns:
- weaponized_vulnerability: Past vulnerabilities or personal shares used as weapons
- broken_trust: Promises broken, inconsistency, reliability issues  
- emotional_invalidation: Feelings dismissed, not feeling heard
- power_struggles: Control issues, decision-making conflicts
- emotional_shutdown: Withdrawal, stonewalling, going silent
- effort_imbalance: One person doing more emotional/practical work
- miscommunication_loops: Misunderstandings that spiral and escalate

Respond with ONLY the pattern name (exactly as listed above) that best matches the conversation. If no clear pattern emerges, respond with "general_repair".

Conversation to analyze:`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: conversationText }
        ],
        max_tokens: 50,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const pattern = data.choices[0].message.content.trim().toLowerCase();
    
    console.log('GPT analyzed pattern:', pattern);

    // Validate the response is a known pattern
    const validPatterns = [...availablePatterns, 'general_repair'];
    const detectedPattern = validPatterns.includes(pattern) ? pattern : 'general_repair';

    return new Response(JSON.stringify({ pattern: detectedPattern }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-conflict-pattern function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      pattern: 'general_repair' // Fallback pattern
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
