
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionService } from '@/services/subscriptionService';
import { useToast } from '@/hooks/use-toast';
import { Pause, Heart, Bot, Book, ArrowRightLeft, MessageSquare, Sparkles } from 'lucide-react';
import { Purchases, PurchasesOffering, PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { RevenueCatConfig } from '@/services/nativeStoreKit/revenueCatConfig';

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
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);

  useEffect(() => {
    loadOfferings();
  }, []);

  const loadOfferings = async () => {
    try {
      await RevenueCatConfig.initialize();
      const offerings = await Purchases.getOfferings();
      const defaultOffering = offerings.current || offerings.all['default'];
      
      if (defaultOffering) {
        setPackages(defaultOffering.availablePackages);
      }
    } catch (error) {
      console.error('Failed to load offerings:', error);
    } finally {
      setPackagesLoading(false);
    }
  };

  const handleSubscribe = async (packageOrProductId: PurchasesPackage | string) => {
    setLoading(true);
    try {
      let productId: string;
      
      if (typeof packageOrProductId === 'string') {
        // Fallback for hardcoded product IDs
        productId = packageOrProductId;
      } else {
        // Use the package's product identifier
        productId = packageOrProductId.product.identifier;
      }
      
      await SubscriptionService.handlePurchase(user!.id, productId);
      
      toast({
        title: "Welcome to Premium!",
        description: "Your subscription is now active. Enjoy all the exclusive features.",
        variant: "success"
      });
      
      onContinue();
    } catch (error) {
      console.error('Purchase failed:', error);
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase. Please try again.",
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
          ) : packages.length > 0 ? (
            packages.map((pkg) => {
              const isYearly = pkg.product.identifier.toLowerCase().includes('annual') || 
                             pkg.product.identifier.toLowerCase().includes('yearly') ||
                             pkg.packageType === 'ANNUAL';
              const isMonthly = pkg.product.identifier.toLowerCase().includes('monthly') ||
                              pkg.packageType === 'MONTHLY';
              
              if (!isYearly && !isMonthly) return null;
              
              return (
                <div key={pkg.identifier} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-[#2e4059] mb-2">
                      {isYearly ? 'Premium Yearly' : 'Premium Monthly'}
                    </h3>
                    <p className="text-sm text-green-600 mb-2">
                      {isYearly ? '7-day free trial' : '3-day free trial'}
                    </p>
                    <p className="text-2xl font-bold text-[#2e4059] mb-2">
                      {pkg.product.priceString}
                    </p>
                    {isYearly && (
                      <p className="text-xs text-gray-500 mb-4">
                        (billed annually)
                      </p>
                    )}
                    <Button
                      onClick={() => handleSubscribe(pkg)}
                      disabled={loading}
                      className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
                    >
                      {loading ? 'Processing...' : `Start ${isYearly ? 'Yearly' : 'Monthly'} Trial`}
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            // Fallback to hardcoded options if RevenueCat packages fail to load
            <>
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-[#2e4059] mb-2">Premium Monthly</h3>
                  <p className="text-sm text-green-600 mb-2">3-day free trial</p>
                  <p className="text-2xl font-bold text-[#2e4059] mb-6">$12.99/month</p>
                  <Button
                    onClick={() => handleSubscribe('monthly_premium')}
                    disabled={loading}
                    className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
                  >
                    {loading ? 'Processing...' : 'Start Monthly Trial'}
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-[#2e4059] mb-2">Premium Yearly</h3>
                  <p className="text-sm text-green-600 mb-2">7-day free trial</p>
                  <p className="text-2xl font-bold text-[#2e4059]">$10.75/month</p>
                  <p className="text-xs text-gray-500 mb-6">(billed annually at $129)</p>
                  <Button
                    onClick={() => handleSubscribe('yearly_premium')}
                    disabled={loading}
                    className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
                  >
                    {loading ? 'Processing...' : 'Start Yearly Trial'}
                  </Button>
                </div>
              </div>
            </>
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
