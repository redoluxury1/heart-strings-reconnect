
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
      if (isCapacitorEnvironment()) {
        // Only try to load the real plugin in Capacitor environment
        try {
          const { InAppPurchase } = await import('@capacitor-community/in-app-purchase');
          await InAppPurchase.initialize();
          console.log('Real StoreKit initialized successfully');
        } catch (importError) {
          console.warn('Failed to import real StoreKit plugin, falling back to mock:', importError);
          await this.mockService.initialize();
        }
      } else {
        // Use mock service for web development
        await this.mockService.initialize();
        console.log('Using mock StoreKit for web development');
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize StoreKit:', error);
      // Fallback to mock service if real plugin fails
      await this.mockService.initialize();
      this.isInitialized = true;
    }
  }

  async getProducts(productIds: string[]): Promise<StoreKitProduct[]> {
    await this.initialize();

    try {
      if (isCapacitorEnvironment()) {
        try {
          const { InAppPurchase } = await import('@capacitor-community/in-app-purchase');
          const result = await InAppPurchase.getProducts({ productIds });
          
          return result.products.map(product => ({
            productId: product.productId,
            price: product.price,
            currency: product.currency,
            title: product.title,
            description: product.description
          }));
        } catch (importError) {
          console.warn('Failed to import real StoreKit plugin, using mock:', importError);
          return this.mockService.getProducts(productIds);
        }
      } else {
        // Use mock service
        return this.mockService.getProducts(productIds);
      }
    } catch (error) {
      console.error('Failed to get products:', error);
      // Fallback to mock service
      return this.mockService.getProducts(productIds);
    }
  }

  async purchaseProduct(productId: string): Promise<PurchaseTransaction> {
    await this.initialize();

    try {
      if (isCapacitorEnvironment()) {
        try {
          const { InAppPurchase } = await import('@capacitor-community/in-app-purchase');
          const result = await InAppPurchase.purchaseProduct({ productId });
          
          if (result.purchases && result.purchases.length > 0) {
            const purchase = result.purchases[0];
            
            return {
              transactionId: purchase.transactionId,
              originalTransactionId: purchase.originalTransactionId || purchase.transactionId,
              productId: purchase.productId,
              purchaseDate: new Date(purchase.purchaseDate),
              expiresDate: purchase.expiresDate ? new Date(purchase.expiresDate) : undefined,
              isTrialPeriod: purchase.isTrialPeriod || false,
              receiptData: purchase.receiptData || ''
            };
          } else {
            throw new Error('Purchase failed - no transaction returned');
          }
        } catch (importError) {
          console.warn('Failed to import real StoreKit plugin, using mock:', importError);
          return this.mockService.purchaseProduct(productId);
        }
      } else {
        // Use mock service
        return this.mockService.purchaseProduct(productId);
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }

  async restorePurchases(): Promise<PurchaseTransaction[]> {
    await this.initialize();

    try {
      if (isCapacitorEnvironment()) {
        try {
          const { InAppPurchase } = await import('@capacitor-community/in-app-purchase');
          const result = await InAppPurchase.restorePurchases();
          
          if (result.purchases) {
            return result.purchases.map(purchase => ({
              transactionId: purchase.transactionId,
              originalTransactionId: purchase.originalTransactionId || purchase.transactionId,
              productId: purchase.productId,
              purchaseDate: new Date(purchase.purchaseDate),
              expiresDate: purchase.expiresDate ? new Date(purchase.expiresDate) : undefined,
              isTrialPeriod: purchase.isTrialPeriod || false,
              receiptData: purchase.receiptData || ''
            }));
          }
          
          return [];
        } catch (importError) {
          console.warn('Failed to import real StoreKit plugin, using mock:', importError);
          return this.mockService.restorePurchases();
        }
      } else {
        // Use mock service
        return this.mockService.restorePurchases();
      }
    } catch (error) {
      console.error('Restore purchases failed:', error);
      throw error;
    }
  }

  async finishTransaction(transactionId: string): Promise<void> {
    try {
      if (isCapacitorEnvironment()) {
        try {
          const { InAppPurchase } = await import('@capacitor-community/in-app-purchase');
          await InAppPurchase.finishTransaction({ transactionId });
        } catch (importError) {
          console.warn('Failed to import real StoreKit plugin, using mock:', importError);
          await this.mockService.finishTransaction(transactionId);
        }
      } else {
        // Use mock service
        await this.mockService.finishTransaction(transactionId);
      }
    } catch (error) {
      console.error('Failed to finish transaction:', error);
    }
  }
}
