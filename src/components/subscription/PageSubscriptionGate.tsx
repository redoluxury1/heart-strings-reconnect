import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { setPostOnboardingRedirect } from '@/utils/redirectStorage';
import { Heart } from 'lucide-react';
import { isOnboardingBypassEnabled } from '@/utils/debugBypass';

interface PageSubscriptionGateProps {
  children: React.ReactNode;
  featureKey: string;
  pageName: string;
  pageDescription: string;
}

export const PageSubscriptionGate: React.FC<PageSubscriptionGateProps> = ({
  children,
  featureKey,
  pageName,
  pageDescription
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasFeatureAccess, hasActiveSubscription, loading } = useSubscription();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      // Dev bypass - skip all checks
      if (isOnboardingBypassEnabled()) {
        setHasAccess(true);
        return;
      }
      
      if (hasActiveSubscription) {
        const access = await hasFeatureAccess(featureKey);
        setHasAccess(access);
      } else {
        // Not subscribed - redirect to onboarding
        setPostOnboardingRedirect(location.pathname);
        navigate('/signup-choice', { replace: true });
      }
    };

    if (!loading) {
      checkAccess();
    }
  }, [hasActiveSubscription, hasFeatureAccess, featureKey, loading, location.pathname, navigate]);

  if (loading || hasAccess === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-8 h-8 mx-auto text-primary animate-pulse mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If we get here, user has access
  return <>{children}</>;
};