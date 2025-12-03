import { Purchases } from '@revenuecat/purchases-capacitor';
import { RevenueCatConfig } from './revenueCatConfig';
import { isNativePlatform } from '@/utils/platform';

export class EntitlementService {
  // Your RevenueCat entitlement identifiers
  static readonly ENTITLEMENTS = {
    PREMIUM_FEATURES: 'entl51d1c435c2',
    ADVANCED_FEATURES: 'entl2a85cac069'
  };

  static async hasEntitlement(entitlementId: string): Promise<boolean> {
    // Don't try to use RevenueCat on web - use official Capacitor API
    if (!isNativePlatform()) {
      console.log('EntitlementService: Web environment detected, skipping RevenueCat check');
      return false;
    }

    try {
      await RevenueCatConfig.initialize();
      const customerInfo = await Purchases.getCustomerInfo();
      return (customerInfo as any).entitlements?.active[entitlementId] !== undefined;
    } catch (error) {
      console.error('Failed to check entitlement:', error);
      return false;
    }
  }

  static async hasAnyActiveEntitlement(): Promise<boolean> {
    // Don't try to use RevenueCat on web - use official Capacitor API
    if (!isNativePlatform()) {
      console.log('EntitlementService: Web environment detected, skipping RevenueCat check');
      return false;
    }

    try {
      await RevenueCatConfig.initialize();
      const customerInfo = await Purchases.getCustomerInfo();
      return Object.keys((customerInfo as any).entitlements?.active || {}).length > 0;
    } catch (error) {
      console.error('Failed to check active entitlements:', error);
      return false;
    }
  }

  static async getActiveEntitlements(): Promise<string[]> {
    // Don't try to use RevenueCat on web - use official Capacitor API
    if (!isNativePlatform()) {
      console.log('EntitlementService: Web environment detected, skipping RevenueCat check');
      return [];
    }

    try {
      await RevenueCatConfig.initialize();
      const customerInfo = await Purchases.getCustomerInfo();
      return Object.keys((customerInfo as any).entitlements?.active || {});
    } catch (error) {
      console.error('Failed to get active entitlements:', error);
      return [];
    }
  }
}
