
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/useSubscription';
import { Pause, Heart, Bot, Book, ArrowRightLeft, MessageSquare, Sparkles } from 'lucide-react';
import { Purchases, PurchasesPackage, LOG_LEVEL, PURCHASES_ERROR_CODE } from '@revenuecat/purchases-capacitor';

// Paywall component with Apple App Store compliance fixes:
// - Silent cancellation handling (no error on user cancel)
// - Gentle error messages with auto-skip to prevent rejection
// - Handles entitlement sync delays gracefully
interface OnboardingPaywallProps {
  onContinue: () => void;
  onSkip: () => void;
}

const OnboardingPaywall: React.FC<OnboardingPaywallProps> = ({
  onContinue,
  onSkip
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { refreshSubscription } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [monthlyPackage, setMonthlyPackage] = useState<PurchasesPackage | null>(null);
  const [annualPackage, setAnnualPackage] = useState<PurchasesPackage | null>(null);
  const [packagesLoading, setPackagesLoading] = useState(true);

  useEffect(() => {
    loadOfferings();
  }, []);

  // Debug log current offerings structure
  useEffect(() => {
    if (monthlyPackage || annualPackage) {
      console.log('Monthly package:', monthlyPackage);
      console.log('Annual package:', annualPackage);
    }
  }, [monthlyPackage, annualPackage]);

  const loadOfferings = async () => {
    try {
      // Check if we're running on native platform (iOS/Android, not web)
      const isNative = typeof window !== 'undefined' && 
                       window.Capacitor && 
                       window.Capacitor.platform !== 'web';
      
      if (!isNative) {
        console.log('Running in web browser - skipping RevenueCat initialization');
        setPackagesLoading(false);
        return;
      }

      // RevenueCat is already configured via RevenueCatConfig service
      // Just fetch offerings directly
      const offerings = await Purchases.getOfferings();
      const current = offerings?.current;
      
      if (!current) {
        console.error('No current offering available');
        setPackagesLoading(false);
        return;
      }

      // Find packages by their specific identifiers
      const monthlyPkg = current.availablePackages.find(p => p.identifier === '$rc_monthly');
      const annualPkg = current.availablePackages.find(p => p.identifier === '$rc_annual');

      setMonthlyPackage(monthlyPkg || null);
      setAnnualPackage(annualPkg || null);

      if (!monthlyPkg && !annualPkg) {
        console.error('No packages found with identifiers $rc_monthly or $rc_annual');
      }
    } catch (error) {
      console.error('Failed to load offerings:', error);
    } finally {
      setPackagesLoading(false);
    }
  };

  const handleSubscribe = async (pkg: PurchasesPackage | null) => {
    // Check if we're running on native platform (iOS/Android, not web)
    const isNative = typeof window !== 'undefined' && 
                     window.Capacitor && 
                     window.Capacitor.platform !== 'web';
    
    if (!isNative) {
      toast({
        title: "Demo Mode",
        description: "Subscriptions only work on actual iOS/Android devices. In the app, this would open the purchase flow.",
      });
      // For demo purposes, just continue
      setTimeout(() => onContinue(), 1500);
      return;
    }

    if (!pkg) {
      // No package available - allow user to continue
      onSkip();
      return;
    }
    
    setLoading(true);
    try {
      console.log('🛒 [PAYWALL] Starting purchase flow for package:', pkg.identifier);
      
      // Step 1: Complete the purchase
      await Purchases.purchasePackage({ aPackage: pkg });
      console.log('🛒 [PAYWALL] Purchase completed with RevenueCat');
      
      // Step 2: Force sync purchases with RevenueCat servers
      console.log('🛒 [PAYWALL] Syncing purchases...');
      await Purchases.syncPurchases();
      
      // Step 3: Get customer info and check entitlements
      console.log('🛒 [PAYWALL] Getting customer info...');
      let { customerInfo } = await Purchases.getCustomerInfo();
      
      // Check if ANY entitlement is active
      const checkActiveEntitlement = (info: any) => {
        return info.entitlements.active['entl51d1c435c2'] !== undefined ||
               info.entitlements.active['entl2a85cac069'] !== undefined ||
               Object.keys(info.entitlements.active || {}).length > 0;
      };
      
      let hasActiveEntitlement = checkActiveEntitlement(customerInfo);
      
      // Step 4: If no active entitlement, retry once after delay
      if (!hasActiveEntitlement) {
        console.log('🛒 [PAYWALL] Entitlement not found immediately, retrying in 1.5s...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const retryResult = await Purchases.getCustomerInfo();
        customerInfo = retryResult.customerInfo;
        hasActiveEntitlement = checkActiveEntitlement(customerInfo);
      }
      
      // Step 5: Validate receipt with backend for our database
      if (hasActiveEntitlement) {
        try {
          console.log('🛒 [PAYWALL] Starting backend receipt validation...');
          const { ReceiptValidator } = await import('@/services/nativeStoreKit/receiptValidator');
          
          const entitlements = customerInfo.entitlements.active || {};
          const entitlementKeys = Object.keys(entitlements);
          
          if (entitlementKeys.length > 0) {
            const entitlement = entitlements[entitlementKeys[0]];
            const productId = entitlement.productIdentifier;
            
            const transaction = {
              transactionId: entitlement.latestPurchaseDate || `${Date.now()}`,
              originalTransactionId: entitlement.originalPurchaseDate || entitlement.latestPurchaseDate || `${Date.now()}`,
              productId: productId,
              purchaseDate: new Date(entitlement.latestPurchaseDate || Date.now()),
              expiresDate: entitlement.expirationDate ? new Date(entitlement.expirationDate) : undefined,
              isTrialPeriod: entitlement.willRenew || false,
              receiptData: (customerInfo as any).originalAppUserId || ''
            };
            
            await ReceiptValidator.validateReceipt(transaction);
            console.log('🛒 [PAYWALL] Backend validation completed');
          }
        } catch (validationError) {
          console.error('🛒 [PAYWALL] Backend validation failed (non-critical):', validationError);
          // Don't block user if backend validation fails - RevenueCat entitlement is what matters
        }
      }
      
      // Step 6: Refresh subscription status
      await refreshSubscription();
      
      // Step 7: Show appropriate message based on entitlement status
      if (hasActiveEntitlement) {
        toast({
          title: "Welcome to Premium!",
          description: "Your subscription is now active. Enjoy all the exclusive features.",
        });
        
        setTimeout(() => {
          setLoading(false);
          onContinue();
        }, 500);
      } else {
        // Entitlement still not active after retry
        console.warn('🛒 [PAYWALL] Entitlement still not active after retry');
        toast({
          title: "Purchase Complete",
          description: "Purchase complete, but still syncing. Please try reopening the app in a few seconds.",
        });
        
        setTimeout(() => {
          setLoading(false);
          onContinue();
        }, 1000);
      }
    } catch (error: any) {
      console.error('Purchase error details:', error);
      
      setLoading(false);
      
      // Handle user cancellation silently (no error shown)
      if (error?.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        console.log('User cancelled purchase');
        return;
      }
      
      // For any other error, show a gentle message and allow skip
      toast({
        title: "Continue Without Premium",
        description: "You can try subscribing again later from Settings.",
      });
      
      // Automatically skip to main app after brief delay
      setTimeout(() => {
        onSkip();
      }, 2500);
      
      return;
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Pause className="h-6 w-6 text-[#2e4059]" />,
      text: "Pause during conflict to take a breath"
    },
    {
      icon: <Heart className="h-6 w-6 text-[#D4704B]" />,
      text: "Tools to heal and repair after tough moments"
    },
    {
      icon: <Book className="h-6 w-6 text-[#B8A5C7]" />,
      text: "Save your progress and come back when you're ready"
    },
    {
      icon: <ArrowRightLeft className="h-6 w-6 text-[#2e4059]" />,
      text: "Strategies to reconnect when you're feeling stuck"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-[#D4704B]" />,
      text: "Full access to every prompt and conversation tool"
    },
    {
      icon: <Bot className="h-6 w-6 text-[#B8A5C7]" />,
      text: "Early access to our next-gen AI relationship coach"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-[#2e4059]" />,
      text: "Premium-only modules for intimacy, parenting, finances, and more"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F2F0] py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-cormorant font-bold text-[#2e4059] mb-4">
            Silence builds walls. Words build bridges.
          </h1>
          <p className="text-[#2e4059]/80 text-base leading-relaxed">
            Unlock powerful tools to help you reconnect, repair, and grow when things feel hard.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <p className="text-[#2e4059] text-sm md:text-base leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* Subscription Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {packagesLoading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-[#2e4059]/60">Loading subscription options...</p>
            </div>
          ) : (monthlyPackage || annualPackage) ? (
            <>
              {monthlyPackage && (
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-[#2e4059] mb-2">Premium Monthly</h3>
                    <p className="text-sm text-green-600 mb-2">3-day free trial</p>
                    <p className="text-2xl font-bold text-[#2e4059] mb-6">
                      {monthlyPackage.product.priceString}
                    </p>
                    <Button
                      onClick={() => handleSubscribe(monthlyPackage)}
                      disabled={loading}
                      className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
                    >
                      {loading ? 'Processing...' : 'Start Monthly Trial'}
                    </Button>
                  </div>
                </div>
              )}
              
              {annualPackage && (
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-[#2e4059] mb-2">Premium Yearly</h3>
                    <p className="text-sm text-green-600 mb-2">7-day free trial</p>
                    <p className="text-2xl font-bold text-[#2e4059]">
                      {annualPackage.product.priceString}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">(billed annually)</p>
                    <Button
                      onClick={() => handleSubscribe(annualPackage)}
                      disabled={loading}
                      className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
                    >
                      {loading ? 'Processing...' : 'Start Yearly Trial'}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="col-span-full text-center py-8 bg-blue-50 rounded-lg p-6">
              <p className="text-[#2e4059] font-medium mb-2">
                📱 Subscriptions available on iOS & Android
              </p>
              <p className="text-[#2e4059]/60 text-sm">
                This is a web preview. On the actual app, users will see subscription pricing here and can purchase directly through the App Store.
              </p>
              <Button
                onClick={onSkip}
                className="mt-4 bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
              >
                Continue to App (Demo)
              </Button>
            </div>
          )}
        </div>

        {/* Maybe Later Button */}
        <div className="text-center mb-4">
          <Button
            onClick={onSkip}
            variant="ghost"
            className="text-[#2e4059]/60 hover:text-[#2e4059] text-sm underline-offset-4 hover:underline"
          >
            Maybe Later
          </Button>
        </div>

        {/* Subscription Information - Required by Apple */}
        <div className="bg-white/50 rounded-lg p-4 mb-4 text-xs text-[#2e4059]/80 space-y-2">
          <p className="font-medium text-[#2e4059]">Subscription Information:</p>
          <p>• Monthly: $12.99/month after 3-day free trial</p>
          <p>• Yearly: $129/year after 7-day free trial</p>
          <p>• Payment charged to Apple ID at purchase confirmation</p>
          <p>• Auto-renews unless canceled 24 hours before period ends</p>
          <p>• Manage subscriptions in App Store Account Settings</p>
        </div>

        {/* Legal Links - Required by Apple App Store Guidelines */}
        <div className="text-center space-y-3">
          <p className="text-xs text-[#1a2332]">
            Cancel anytime from your App Store account settings.<br />
            <span className="italic">100% of your support goes toward building better tools to make stronger relationships.</span>
          </p>
          
          <div className="flex justify-center gap-4 text-sm font-medium">
            <a 
              href="/terms" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#2e4059] hover:underline underline-offset-4"
            >
              Terms of Use (EULA)
            </a>
            <span className="text-[#2e4059]/30">•</span>
            <a 
              href="/privacy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#2e4059] hover:underline underline-offset-4"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPaywall;
