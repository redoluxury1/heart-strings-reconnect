
import { Purchases } from '@revenuecat/purchases-capacitor';

export class RevenueCatConfig {
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

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
