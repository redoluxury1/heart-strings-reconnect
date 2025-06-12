
import { InAppPurchases, PurchaseResult, ProductResult } from '@capacitor-community/in-app-purchases';
import { supabase } from '@/integrations/supabase/client';

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

export class StoreKitService {
  private static instance: StoreKitService;
  private isInitialized = false;

  static getInstance(): StoreKitService {
    if (!StoreKitService.instance) {
      StoreKitService.instance = new StoreKitService();
    }
    return StoreKitService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await InAppPurchases.initialize();
      this.isInitialized = true;
      console.log('StoreKit initialized successfully');
    } catch (error) {
      console.error('Failed to initialize StoreKit:', error);
      throw error;
    }
  }

  async getProducts(productIds: string[]): Promise<StoreKitProduct[]> {
    await this.initialize();

    try {
      const result: ProductResult = await InAppPurchases.getProducts({ productIds });
      
      return result.products.map(product => ({
        productId: product.productId,
        price: product.price,
        currency: product.currency,
        title: product.title,
        description: product.description
      }));
    } catch (error) {
      console.error('Failed to get products:', error);
      throw error;
    }
  }

  async purchaseProduct(productId: string): Promise<PurchaseTransaction> {
    await this.initialize();

    try {
      const result: PurchaseResult = await InAppPurchases.purchaseProduct({ productId });
      
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
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }

  async restorePurchases(): Promise<PurchaseTransaction[]> {
    await this.initialize();

    try {
      const result: PurchaseResult = await InAppPurchases.restorePurchases();
      
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
    } catch (error) {
      console.error('Restore purchases failed:', error);
      throw error;
    }
  }

  async finishTransaction(transactionId: string): Promise<void> {
    try {
      await InAppPurchases.finishTransaction({ transactionId });
    } catch (error) {
      console.error('Failed to finish transaction:', error);
    }
  }
}
