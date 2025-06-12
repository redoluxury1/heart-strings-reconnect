
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionService } from '@/services/subscriptionService';
import { Check, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SubscriptionUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionUpgradeModal: React.FC<SubscriptionUpgradeModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const { loading, refreshSubscription } = useSubscription();
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);

  const handlePurchase = async (productId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase a subscription.",
        variant: "destructive"
      });
      return;
    }

    setPurchasing(productId);
    
    try {
      console.log('Initiating purchase for product:', productId);
      
      const subscription = await SubscriptionService.handlePurchase(user.id, productId);
      
      if (subscription) {
        toast({
          title: "Purchase Successful!",
          description: "Welcome to Premium! You now have access to all features.",
        });
        
        // Refresh subscription data
        refreshSubscription();
        onClose();
      } else {
        throw new Error('Failed to create subscription');
      }
    } catch (error: any) {
      console.error('Purchase failed:', error);
      toast({
        title: "Purchase Failed",
        description: error.message || "There was a problem processing your purchase. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPurchasing(null);
    }
  };

  const handleRestorePurchases = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to restore purchases.",
        variant: "destructive"
      });
      return;
    }

    setRestoring(true);
    
    try {
      console.log('Restoring purchases...');
      
      const subscriptions = await SubscriptionService.restorePurchases(user.id);
      
      if (subscriptions.length > 0) {
        toast({
          title: "Purchases Restored!",
          description: `Successfully restored ${subscriptions.length} subscription(s).`,
        });
        
        // Refresh subscription data
        refreshSubscription();
        onClose();
      } else {
        toast({
          title: "No Purchases Found",
          description: "We couldn't find any previous purchases to restore.",
        });
      }
    } catch (error: any) {
      console.error('Restore purchases failed:', error);
      toast({
        title: "Restore Failed",
        description: error.message || "There was a problem restoring your purchases. Please try again.",
        variant: "destructive"
      });
    } finally {
      setRestoring(false);
    }
  };

  const features = [
    'Unlimited access to all relationship tools',
    'Advanced communication pattern analysis',
    'Personalized insights and recommendations',
    'Priority customer support',
    'Exclusive partner sync features',
    'Advanced conflict resolution guides',
    'First access to our upcoming real-time AI relationship coach'
  ];

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#2e4059]"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-[#2e4059]">
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Features List */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Premium Features:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-sm text-gray-700">{feature}</span>
                    {index === features.length - 1 && (
                      <div className="text-xs text-gray-500 mt-1 italic">
                        Coming soon: Be the first to try our emotionally intelligent AI coach — it's like having a therapist in your pocket.
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscription Plans */}
          <div className="space-y-3">
            {/* Monthly Plan */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Premium Monthly</h4>
                <span className="text-lg font-semibold text-[#2e4059]">
                  $12.99/month
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Full access to all premium features</p>
              <p className="text-xs text-green-600 mb-3">
                3-day free trial
              </p>
              <Button
                onClick={() => handlePurchase('com.bridgeforcouples.premium.monthly')}
                disabled={purchasing !== null || restoring}
                className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90"
              >
                {purchasing === 'com.bridgeforcouples.premium.monthly' ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Start Free Trial'
                )}
              </Button>
            </div>

            {/* Yearly Plan */}
            <div className="border-2 border-[#2e4059] rounded-lg p-4 relative">
              <div className="absolute -top-3 left-4">
                <div className="bg-[#2e4059] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Best Value
                </div>
              </div>
              <div className="flex justify-between items-center mb-2 mt-2">
                <h4 className="font-medium text-gray-900">Premium Yearly</h4>
                <span className="text-lg font-semibold text-[#2e4059]">
                  $129/year
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Full access to all premium features – Best Value</p>
              <p className="text-xs text-green-600 mb-3">
                7-day free trial
              </p>
              <Button
                onClick={() => handlePurchase('com.bridgeforcouples.premium.yearly')}
                disabled={purchasing !== null || restoring}
                className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90"
              >
                {purchasing === 'com.bridgeforcouples.premium.yearly' ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Start Free Trial'
                )}
              </Button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={handleRestorePurchases}
              disabled={purchasing !== null || restoring}
              className="w-full"
            >
              {restoring ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Restoring...
                </div>
              ) : (
                'Restore Purchases'
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={purchasing !== null || restoring}
              className="w-full text-gray-500"
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Subscription automatically renews unless canceled at least 24 hours before the end of the current period. 
            Manage your subscription in your Apple ID settings.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionUpgradeModal;
