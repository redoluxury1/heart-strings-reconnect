import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Check, X } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionService } from '@/services/subscriptionService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionUpgradeModal: React.FC<SubscriptionUpgradeModalProps> = ({
  isOpen,
  onClose
}) => {
  const { products, refreshSubscription } = useSubscription();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Fallback products if none are loaded from the database
  const fallbackProducts = [
    {
      id: 'monthly-premium',
      product_id: 'monthly_premium',
      name: 'Monthly Premium',
      description: 'Full access to all premium features',
      billing_period: 'monthly' as const,
      trial_period_days: 7
    },
    {
      id: 'yearly-premium', 
      product_id: 'yearly_premium',
      name: 'Yearly Premium',
      description: 'Full access to all premium features with 17% savings',
      billing_period: 'yearly' as const,
      trial_period_days: 7
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  const handlePurchase = async (productId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to premium features.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await SubscriptionService.handlePurchase(user.id, productId);
      await refreshSubscription();
      
      toast({
        title: "Subscription activated!",
        description: "Welcome to Premium! Enjoy all the exclusive features.",
        variant: "success"
      });
      
      onClose();
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

  const handleRestore = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to restore purchases.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const restoredSubscriptions = await SubscriptionService.restorePurchases(user.id);
      await refreshSubscription();
      
      if (restoredSubscriptions.length > 0) {
        toast({
          title: "Purchases restored!",
          description: "Your subscription has been restored successfully.",
          variant: "success"
        });
        onClose();
      } else {
        toast({
          title: "No purchases found",
          description: "No previous purchases were found to restore.",
        });
      }
    } catch (error) {
      console.error('Restore failed:', error);
      toast({
        title: "Restore failed",
        description: "There was an error restoring your purchases. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Updated price display function for better mobile layout
  const getPriceDisplay = (product: any) => {
    if (product.billing_period === 'yearly') {
      return {
        mainPrice: '$10.75/month',
        billingInfo: '(billed annually at $129)',
        showSavings: true
      };
    } else if (product.billing_period === 'monthly') {
      return {
        mainPrice: '$12.99/month',
        billingInfo: null,
        showSavings: false
      };
    }
    return {
      mainPrice: 'Contact us for pricing',
      billingInfo: null,
      showSavings: false
    };
  };

  const features = [
    "Access to Pause Tool during conflicts",
    "Post-conflict repair and healing tools",
    "Archive and save your progress",
    "Advanced reconnection strategies",
    "Priority access to new features",
    "Full access to all conversation tools and prompts",
    "Be the first to access our next-gen AI relationship coach - launching soon for premium members only",
    "Exclusive modules for intimacy, parenting, finances, and more"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-yellow-500" />
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Unlock all features and strengthen your relationship with our premium tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {displayProducts.map((product) => {
              const priceInfo = getPriceDisplay(product);
              
              return (
                <div
                  key={product.id}
                  className="border rounded-lg p-4"
                >
                  {/* Mobile-first layout: stack vertically on small screens, horizontal on larger */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Product info section */}
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      {product.trial_period_days && (
                        <p className="text-sm text-green-600 mt-1">
                          {product.trial_period_days} day free trial
                        </p>
                      )}
                    </div>
                    
                    {/* Pricing and button section - stacked on mobile, side by side on desktop */}
                    <div className="flex flex-col items-center gap-2 md:ml-4">
                      {/* Pricing above button */}
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#2e4059]">
                          {priceInfo.mainPrice}
                        </div>
                        {priceInfo.billingInfo && (
                          <div className="text-xs text-gray-500">
                            {priceInfo.billingInfo}
                          </div>
                        )}
                      </div>
                      
                      {/* Subscribe button */}
                      <Button
                        onClick={() => handlePurchase(product.product_id)}
                        disabled={loading}
                        className="bg-[#2e4059] hover:bg-[#2e4059]/90 w-full md:w-auto"
                      >
                        {loading ? 'Processing...' : 'Subscribe'}
                      </Button>
                      
                      {/* Save 17% below button for yearly */}
                      {priceInfo.showSavings && (
                        <div className="text-sm text-green-600 font-medium">
                          Save 17%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="ghost"
              onClick={handleRestore}
              disabled={loading}
              className="text-sm"
            >
              Restore Purchases
            </Button>
            
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
