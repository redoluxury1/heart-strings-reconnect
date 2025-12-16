import { Purchases } from '@revenuecat/purchases-capacitor';
import { RevenueCatConfig } from './revenueCatConfig';
import { isNativePlatform } from '@/utils/platform';

export class EntitlementService {
  // Your RevenueCat entitlement identifiers
  // Note: RevenueCat returns entitlements keyed by the *entitlement identifier* you configure.
  // Some setups also reference internal-looking ids (e.g. "entl..."). We support both.
  static readonly ENTITLEMENTS = {
    PREMIUM_FEATURES: 'entl51d1c435c2',
    ADVANCED_FEATURES: 'entl2a85cac069'
  };

  // Fallback aliases for common RevenueCat entitlement identifiers.
  // This prevents access checks from failing if the dashboard uses human-friendly names.
  private static readonly ENTITLEMENT_ALIASES: Record<string, string[]> = {
    entl51d1c435c2: ['premium', 'premium_features', 'pro'],
    entl2a85cac069: ['advanced', 'advanced_features', 'premium_plus', 'pro_plus']
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
      const active = (customerInfo as any).entitlements?.active || {};

      // Primary check (as configured in code)
      if (active[entitlementId] !== undefined) return true;

      // Fallback checks (as configured in RevenueCat dashboard)
      const aliases = this.ENTITLEMENT_ALIASES[entitlementId] || [];
      for (const alias of aliases) {
        if (active[alias] !== undefined) return true;
      }

      return false;
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
