
import { useSubscription } from './useSubscription';
import { FEATURE_KEYS } from '@/services/subscriptionService';

export const useFeatureAccess = () => {
  const { hasActiveSubscription, hasFeatureAccess, loading } = useSubscription();

  return {
    // Main subscription status
    hasActiveSubscription,
    loading,
    
    // Specific feature access checks
    hasMidFightAccess: () => hasFeatureAccess(FEATURE_KEYS.MID_FIGHT_ACCESS),
    hasPostConflictAccess: () => hasFeatureAccess(FEATURE_KEYS.POST_CONFLICT_ACCESS),
    hasLoveNotesAccess: () => hasFeatureAccess(FEATURE_KEYS.LOVE_NOTES_ACCESS),
    hasArchiveAccess: () => hasFeatureAccess(FEATURE_KEYS.ARCHIVE_ACCESS),
    
    // Generic feature access check
    hasFeatureAccess
  };
};
