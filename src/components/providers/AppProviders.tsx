
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { NavigationLoadingProvider } from '@/contexts/NavigationLoadingContext';
import InterfaceProvider from '@/providers/InterfaceProvider';
import { SubscriptionProvider } from './SubscriptionProvider';

interface AppProvidersProps {
  children: React.ReactNode;
  queryClient: QueryClient;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children, queryClient }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavigationLoadingProvider>
          <AuthProvider>
            <InterfaceProvider>
              <SubscriptionProvider>
                {children}
                <Toaster />
              </SubscriptionProvider>
            </InterfaceProvider>
          </AuthProvider>
        </NavigationLoadingProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
