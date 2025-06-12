
import { Subscription, SubscriptionProduct } from '@/types/subscription';

// Define feature keys for different sections
export const FEATURE_KEYS = {
  MID_FIGHT_ACCESS: 'mid_fight_access',
  POST_CONFLICT_ACCESS: 'post_conflict_access',
  RECONNECT_ACCESS: 'reconnect_access',
  LOVE_NOTES_ACCESS: 'love_notes_access',
  ARCHIVE_ACCESS: 'archive_access',
  QUIZ_ACCESS: 'quiz_access'
} as const;

// Temporary mock implementation until database tables are created
export class SubscriptionService {
  // Check if user has active subscription
  static async hasActiveSubscription(userId: string): Promise<boolean> {
    console.log('SubscriptionService.hasActiveSubscription called for user:', userId);
    // Mock: return false until database is set up
    // In production, this would check the subscriptions table
    return false;
  }

  // Check if user has specific feature access
  static async hasFeatureAccess(userId: string, featureKey: string): Promise<boolean> {
    console.log('SubscriptionService.hasFeatureAccess called for user:', userId, 'feature:', featureKey);
    
    // First check if user has active subscription
    const hasActiveSubscription = await this.hasActiveSubscription(userId);
    
    if (!hasActiveSubscription) {
      // No subscription = no premium feature access
      return false;
    }
    
    // If they have a subscription, check if the feature is included
    // For now, all features are included in any subscription
    const premiumFeatures = [
      FEATURE_KEYS.MID_FIGHT_ACCESS,
      FEATURE_KEYS.POST_CONFLICT_ACCESS,
      FEATURE_KEYS.RECONNECT_ACCESS,
      FEATURE_KEYS.LOVE_NOTES_ACCESS,
      FEATURE_KEYS.ARCHIVE_ACCESS,
      FEATURE_KEYS.QUIZ_ACCESS
    ];
    
    return premiumFeatures.includes(featureKey as any);
  }

  // Get user's current subscription
  static async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    console.log('SubscriptionService.getCurrentSubscription called for user:', userId);
    // Mock: return null until database is set up
    return null;
  }

  // Get available subscription products
  static async getSubscriptionProducts(): Promise<SubscriptionProduct[]> {
    console.log('SubscriptionService.getSubscriptionProducts called');
    // Mock: return sample products for UI testing
    return [
      {
        id: 'mock-monthly',
        product_id: 'premium_monthly',
        name: 'Premium Monthly',
        description: 'Full access to all premium features',
        price_tier: '$9.99/month',
        billing_period: 'monthly',
        trial_period_days: 30,
        features: [
          'Unlimited access to all relationship tools',
          'Advanced communication patterns analysis',
          'Personalized insights and recommendations'
        ],
        active: true
      },
      {
        id: 'mock-yearly',
        product_id: 'premium_yearly',
        name: 'Premium Yearly',
        description: 'Full access to all premium features - Best Value!',
        price_tier: '$99.99/year',
        billing_period: 'yearly',
        trial_period_days: 30,
        features: [
          'Unlimited access to all relationship tools',
          'Advanced communication patterns analysis',
          'Personalized insights and recommendations',
          'Priority customer support'
        ],
        active: true
      }
    ];
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
    console.log('SubscriptionService.createOrUpdateSubscription called for user:', userId, transactionData);
    // Mock: return null until database is set up
    return null;
  }

  // Handle subscription cancellation
  static async cancelSubscription(userId: string): Promise<boolean> {
    console.log('SubscriptionService.cancelSubscription called for user:', userId);
    // Mock: return false until database is set up
    return false;
  }
}
