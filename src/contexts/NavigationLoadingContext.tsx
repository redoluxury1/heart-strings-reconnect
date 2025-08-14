import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from '@/components/common/LoadingScreen';

interface NavigationLoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType | undefined>(undefined);

export const useNavigationLoading = () => {
  const context = useContext(NavigationLoadingContext);
  if (context === undefined) {
    throw new Error('useNavigationLoading must be used within a NavigationLoadingProvider');
  }
  return context;
};

interface NavigationLoadingProviderProps {
  children: React.ReactNode;
}

export const NavigationLoadingProvider: React.FC<NavigationLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location.pathname);

  useEffect(() => {
    // Show loading when location changes
    if (location.pathname !== previousLocation) {
      setIsLoading(true);
      setPreviousLocation(location.pathname);
      
      // Hide loading after a short delay to allow page to render
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600); // Show loading for 600ms minimum
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, previousLocation]);

  const value = {
    isLoading,
    setIsLoading,
  };

  return (
    <NavigationLoadingContext.Provider value={value}>
      {isLoading && (
        <div className="fixed inset-0 z-[9999]">
          <LoadingScreen message="Loading..." />
        </div>
      )}
      {children}
    </NavigationLoadingContext.Provider>
  );
};