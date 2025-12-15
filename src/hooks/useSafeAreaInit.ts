import { useEffect } from 'react';
import { isNativePlatform, isIOS } from '@/utils/platform';

/**
 * Hook to initialize safe area CSS custom property.
 * Sets 47px for native iOS (iPhone 16 Pro status bar height), 0 for web.
 */
export const useSafeAreaInit = () => {
  useEffect(() => {
    if (isNativePlatform() && isIOS()) {
      // Set 47px for notched iPhones (iPhone X and later)
      document.documentElement.style.setProperty('--safe-area-top', '47px');
    } else if (isNativePlatform()) {
      // Android - set a smaller default
      document.documentElement.style.setProperty('--safe-area-top', '24px');
    } else {
      // Web - no safe area needed
      document.documentElement.style.setProperty('--safe-area-top', '0px');
    }
  }, []);
};
