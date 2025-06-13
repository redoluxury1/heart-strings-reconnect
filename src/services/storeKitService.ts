
import { supabase } from '@/integrations/supabase/client';
import { MockStoreKitService } from './mockStoreKitService';

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

export class StoreKitService {
  private static instance: StoreKitService;
  private isInitialized = false;
  private mockService = MockStoreKitService.getInstance();

  static getInstance(): StoreKitService {
    if (!StoreKitService.instance) {
      StoreKitService.instance = new StoreKitService();
    }
    return StoreKitService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // For now, always use mock service since we don't have a working native plugin
      // This provides all the functionality needed for development and testing
      await this.mockService.initialize();
      console.log('StoreKit service initialized with mock implementation');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize StoreKit:', error);
      // Fallback to mock service if anything fails
      await this.mockService.initialize();
      this.isInitialized = true;
    }
  }

  async getProducts(productIds: string[]): Promise<StoreKitProduct[]> {
    await this.initialize();
    return this.mockService.getProducts(productIds);
  }

  async purchaseProduct(productId: string): Promise<PurchaseTransaction> {
    await this.initialize();
    return this.mockService.purchaseProduct(productId);
  }

  async restorePurchases(): Promise<PurchaseTransaction[]> {
    await this.initialize();
    return this.mockService.restorePurchases();
  }

  async finishTransaction(transactionId: string): Promise<void> {
    await this.initialize();
    await this.mockService.finishTransaction(transactionId);
  }
}
