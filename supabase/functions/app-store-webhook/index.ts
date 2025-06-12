
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AppleWebhookPayload {
  notificationType: string;
  subtype?: string;
  data: {
    signedTransactionInfo: string;
    signedRenewalInfo: string;
  };
}

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

    const webhookPayload = await req.json() as AppleWebhookPayload;
    
    console.log('Received Apple webhook:', webhookPayload.notificationType, webhookPayload.subtype);

    // Handle different notification types
    switch (webhookPayload.notificationType) {
      case 'SUBSCRIBED':
        await handleSubscribed(supabase, webhookPayload);
        break;
      case 'DID_RENEW':
        await handleRenewal(supabase, webhookPayload);
        break;
      case 'EXPIRED':
        await handleExpired(supabase, webhookPayload);
        break;
      case 'DID_CHANGE_RENEWAL_STATUS':
        await handleRenewalStatusChange(supabase, webhookPayload);
        break;
      case 'GRACE_PERIOD_EXPIRED':
        await handleGracePeriodExpired(supabase, webhookPayload);
        break;
      case 'REFUND':
        await handleRefund(supabase, webhookPayload);
        break;
      default:
        console.log('Unhandled notification type:', webhookPayload.notificationType);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleSubscribed(supabase: any, payload: AppleWebhookPayload) {
  // Decode the transaction info (in production, you'd verify the JWT signature)
  const transactionInfo = decodeJWT(payload.data.signedTransactionInfo);
  const renewalInfo = decodeJWT(payload.data.signedRenewalInfo);

  console.log('Handling subscription for transaction:', transactionInfo.transactionId);

  // Find user by original transaction ID
  const { data: existingReceipt } = await supabase
    .from('app_store_receipts')
    .select('user_id')
    .eq('original_transaction_id', transactionInfo.originalTransactionId)
    .single();

  if (!existingReceipt) {
    console.error('No user found for transaction:', transactionInfo.originalTransactionId);
    return;
  }

  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      current_period_start: new Date(transactionInfo.purchaseDate).toISOString(),
      current_period_end: new Date(transactionInfo.expiresDate).toISOString(),
      auto_renew: renewalInfo.autoRenewStatus === 1,
      updated_at: new Date().toISOString()
    })
    .eq('app_store_original_transaction_id', transactionInfo.originalTransactionId);
}

async function handleRenewal(supabase: any, payload: AppleWebhookPayload) {
  const transactionInfo = decodeJWT(payload.data.signedTransactionInfo);
  
  console.log('Handling renewal for transaction:', transactionInfo.transactionId);

  await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      current_period_start: new Date(transactionInfo.purchaseDate).toISOString(),
      current_period_end: new Date(transactionInfo.expiresDate).toISOString(),
      app_store_transaction_id: transactionInfo.transactionId,
      updated_at: new Date().toISOString()
    })
    .eq('app_store_original_transaction_id', transactionInfo.originalTransactionId);
}

async function handleExpired(supabase: any, payload: AppleWebhookPayload) {
  const transactionInfo = decodeJWT(payload.data.signedTransactionInfo);
  
  console.log('Handling expiration for transaction:', transactionInfo.originalTransactionId);

  await supabase
    .from('subscriptions')
    .update({
      status: 'expired',
      auto_renew: false,
      updated_at: new Date().toISOString()
    })
    .eq('app_store_original_transaction_id', transactionInfo.originalTransactionId);
}

async function handleRenewalStatusChange(supabase: any, payload: AppleWebhookPayload) {
  const renewalInfo = decodeJWT(payload.data.signedRenewalInfo);
  
  console.log('Handling renewal status change:', renewalInfo.originalTransactionId);

  await supabase
    .from('subscriptions')
    .update({
      auto_renew: renewalInfo.autoRenewStatus === 1,
      updated_at: new Date().toISOString()
    })
    .eq('app_store_original_transaction_id', renewalInfo.originalTransactionId);
}

async function handleGracePeriodExpired(supabase: any, payload: AppleWebhookPayload) {
  const transactionInfo = decodeJWT(payload.data.signedTransactionInfo);
  
  console.log('Handling grace period expiration:', transactionInfo.originalTransactionId);

  await supabase
    .from('subscriptions')
    .update({
      status: 'expired',
      updated_at: new Date().toISOString()
    })
    .eq('app_store_original_transaction_id', transactionInfo.originalTransactionId);
}

async function handleRefund(supabase: any, payload: AppleWebhookPayload) {
  const transactionInfo = decodeJWT(payload.data.signedTransactionInfo);
  
  console.log('Handling refund for transaction:', transactionInfo.originalTransactionId);

  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      auto_renew: false,
      updated_at: new Date().toISOString()
    })
    .eq('app_store_original_transaction_id', transactionInfo.originalTransactionId);
}

// Simple JWT decoder (in production, you should verify the signature)
function decodeJWT(token: string): any {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }
  
  const payload = parts[1];
  const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decoded);
}
