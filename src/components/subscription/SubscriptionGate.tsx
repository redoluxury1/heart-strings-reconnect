
import React, { useEffect, useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionUpgradeModal } from './SubscriptionUpgradeModal';
import { Lock } from 'lucide-react';

interface SubscriptionGateProps {
  children: React.ReactNode;
  featureKey: string;
  fallback?: React.ReactNode;
  showUpgradePrompt?: boolean;
}

export const SubscriptionGate: React.FC<SubscriptionGateProps> = ({
  children,
  featureKey,
  fallback,
  showUpgradePrompt = true
}) => {
  const { hasFeatureAccess, hasActiveSubscription, loading } = useSubscription();
  const [hasAccess, setHasAccess] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    checkAccess();
  }, [featureKey, hasActiveSubscription]);

  const checkAccess = async () => {
    if (hasActiveSubscription) {
      const access = await hasFeatureAccess(featureKey);
      setHasAccess(access);
    } else {
      setHasAccess(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#2e4059]"></div>
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showUpgradePrompt) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <Lock className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Feature</h3>
        <p className="text-gray-600 text-center mb-4">
          This feature is available with a premium subscription.
        </p>
        <button
          onClick={() => setShowUpgradeModal(true)}
          className="bg-[#2e4059] text-white px-6 py-2 rounded-full hover:bg-[#2e4059]/90"
        >
          Upgrade to Premium
        </button>
        
        <SubscriptionUpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      </div>
    );
  }

  return null;
};
</SubscriptionGate>

export default SubscriptionGate;
