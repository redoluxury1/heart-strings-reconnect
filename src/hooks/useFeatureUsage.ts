
import { useCallback, useMemo } from 'react';
import { FeatureUsageService, UsageSummary } from '@/services/featureUsageService';

export const useFeatureUsage = () => {
  const trackFeatureCompletion = useCallback((featureName: string) => {
    FeatureUsageService.trackFeatureCompletion(featureName);
  }, []);

  const shouldShowPaywall = useCallback((): boolean => {
    return FeatureUsageService.shouldShowPaywall();
  }, []);

  const getUsageSummary = useCallback((): UsageSummary => {
    return FeatureUsageService.getUsageSummary();
  }, []);

  const resetUsage = useCallback(() => {
    FeatureUsageService.resetUsage();
  }, []);

  const getPaywallMessage = useCallback((): string => {
    return FeatureUsageService.getPaywallMessage();
  }, []);

  return {
    trackFeatureCompletion,
    shouldShowPaywall,
    getUsageSummary,
    resetUsage,
    getPaywallMessage
  };
};
