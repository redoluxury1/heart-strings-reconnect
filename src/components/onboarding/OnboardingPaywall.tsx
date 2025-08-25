
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Pause, Heart, Bot, Book, ArrowRightLeft, MessageSquare, Sparkles } from 'lucide-react';
import { Purchases, PurchasesPackage, LOG_LEVEL, PURCHASES_ERROR_CODE } from '@revenuecat/purchases-capacitor';

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
      // Configure RevenueCat with debug logging
      Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      await Purchases.configure({ apiKey: 'appl_OnCrqXNltwcZinVNJnxEMJuiHOa' });

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
    if (!pkg) return;
    
    setLoading(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
      
      // Check if premium entitlement is now active
      if (customerInfo.entitlements.active['premium']) {
        toast({
          title: "Welcome to Premium!",
          description: "Your subscription is now active. Enjoy all the exclusive features.",
        });
        onContinue();
      } else {
        toast({
          title: "Purchase incomplete",
          description: "Purchase was processed but premium access is not yet active. Please contact support.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Purchase failed:', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      console.error('Error userInfo:', error?.userInfo);
      
      // Ignore user-canceled purchases
      if (error?.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        return;
      }
      
      toast({
        title: "Purchase failed",
        description: `Error: ${error?.message || 'Please try again'} (Code: ${error?.code})`,
        variant: "destructive"
      });
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
            <div className="col-span-full text-center py-8">
              <p className="text-[#2e4059]/60">
                Unable to load subscription options. Please check your connection and try again.
              </p>
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

        {/* Additional Info */}
        <div className="text-center space-y-3">
          <p className="text-xs text-[#1a2332]">
            Cancel anytime.<br />
            <span className="italic">100% of your support goes toward building better tools to make stronger relationships.</span>
          </p>
          
          <div className="flex justify-center gap-6 text-xs text-[#2e4059]/60">
            <button className="hover:underline">Terms of Use</button>
            <button className="hover:underline">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPaywall;
