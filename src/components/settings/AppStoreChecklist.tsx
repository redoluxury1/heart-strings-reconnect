
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle, ExternalLink } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'complete' | 'in-progress' | 'not-started';
  category: 'assets' | 'config' | 'legal' | 'subscription' | 'production' | 'testing';
  link?: string;
}

const AppStoreChecklist: React.FC = () => {
  const [items] = useState<ChecklistItem[]>([
    {
      id: 'app-icons',
      title: 'App Icons',
      description: 'Create 1024x1024 master icon and all required iOS sizes',
      status: 'not-started',
      category: 'assets'
    },
    {
      id: 'splash-screens',
      title: 'Splash Screens',
      description: 'Design launch screens for all device sizes',
      status: 'not-started',
      category: 'assets'
    },
    {
      id: 'screenshots',
      title: 'App Store Screenshots',
      description: 'Take screenshots for iPhone and iPad (if supported)',
      status: 'not-started',
      category: 'assets'
    },
    {
      id: 'bundle-id',
      title: 'Bundle ID Configuration',
      description: 'Update to production bundle ID (com.yourcompany.bridgeforcouples)',
      status: 'in-progress',
      category: 'config'
    },
    {
      id: 'signing',
      title: 'Code Signing',
      description: 'Set up Apple Developer account and certificates',
      status: 'not-started',
      category: 'config'
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      description: 'Create comprehensive privacy policy',
      status: 'complete',
      category: 'legal'
    },
    {
      id: 'terms-of-service',
      title: 'Terms of Service',
      description: 'Draft terms of service agreement',
      status: 'complete',
      category: 'legal'
    },
    {
      id: 'app-store-description',
      title: 'App Store Listing',
      description: 'Write description, keywords, and marketing copy',
      status: 'not-started',
      category: 'legal'
    },
    {
      id: 'storekit-integration',
      title: 'Real StoreKit Integration',
      description: 'Replace mock service with actual iOS StoreKit',
      status: 'not-started',
      category: 'subscription'
    },
    {
      id: 'app-store-products',
      title: 'App Store Connect Products',
      description: 'Set up subscription products in App Store Connect',
      status: 'not-started',
      category: 'subscription'
    },
    {
      id: 'receipt-validation',
      title: 'Receipt Validation',
      description: 'Configure Apple shared secret for receipt validation',
      status: 'not-started',
      category: 'subscription'
    },
    {
      id: 'production-environment',
      title: 'Production Environment',
      description: 'Set up production Supabase and domain configuration',
      status: 'not-started',
      category: 'production'
    },
    {
      id: 'performance-optimization',
      title: 'Performance Optimization',
      description: 'Optimize bundle size and loading performance',
      status: 'not-started',
      category: 'production'
    },
    {
      id: 'device-testing',
      title: 'Device Testing',
      description: 'Test on real iOS devices',
      status: 'not-started',
      category: 'testing'
    },
    {
      id: 'testflight-beta',
      title: 'TestFlight Beta',
      description: 'Beta test through TestFlight',
      status: 'not-started',
      category: 'testing'
    },
    {
      id: 'app-store-guidelines',
      title: 'App Store Review Guidelines',
      description: 'Ensure compliance with Apple guidelines',
      status: 'not-started',
      category: 'testing'
    }
  ]);

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'not-started':
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="secondary">Not Started</Badge>;
    }
  };

  const getCategoryBadge = (category: ChecklistItem['category']) => {
    const colors = {
      assets: 'bg-blue-100 text-blue-800',
      config: 'bg-purple-100 text-purple-800',
      legal: 'bg-red-100 text-red-800',
      subscription: 'bg-green-100 text-green-800',
      production: 'bg-orange-100 text-orange-800',
      testing: 'bg-indigo-100 text-indigo-800'
    };
    
    return <Badge className={colors[category]}>{category.charAt(0).toUpperCase() + category.slice(1)}</Badge>;
  };

  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const completedCount = items.filter(item => item.status === 'complete').length;
  const totalCount = items.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          App Store Submission Checklist
          <Badge className="bg-blue-100 text-blue-800">
            {completedCount}/{totalCount} ({completionPercentage}%)
          </Badge>
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
            {getStatusIcon(item.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                <div className="flex space-x-1">
                  {getCategoryBadge(item.category)}
                  {getStatusBadge(item.status)}
                </div>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-800"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Learn More
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Next Steps</h3>
          <p className="text-sm text-blue-700 mb-3">
            Focus on these critical items first for App Store submission:
          </p>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Set up Apple Developer account and create app in App Store Connect</li>
            <li>Design and generate all required app icons and assets</li>
            <li>Replace mock StoreKit service with real iOS integration</li>
            <li>Create privacy policy and terms of service</li>
            <li>Test on real iOS devices and submit for TestFlight beta</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppStoreChecklist;
