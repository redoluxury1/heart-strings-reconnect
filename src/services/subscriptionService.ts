
import { Subscription, SubscriptionProduct } from '@/types/subscription';
import { supabase } from '@/integrations/supabase/client';
import { StoreKitService, PurchaseTransaction } from './storeKitService';
import { EntitlementService } from './nativeStoreKit/entitlementService';

// Define feature keys for different sections
export const FEATURE_KEYS = {
  MID_FIGHT_ACCESS: 'entl51d1c435c2',
  POST_CONFLICT_ACCESS: 'entl51d1c435c2', 
  RECONNECT_ACCESS: 'entl51d1c435c2',
  LOVE_NOTES_ACCESS: 'entl2a85cac069',
  ARCHIVE_ACCESS: 'entl2a85cac069'
} as const;

// Demo account for App Store reviewers - bypasses all subscription checks
// This allows App Store review team to test premium features without purchasing
const DEMO_ACCOUNT_EMAIL = 'test06@testing.com';

// Helper to check if current user is demo account
const isDemoAccount = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.email === DEMO_ACCOUNT_EMAIL;
  } catch {
    return false;
  }
};

// Debug mode helper function - ONLY works in development
const isDebugModeEnabled = (): boolean => {
  // Debug mode only available in development environment
  if (process.env.NODE_ENV !== 'development') {
    return false;
  }
  
  // Check localStorage for debug bypass
  if (typeof window !== 'undefined') {
    return localStorage.getItem('bypassSubscription') === 'true';
  }
  return false;
};

export class SubscriptionService {
  private static storeKit = StoreKitService.getInstance();

  // Check if user has active subscription
  static async hasActiveSubscription(userId: string): Promise<boolean> {
    console.log('SubscriptionService.hasActiveSubscription called for user:', userId);
    
    // Demo account bypass for App Store reviewers
    if (await isDemoAccount()) {
      console.log('Demo account detected: granting premium access');
      return true;
    }
    
    // Debug mode bypass
    if (isDebugModeEnabled()) {
      console.log('Debug mode: bypassing subscription check - returning true');
      return true;
    }
    
    try {
      // For native platforms (iOS/Android), check RevenueCat entitlements first
      if (this.storeKit.getCurrentEnvironment() === 'native') {
        const hasEntitlement = await EntitlementService.hasAnyActiveEntitlement();
        console.log('RevenueCat entitlement check result:', hasEntitlement);
        return hasEntitlement;
      }
      
      // For web/simulator environment, check Supabase database
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .in('status', ['active', 'in_trial'])
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking subscription:', error);
        return false;
      }

      if (!subscription) {
        return false;
      }

      // Check if subscription is still valid
      const now = new Date();
      const expiresAt = new Date(subscription.current_period_end);
      
      if (expiresAt < now) {
        // Subscription expired, update status
        await this.updateSubscriptionStatus(subscription.id, 'expired');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in hasActiveSubscription:', error);
      return false;
    }
  }

  // Check if user has specific feature access
  static async hasFeatureAccess(userId: string, featureKey: string): Promise<boolean> {
    console.log('SubscriptionService.hasFeatureAccess called for user:', userId, 'feature:', featureKey);
    
    // Demo account bypass for App Store reviewers
    if (await isDemoAccount()) {
      console.log('Demo account detected: granting feature access for', featureKey);
      return true;
    }
    
    // Debug mode bypass
    if (isDebugModeEnabled()) {
      console.log('Debug mode: bypassing feature access check - returning true');
      return true;
    }
    
    try {
      // For native platforms (iOS/Android), check RevenueCat entitlements directly
      if (this.storeKit.getCurrentEnvironment() === 'native') {
        const hasEntitlement = await EntitlementService.hasEntitlement(featureKey);
        console.log('RevenueCat feature entitlement check result:', hasEntitlement);
        return hasEntitlement;
      }
      
      // For web/simulator environment, fall back to subscription check
      const hasActiveSubscription = await this.hasActiveSubscription(userId);
      
      if (!hasActiveSubscription) {
        return false;
      }
      
      // All premium features are included in any active subscription
      const premiumFeatures = [
        FEATURE_KEYS.MID_FIGHT_ACCESS,
        FEATURE_KEYS.POST_CONFLICT_ACCESS,
        FEATURE_KEYS.RECONNECT_ACCESS,
        FEATURE_KEYS.LOVE_NOTES_ACCESS,
        FEATURE_KEYS.ARCHIVE_ACCESS
      ];
      
      return premiumFeatures.includes(featureKey as any);
    } catch (error) {
      console.error('Error checking feature access:', error);
      return false;
    }
  }

  // Get user's current subscription
  static async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    console.log('SubscriptionService.getCurrentSubscription called for user:', userId);
    
    try {
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .in('status', ['active', 'in_trial'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error getting subscription:', error);
        return null;
      }

      return subscription as unknown as Subscription;
    } catch (error) {
      console.error('Error in getCurrentSubscription:', error);
      return null;
    }
  }

  static async getSubscriptionProducts(): Promise<SubscriptionProduct[]> {
    console.log('SubscriptionService.getSubscriptionProducts called');
    
    try {
      const { data: products, error } = await supabase
        .from('subscription_products')
        .select('*')
        .eq('active', true)
        .order('billing_period', { ascending: true });

      if (error) {
        console.error('Error getting subscription products:', error);
        return [];
      }

      return (products || []) as unknown as SubscriptionProduct[];
    } catch (error) {
      console.error('Error in getSubscriptionProducts:', error);
      return [];
    }
  }

  static async handlePurchase(userId: string, productId: string): Promise<Subscription | null> {
    console.log('SubscriptionService.handlePurchase called for user:', userId, 'product:', productId);
    console.log('Current StoreKit environment:', this.storeKit.getServiceInfo());
    
    try {
      const transaction = await this.storeKit.purchaseProduct(productId);
      const subscription = await this.createOrUpdateSubscription(userId, transaction);
      await this.storeKit.finishTransaction(transaction.transactionId);
      return subscription;
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }

  static async restorePurchases(userId: string): Promise<Subscription[]> {
    console.log('SubscriptionService.restorePurchases called for user:', userId);
    console.log('Current StoreKit environment:', this.storeKit.getServiceInfo());
    
    try {
      const transactions = await this.storeKit.restorePurchases();
      const subscriptions: Subscription[] = [];
      
      for (const transaction of transactions) {
        const subscription = await this.createOrUpdateSubscription(userId, transaction);
        if (subscription) {
          subscriptions.push(subscription);
        }
        await this.storeKit.finishTransaction(transaction.transactionId);
      }
      
      return subscriptions;
    } catch (error) {
      console.error('Restore purchases failed:', error);
      throw error;
    }
  }

  private static async createOrUpdateSubscription(
    userId: string,
    transaction: PurchaseTransaction
  ): Promise<Subscription | null> {
    try {
      const { data: product } = await supabase
        .from('subscription_products')
        .select('trial_period_days, billing_period')
        .eq('product_id', transaction.productId)
        .single();

      if (!product) {
        throw new Error(`Product not found: ${transaction.productId}`);
      }

      const productData = product as unknown as { trial_period_days: number; billing_period: string };
      const now = new Date();
      const trialEndDate = transaction.isTrialPeriod && productData.trial_period_days > 0
        ? new Date(now.getTime() + (productData.trial_period_days * 24 * 60 * 60 * 1000))
        : null;

      const subscriptionEndDate = transaction.expiresDate || 
        (productData.billing_period === 'yearly' 
          ? new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000))
          : new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)));

      const subscriptionData = {
        user_id: userId,
        product_id: transaction.productId,
        status: transaction.isTrialPeriod ? 'in_trial' : 'active',
        trial_end_date: trialEndDate?.toISOString(),
        current_period_start: now.toISOString(),
        current_period_end: subscriptionEndDate.toISOString(),
        auto_renew: true,
        app_store_transaction_id: transaction.transactionId,
        app_store_original_transaction_id: transaction.originalTransactionId,
        updated_at: now.toISOString()
      };

      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .upsert(subscriptionData, {
          onConflict: 'app_store_original_transaction_id'
        })
        .select('*')
        .single();

      if (error) {
        console.error('Error creating/updating subscription:', error);
        throw error;
      }

      return subscription as unknown as Subscription;
    } catch (error) {
      console.error('Failed to create/update subscription:', error);
      throw error;
    }
  }

  private static async updateSubscriptionStatus(subscriptionId: string, status: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriptionId);

      if (error) {
        console.error('Error updating subscription status:', error);
      }
    } catch (error) {
      console.error('Failed to update subscription status:', error);
    }
  }

  static async cancelSubscription(userId: string): Promise<boolean> {
    console.log('SubscriptionService.cancelSubscription called for user:', userId);
    
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          auto_renew: false,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .in('status', ['active', 'in_trial']);

      if (error) {
        console.error('Error canceling subscription:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      return false;
    }
  }

  // Debug helper methods - ONLY work in development
  static enableDebugMode(): void {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('Debug mode only available in development environment');
      return;
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('bypassSubscription', 'true');
      console.log('Debug mode enabled: All subscription gates bypassed');
    }
  }

  static disableDebugMode(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bypassSubscription');
      console.log('Debug mode disabled: Subscription gates restored');
    }
  }

  static isDebugModeActive(): boolean {
    return isDebugModeEnabled();
  }

  // Environment helper methods
  static getStoreKitEnvironment(): string {
    return this.storeKit.getServiceInfo();
  }
}
