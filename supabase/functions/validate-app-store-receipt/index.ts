
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ReceiptValidationRequest {
  receiptData: string;
  userId: string;
  transactionId: string;
  originalTransactionId: string;
  productId: string;
  purchaseDate: string;
  expiresDate?: string;
  isTrialPeriod: boolean;
}

interface AppleReceiptResponse {
  status: number;
  receipt?: any;
  latest_receipt_info?: any[];
  pending_renewal_info?: any[];
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

    const { receiptData, userId, transactionId, originalTransactionId, productId, purchaseDate, expiresDate, isTrialPeriod } = await req.json() as ReceiptValidationRequest;

    console.log('Receipt validation request:', {
      userId,
      productId,
      transactionId,
      isTrialPeriod,
      hasReceiptData: !!receiptData,
      hasExpiresDate: !!expiresDate
    });

    // Validate with Apple's servers
    const appleResponse = await validateWithApple(receiptData);
    
    if (appleResponse.status !== 0) {
      console.error('Apple receipt validation failed:', appleResponse.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Receipt validation failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store the receipt
    const { error: receiptError } = await supabase
      .from('app_store_receipts')
      .upsert({
        user_id: userId,
        receipt_data: receiptData,
        transaction_id: transactionId,
        original_transaction_id: originalTransactionId,
        product_id: productId,
        purchase_date: purchaseDate,
        expires_date: expiresDate,
        is_trial_period: isTrialPeriod,
        is_in_intro_offer_period: false,
        validation_status: 'valid'
      }, {
        onConflict: 'transaction_id'
      });

    if (receiptError) {
      console.error('Error storing receipt:', receiptError);
      throw receiptError;
    }

    // Get product info for subscription creation
    const { data: product } = await supabase
      .from('subscription_products')
      .select('trial_period_days, billing_period')
      .eq('product_id', productId)
      .single();

    if (!product) {
      throw new Error(`Product not found: ${productId}`);
    }

    // Create or update subscription
    const now = new Date();
    const trialEndDate = isTrialPeriod && product.trial_period_days > 0
      ? new Date(now.getTime() + (product.trial_period_days * 24 * 60 * 60 * 1000))
      : null;

    const subscriptionEndDate = expiresDate ? new Date(expiresDate) :
      (product.billing_period === 'yearly' 
        ? new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000))
        : new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)));

    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        product_id: productId,
        status: isTrialPeriod ? 'in_trial' : 'active',
        trial_end_date: trialEndDate?.toISOString(),
        current_period_start: now.toISOString(),
        current_period_end: subscriptionEndDate.toISOString(),
        auto_renew: true,
        app_store_transaction_id: transactionId,
        app_store_original_transaction_id: originalTransactionId,
        updated_at: now.toISOString()
      }, {
        onConflict: 'app_store_original_transaction_id'
      })
      .select('*')
      .single();

    if (subError) {
      console.error('Error creating/updating subscription:', subError);
      throw subError;
    }

    console.log('Receipt validated and subscription updated for user:', userId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        subscription,
        validationStatus: 'valid'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Receipt validation error:', error);
    
    // Enhanced error logging for debugging
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred',
        errorType: error.name || 'UnknownError'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function validateWithApple(receiptData: string): Promise<AppleReceiptResponse> {
  // Try production first, then sandbox
  const productionUrl = 'https://buy.itunes.apple.com/verifyReceipt';
  const sandboxUrl = 'https://sandbox.itunes.apple.com/verifyReceipt';

  const requestBody = {
    'receipt-data': receiptData,
    'password': Deno.env.get('APP_STORE_SHARED_SECRET') // You'll need to add this secret
  };

  try {
    // Try production first
    const prodResponse = await fetch(productionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const prodResult = await prodResponse.json();
    
    // If production returns 21007, receipt is for sandbox
    if (prodResult.status === 21007) {
      console.log('Receipt is for sandbox, trying sandbox validation');
      const sandboxResponse = await fetch(sandboxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      return await sandboxResponse.json();
    }

    return prodResult;
  } catch (error) {
    console.error('Apple validation request failed:', error);
    throw error;
  }
}
