
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionService } from '@/services/subscriptionService';
import { Subscription, SubscriptionProduct } from '@/types/subscription';

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    // Check for debug mode first
    const debugMode = SubscriptionService.isDebugModeActive();
    
    if (!user) {
      setSubscription(null);
      setHasActiveSubscription(true); // bypass paywall in preview when not logged in
      setLoading(false);
      return;
    }

    if (debugMode) {
      setSubscription(null);
      setHasActiveSubscription(true); // bypass paywall in debug mode
      setLoading(false);
      return;
    }

    loadSubscriptionData();
  }, [user]);

  const loadSubscriptionData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [currentSub, availableProducts, hasActive] = await Promise.all([
        SubscriptionService.getCurrentSubscription(user.id),
        SubscriptionService.getSubscriptionProducts(),
        SubscriptionService.hasActiveSubscription(user.id)
      ]);

      setSubscription(currentSub);
      setProducts(availableProducts);
      setHasActiveSubscription(hasActive);
    } catch (error) {
      console.error('Error loading subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasFeatureAccess = async (featureKey: string): Promise<boolean> => {
    if (!user) return true; // bypass in preview without login
    return SubscriptionService.hasFeatureAccess(user.id, featureKey);
  };

  const refreshSubscription = async () => {
    await loadSubscriptionData();
  };

  return {
    subscription,
    products,
    loading,
    hasActiveSubscription,
    hasFeatureAccess,
    refreshSubscription
  };
};
