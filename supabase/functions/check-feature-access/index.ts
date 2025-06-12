
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FeatureAccessRequest {
  userId: string;
  featureKey: string;
}

const PREMIUM_FEATURES = [
  'mid_fight_access',
  'post_conflict_access',
  'reconnect_access',
  'love_notes_access',
  'archive_access',
  'quiz_access'
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { userId, featureKey } = await req.json() as FeatureAccessRequest;

    console.log('Checking feature access for user:', userId, 'feature:', featureKey);

    // Check if feature requires premium access
    if (!PREMIUM_FEATURES.includes(featureKey)) {
      return new Response(
        JSON.stringify({ hasAccess: true, reason: 'free_feature' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check for active subscription
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['active', 'in_trial'])
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking subscription:', error);
      throw error;
    }

    if (!subscription) {
      return new Response(
        JSON.stringify({ hasAccess: false, reason: 'no_subscription' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check if subscription is still valid
    const now = new Date();
    const expiresAt = new Date(subscription.current_period_end);
    
    if (expiresAt < now) {
      // Subscription expired, update status
      await supabase
        .from('subscriptions')
        .update({ 
          status: 'expired',
          updated_at: new Date().toISOString()
        })
        .eq('id', subscription.id);

      return new Response(
        JSON.stringify({ hasAccess: false, reason: 'subscription_expired' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check if trial has ended
    if (subscription.status === 'in_trial' && subscription.trial_end_date) {
      const trialEnd = new Date(subscription.trial_end_date);
      if (trialEnd < now) {
        // Trial ended, update to active or expired based on payment
        const newStatus = expiresAt > now ? 'active' : 'expired';
        await supabase
          .from('subscriptions')
          .update({ 
            status: newStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', subscription.id);

        if (newStatus === 'expired') {
          return new Response(
            JSON.stringify({ hasAccess: false, reason: 'trial_expired' }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
      }
    }

    console.log('User has access to feature:', featureKey);

    return new Response(
      JSON.stringify({ 
        hasAccess: true, 
        reason: 'active_subscription',
        subscription: {
          status: subscription.status,
          expiresAt: subscription.current_period_end,
          trialEndDate: subscription.trial_end_date
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Feature access check error:', error);
    return new Response(
      JSON.stringify({ hasAccess: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
