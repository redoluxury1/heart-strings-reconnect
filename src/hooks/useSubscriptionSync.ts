
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionService } from '@/services/subscriptionService';

export const useSubscriptionSync = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Check subscription status when app becomes active
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        console.log('App became active, checking subscription status...');
        
        try {
          // This will trigger a fresh check of subscription status
          await SubscriptionService.hasActiveSubscription(user.id);
        } catch (error) {
          console.error('Error syncing subscription status:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial check
    handleVisibilityChange();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);
};
