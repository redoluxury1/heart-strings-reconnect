
import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export const SubscriptionStatus: React.FC = () => {
  const { subscription, hasActiveSubscription, loading, refreshSubscription } = useSubscription();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#2e4059]"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasActiveSubscription || !subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
            Free Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            You're currently using the free version with limited features.
          </p>
          <Button className="bg-[#2e4059] hover:bg-[#2e4059]/90">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isInTrial = subscription.status === 'in_trial';
  const renewalDate = new Date(subscription.current_period_end);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Crown className="h-5 w-5 mr-2 text-yellow-500" />
          Premium Subscription
          {isInTrial && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Free Trial
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {isInTrial ? 'Trial ends' : 'Renews'} on {format(renewalDate, 'MMM dd, yyyy')}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Status:</span>
            <span className="capitalize font-medium">
              {subscription.status.replace('_', ' ')}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Auto-renewal:</span>
            <span className={subscription.auto_renew ? 'text-green-600' : 'text-red-600'}>
              {subscription.auto_renew ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Button
            variant="outline"
            onClick={refreshSubscription}
            className="w-full"
          >
            Refresh Status
          </Button>
          <Button
            variant="ghost"
            className="w-full text-red-600 hover:text-red-700"
            onClick={() => window.open('https://apps.apple.com/account/subscriptions', '_blank', 'noopener,noreferrer')}
          >
            Manage Subscription
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          Subscription is managed through the App Store. To cancel or modify your subscription, 
          please use your device's App Store settings.
        </p>
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
