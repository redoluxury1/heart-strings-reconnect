import { Purchases } from '@revenuecat/purchases-capacitor';
import { RevenueCatConfig } from './revenueCatConfig';

export class EntitlementService {
  // Your RevenueCat entitlement identifiers
  static readonly ENTITLEMENTS = {
    PREMIUM_FEATURES: 'entl51d1c435c2',
    ADVANCED_FEATURES: 'entl2a85cac069'
  };

  static async hasEntitlement(entitlementId: string): Promise<boolean> {
    await RevenueCatConfig.initialize();
    
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return (customerInfo as any).entitlements?.active[entitlementId] !== undefined;
    } catch (error) {
      console.error('Failed to check entitlement:', error);
      return false;
    }
  }

  static async hasAnyActiveEntitlement(): Promise<boolean> {
    await RevenueCatConfig.initialize();
    
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return Object.keys((customerInfo as any).entitlements?.active || {}).length > 0;
    } catch (error) {
      console.error('Failed to check active entitlements:', error);
      return false;
    }
  }

  static async getActiveEntitlements(): Promise<string[]> {
    await RevenueCatConfig.initialize();
    
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return Object.keys((customerInfo as any).entitlements?.active || {});
    } catch (error) {
      console.error('Failed to get active entitlements:', error);
      return [];
    }
  }
}