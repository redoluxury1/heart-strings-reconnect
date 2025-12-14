import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import OnboardingPaywall from '@/components/onboarding/OnboardingPaywall';
import { Lock, Heart, X, ArrowLeft } from 'lucide-react';
import ContentContainer from '@/components/common/ContentContainer';

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
  const { hasFeatureAccess, hasActiveSubscription, loading, refreshSubscription } = useSubscription();
  const [hasAccess, setHasAccess] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleGoBack = () => {
    // Navigate back to previous page, or home if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Debug logging for modal state
  React.useEffect(() => {
    if (isUpgradeModalOpen) {
      console.log('Modal state changed to open');
    }
  }, [isUpgradeModalOpen]);

  React.useEffect(() => {
    const checkAccess = async () => {
      if (hasActiveSubscription) {
        const access = await hasFeatureAccess(featureKey);
        setHasAccess(access);
      } else {
        setHasAccess(false);
      }
    };

    if (!loading) {
      checkAccess();
    }
  }, [hasActiveSubscription, hasFeatureAccess, featureKey, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-8 h-8 mx-auto text-primary animate-pulse mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-soft-cream/20 to-soft-blush/30 flex items-center justify-center p-4 pt-[calc(1rem+env(safe-area-inset-top))] relative">
          {/* Close button in top-right corner */}
          <button
            onClick={handleGoBack}
            className="absolute top-4 right-4 p-2 rounded-full bg-card/80 hover:bg-card border border-border/20 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <ContentContainer maxWidth="lg">
            <div className="bg-card/95 backdrop-blur-sm rounded-xl shadow-elegant border border-border/20 p-8 text-center max-w-2xl mx-auto">
              {/* Back button at top of card */}
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go back</span>
              </button>

              {/* Lock icon with gentle animation */}
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  {/* Gentle pulse ring */}
                  <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-primary/20 animate-pulse mx-auto"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-semibold text-foreground">
                  Unlock {pageName}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {pageDescription}
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <p className="text-sm text-primary font-medium">
                    This feature is part of Bridge For Couples Premium
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    console.log('Upgrade button clicked, setting modal open to true');
                    setIsUpgradeModalOpen(true);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  Upgrade to Premium
                </button>
                <p className="text-sm text-muted-foreground">
                  Start your free trial and unlock all relationship tools
                </p>
                
                {/* Maybe later button */}
                <button
                  onClick={handleGoBack}
                  className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors py-2"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </ContentContainer>
        </div>

        {isUpgradeModalOpen && (
          <div className="fixed inset-0 z-50 overflow-auto">
            <OnboardingPaywall
              onContinue={async () => {
                console.log('OnboardingPaywall onContinue called');
                setIsUpgradeModalOpen(false);
                // Refresh to check new subscription status
                await refreshSubscription();
                // Re-check access will happen automatically via useEffect
              }}
              onSkip={() => {
                console.log('OnboardingPaywall onSkip called');
                setIsUpgradeModalOpen(false);
                handleGoBack();
              }}
            />
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};