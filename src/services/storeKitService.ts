import { supabase } from '@/integrations/supabase/client';
import { MockStoreKitService } from './mockStoreKitService';
import { NativeStoreKitService } from './nativeStoreKit';

export interface StoreKitProduct {
  productId: string;
  price: string;
  currency: string;
  title: string;
  description: string;
}

export interface PurchaseTransaction {
  transactionId: string;
  originalTransactionId: string;
  productId: string;
  purchaseDate: Date;
  expiresDate?: Date;
  isTrialPeriod: boolean;
  receiptData: string;
}

// Check if we're running in a Capacitor environment
const isCapacitorEnvironment = () => {
  return typeof window !== 'undefined' && 
         window.Capacitor && 
         window.Capacitor.platform !== 'web';
};

// Check if we're running on iOS specifically
const isIOSEnvironment = () => {
  return isCapacitorEnvironment() && window.Capacitor?.platform === 'ios';
};

// Check if RevenueCat is properly configured
const isRevenueCatConfigured = () => {
  return !!process.env.VITE_REVENUECAT_API_KEY;
};

export class StoreKitService {
  private static instance: StoreKitService;
  private isInitialized = false;
  private mockService = MockStoreKitService.getInstance();
  private nativeService = NativeStoreKitService.getInstance();

  static getInstance(): StoreKitService {
    if (!StoreKitService.instance) {
      StoreKitService.instance = new StoreKitService();
    }
    return StoreKitService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      if (isIOSEnvironment() && isRevenueCatConfigured()) {
        // Use native iOS StoreKit with RevenueCat
        await this.nativeService.initialize();
        console.log('StoreKit service initialized with native iOS implementation');
      } else {
        // Use mock service for web/development or when RevenueCat is not configured
        await this.mockService.initialize();
        const reason = !isIOSEnvironment() ? 'not iOS environment' : 'RevenueCat not configured';
        console.log(`StoreKit service initialized with mock implementation (${reason})`);
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize StoreKit:', error);
      // Fallback to mock service if native fails
      await this.mockService.initialize();
      console.log('Falling back to mock StoreKit service');
      this.isInitialized = true;
    }
  }

  async getProducts(productIds: string[]): Promise<StoreKitProduct[]> {
    await this.initialize();
    
    if (isIOSEnvironment() && isRevenueCatConfigured()) {
      return this.nativeService.getProducts(productIds);
    } else {
      return this.mockService.getProducts(productIds);
    }
  }

  async purchaseProduct(productId: string): Promise<PurchaseTransaction> {
    await this.initialize();
    
    if (isIOSEnvironment() && isRevenueCatConfigured()) {
      return this.nativeService.purchaseProduct(productId);
    } else {
      return this.mockService.purchaseProduct(productId);
    }
  }

  async restorePurchases(): Promise<PurchaseTransaction[]> {
    await this.initialize();
    
    if (isIOSEnvironment() && isRevenueCatConfigured()) {
      return this.nativeService.restorePurchases();
    } else {
      return this.mockService.restorePurchases();
    }
  }

  async finishTransaction(transactionId: string): Promise<void> {
    await this.initialize();
    
    if (isIOSEnvironment() && isRevenueCatConfigured()) {
      await this.nativeService.finishTransaction(transactionId);
    } else {
      await this.mockService.finishTransaction(transactionId);
    }
  }

  // Helper method to check current environment
  getCurrentEnvironment(): 'ios' | 'web' {
    return isIOSEnvironment() && isRevenueCatConfigured() ? 'ios' : 'web';
  }

  // Helper method for debugging
  getServiceInfo(): string {
    const env = this.getCurrentEnvironment();
    const configured = isRevenueCatConfigured() ? 'configured' : 'not configured';
    return `StoreKit running in ${env} mode${env === 'web' ? ` (mock service, RevenueCat ${configured})` : ' (native service)'}`;
  }
}
