
import { Subscription, SubscriptionProduct } from '@/types/subscription';
import { supabase } from '@/integrations/supabase/client';
import { StoreKitService, PurchaseTransaction } from './storeKitService';
import { EntitlementService } from './nativeStoreKit/entitlementService';

// Define feature keys for different sections
export const FEATURE_KEYS = {
  MID_FIGHT_ACCESS: 'entl51d1c435c2',
  POST_CONFLICT_ACCESS: 'entl51d1c435c2', 
  LOVE_NOTES_ACCESS: 'entl2a85cac069',
  ARCHIVE_ACCESS: 'entl2a85cac069'
} as const;

// Demo account bypass removed - Apple reviewers will use sandbox subscriptions to test the full purchase flow

// Debug mode helper function - ONLY works in development builds
// Uses Vite's import.meta.env.DEV which is properly replaced at build time
const isDebugModeEnabled = (): boolean => {
  // import.meta.env.DEV is replaced at build time - cannot be manipulated at runtime
  if (!import.meta.env.DEV) {
    return false;
  }
  
  // Check localStorage for debug bypass (only in dev builds)
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
    console.log('💳 [SUBSCRIPTION] handlePurchase called for user:', userId, 'product:', productId);
    console.log('💳 [SUBSCRIPTION] Current StoreKit environment:', this.storeKit.getServiceInfo());
    
    try {
      console.log('💳 [SUBSCRIPTION] Step 1: Initiating StoreKit purchase');
      const transaction = await this.storeKit.purchaseProduct(productId);
      console.log('💳 [SUBSCRIPTION] Step 2: StoreKit purchase completed, creating subscription');
      
      const subscription = await this.createOrUpdateSubscription(userId, transaction);
      console.log('💳 [SUBSCRIPTION] Step 3: Subscription created/updated:', subscription?.id);
      
      await this.storeKit.finishTransaction(transaction.transactionId);
      console.log('💳 [SUBSCRIPTION] Step 4: Transaction finished');
      
      console.log('💳 [SUBSCRIPTION SUCCESS] Purchase handled successfully');
      return subscription;
    } catch (error) {
      console.error('💳 [SUBSCRIPTION FAILED] Purchase failed:', {
        message: error.message,
        stack: error.stack,
        userId,
        productId
      });
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
    console.log('💾 [DATABASE] Creating/updating subscription for user:', userId);
    console.log('💾 [DATABASE] Transaction:', {
      productId: transaction.productId,
      transactionId: transaction.transactionId,
      isTrialPeriod: transaction.isTrialPeriod
    });
    
    try {
      console.log('💾 [DATABASE] Step 1: Fetching product details for:', transaction.productId);
      const { data: product, error: productError } = await supabase
        .from('subscription_products')
        .select('trial_period_days, billing_period')
        .eq('product_id', transaction.productId)
        .single();

      if (productError) {
        console.error('💾 [DATABASE ERROR] Failed to fetch product:', productError);
        throw productError;
      }

      if (!product) {
        console.error('💾 [DATABASE ERROR] Product not found:', transaction.productId);
        throw new Error(`Product not found: ${transaction.productId}`);
      }
      
      console.log('💾 [DATABASE] Step 2: Product found:', product);

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
      
      console.log('💾 [DATABASE] Step 3: Upserting subscription data:', {
        userId: subscriptionData.user_id,
        productId: subscriptionData.product_id,
        status: subscriptionData.status,
        trialEndDate: subscriptionData.trial_end_date,
        periodEnd: subscriptionData.current_period_end
      });

      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .upsert(subscriptionData, {
          onConflict: 'app_store_original_transaction_id'
        })
        .select('*')
        .single();

      if (error) {
        console.error('💾 [DATABASE ERROR] Failed to upsert subscription:', error);
        throw error;
      }
      
      console.log('💾 [DATABASE SUCCESS] Subscription created/updated:', subscription?.id);
      return subscription as unknown as Subscription;
    } catch (error) {
      console.error('💾 [DATABASE FAILED] Error in createOrUpdateSubscription:', {
        message: error.message,
        stack: error.stack,
        userId,
        transactionId: transaction.transactionId
      });
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

  // Debug helper methods - ONLY work in development builds
  static enableDebugMode(): void {
    if (!import.meta.env.DEV) {
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
