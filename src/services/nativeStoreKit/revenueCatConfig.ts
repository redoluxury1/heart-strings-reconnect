
import { Purchases } from '@revenuecat/purchases-capacitor';

// Helper to check if we're in a native environment
const isNativeEnvironment = (): boolean => {
  return typeof window !== 'undefined' && 
         window.Capacitor && 
         window.Capacitor.platform !== 'web';
};

export class RevenueCatConfig {
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Don't try to initialize RevenueCat on web
    if (!isNativeEnvironment()) {
      console.log('RevenueCatConfig: Web environment detected, skipping initialization');
      return;
    }

    try {
      // Use production RevenueCat public SDK key
      const apiKey = 'appl_OnCrqXNltwcZinVNJnxEMJuiHOa';
      
      await Purchases.configure({ apiKey });
      console.log('RevenueCat initialized successfully');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize RevenueCat:', error);
      throw error;
    }
  }

  static isConfigured(): boolean {
    return this.isInitialized;
  }
}
