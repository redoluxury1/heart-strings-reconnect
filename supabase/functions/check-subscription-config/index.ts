import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔍 [CONFIG CHECK] Starting configuration check');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const appStoreSecret = Deno.env.get('APP_STORE_SHARED_SECRET');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check 1: APP_STORE_SHARED_SECRET exists
    const hasAppStoreSecret = !!appStoreSecret;
    const appStoreSecretLength = appStoreSecret ? appStoreSecret.length : 0;
    console.log('🔍 [CONFIG] APP_STORE_SHARED_SECRET:', {
      exists: hasAppStoreSecret,
      length: appStoreSecretLength
    });

    // Check 2: Subscription products
    const { data: products, error: productsError } = await supabase
      .from('subscription_products')
      .select('*')
      .eq('active', true);

    console.log('🔍 [CONFIG] Subscription products:', {
      count: products?.length || 0,
      error: productsError,
      products: products?.map(p => ({ 
        id: p.id, 
        product_id: p.product_id,
        name: p.name 
      }))
    });

    // Check 3: Recent subscriptions
    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    console.log('🔍 [CONFIG] Recent subscriptions:', {
      count: subscriptions?.length || 0,
      error: subscriptionsError,
      subscriptions: subscriptions?.map(s => ({
        id: s.id,
        status: s.status,
        product_id: s.product_id,
        created_at: s.created_at
      }))
    });

    // Check 4: App Store receipts
    const { data: receipts, error: receiptsError } = await supabase
      .from('app_store_receipts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    console.log('🔍 [CONFIG] Recent receipts:', {
      count: receipts?.length || 0,
      error: receiptsError,
      receipts: receipts?.map(r => ({
        id: r.id,
        product_id: r.product_id,
        validation_status: r.validation_status,
        created_at: r.created_at
      }))
    });

    // Compile results
    const configCheck = {
      success: true,
      timestamp: new Date().toISOString(),
      checks: {
        appStoreSecret: {
          configured: hasAppStoreSecret,
          length: appStoreSecretLength,
          status: hasAppStoreSecret ? '✅ Configured' : '❌ Missing'
        },
        subscriptionProducts: {
          count: products?.length || 0,
          status: (products?.length || 0) > 0 ? '✅ Products exist' : '⚠️ No products',
          error: productsError?.message
        },
        subscriptions: {
          count: subscriptions?.length || 0,
          status: '✅ Database accessible',
          error: subscriptionsError?.message
        },
        receipts: {
          count: receipts?.length || 0,
          status: '✅ Database accessible',
          error: receiptsError?.message
        }
      },
      recommendations: []
    };

    // Add recommendations
    if (!hasAppStoreSecret) {
      configCheck.recommendations.push('❌ CRITICAL: APP_STORE_SHARED_SECRET is not configured');
    } else if (appStoreSecretLength < 30) {
      configCheck.recommendations.push('⚠️ WARNING: APP_STORE_SHARED_SECRET seems too short (should be ~32 characters)');
    }

    if (!products || products.length === 0) {
      configCheck.recommendations.push('⚠️ No active subscription products found in database');
    }

    if (configCheck.recommendations.length === 0) {
      configCheck.recommendations.push('✅ All critical configurations look good');
    }

    console.log('🔍 [CONFIG CHECK] Results:', configCheck);

    return new Response(
      JSON.stringify(configCheck),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('🔍 [CONFIG CHECK ERROR]:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
