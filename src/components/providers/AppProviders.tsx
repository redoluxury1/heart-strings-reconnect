
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { InterfaceProvider } from "@/components/common/InterfaceProvider";
import { AuthProvider } from "@/contexts/AuthContext";

interface AppProvidersProps {
  children: ReactNode;
  queryClient: QueryClient;
}

const AppProviders = ({ children, queryClient }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <InterfaceProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" closeButton={true} />
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </InterfaceProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
