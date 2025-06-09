
import { Subscription, SubscriptionProduct } from '@/types/subscription';

// Temporary mock implementation until database tables are created
export class SubscriptionService {
  // Check if user has active subscription
  static async hasActiveSubscription(userId: string): Promise<boolean> {
    console.log('SubscriptionService.hasActiveSubscription called for user:', userId);
    // Mock: return false until database is set up
    return false;
  }

  // Check if user has specific feature access
  static async hasFeatureAccess(userId: string, featureKey: string): Promise<boolean> {
    console.log('SubscriptionService.hasFeatureAccess called for user:', userId, 'feature:', featureKey);
    // Mock: return false until database is set up
    return false;
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
