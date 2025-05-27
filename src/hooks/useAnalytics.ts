
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { trackFeatureUsage } from '@/services/analytics';

// Hook to automatically track page views and user sessions
export const useAnalytics = () => {
  const { user } = useAuth();

  const trackPageView = (pageName: string) => {
    trackFeatureUsage({
      featureName: pageName,
      action: 'page_view',
      userId: user?.id
    });
  };

  const trackEvent = (eventName: string, metadata?: Record<string, any>) => {
    trackFeatureUsage({
      featureName: eventName,
      action: 'event',
      userId: user?.id,
      metadata
    });
  };

  return {
    trackPageView,
    trackEvent
  };
};

// Hook for automatic page view tracking
export const usePageAnalytics = (pageName: string) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pageName);
  }, [pageName, trackPageView]);
};
