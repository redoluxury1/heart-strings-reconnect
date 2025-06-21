
import { Purchases } from '@revenuecat/purchases-capacitor';

export class RevenueCatConfig {
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const apiKey = process.env.VITE_REVENUECAT_API_KEY;
      if (!apiKey) {
        throw new Error('RevenueCat API key not configured');
      }
      
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
