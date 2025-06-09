
import { supabase } from '@/integrations/supabase/client';
import { Subscription, SubscriptionProduct } from '@/types/subscription';

export class SubscriptionService {
  // Check if user has active subscription
  static async hasActiveSubscription(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('status, current_period_end')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();
    
    if (error || !data) return false;
    
    return new Date(data.current_period_end) > new Date();
  }

  // Check if user has specific feature access
  static async hasFeatureAccess(userId: string, featureKey: string): Promise<boolean> {
    // First check if user has active subscription
    const hasSubscription = await this.hasActiveSubscription(userId);
    if (!hasSubscription) return false;

    // Check if subscription includes this feature
    const { data, error } = await supabase
      .from('user_subscription_features')
      .select('*')
      .eq('user_id', userId)
      .eq('feature_key', featureKey)
      .single();
    
    return !error && !!data;
  }

  // Get user's current subscription
  static async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['active', 'in_trial'])
      .order('created_at', { ascending: false })
      .single();
    
    if (error) return null;
    
    return data as Subscription;
  }

  // Get available subscription products
  static async getSubscriptionProducts(): Promise<SubscriptionProduct[]> {
    const { data, error } = await supabase
      .from('subscription_products')
      .select('*')
      .eq('active', true)
      .order('price_tier');
    
    if (error) {
      console.error('Error fetching subscription products:', error);
      return [];
    }
    
    return data as SubscriptionProduct[];
  }

  // Create or update subscription after successful App Store purchase
  static async createOrUpdateSubscription(
    userId: string,
    transactionData: {
      productId: string;
      transactionId: string;
      originalTransactionId: string;
      purchaseDate: Date;
      expiresDate: Date;
      isTrialPeriod: boolean;
    }
  ): Promise<Subscription | null> {
    const subscriptionData = {
      user_id: userId,
      product_id: transactionData.productId,
      status: transactionData.isTrialPeriod ? 'in_trial' : 'active',
      current_period_start: transactionData.purchaseDate,
      current_period_end: transactionData.expiresDate,
      app_store_transaction_id: transactionData.transactionId,
      app_store_original_transaction_id: transactionData.originalTransactionId,
      auto_renew: true,
      trial_end_date: transactionData.isTrialPeriod ? transactionData.expiresDate : null
    };

    const { data, error } = await supabase
      .from('subscriptions')
      .upsert(subscriptionData, { onConflict: 'app_store_original_transaction_id' })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating/updating subscription:', error);
      return null;
    }
    
    return data as Subscription;
  }

  // Handle subscription cancellation
  static async cancelSubscription(userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('subscriptions')
      .update({ 
        status: 'canceled',
        auto_renew: false,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('status', 'active');
    
    return !error;
  }
}
