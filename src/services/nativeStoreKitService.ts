
import { InAppPurchases } from '@capacitor-community/in-app-purchases';
import { supabase } from '@/integrations/supabase/client';

export interface NativeStoreKitProduct {
  productId: string;
  price: string;
  currency: string;
  title: string;
  description: string;
}

export interface NativePurchaseTransaction {
  transactionId: string;
  originalTransactionId: string;
  productId: string;
  purchaseDate: Date;
  expiresDate?: Date;
  isTrialPeriod: boolean;
  receiptData: string;
}

export class NativeStoreKitService {
  private static instance: NativeStoreKitService;
  private isInitialized = false;

  static getInstance(): NativeStoreKitService {
    if (!NativeStoreKitService.instance) {
      NativeStoreKitService.instance = new NativeStoreKitService();
    }
    return NativeStoreKitService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize the in-app purchases plugin
      await InAppPurchases.initialize();
      console.log('Native StoreKit service initialized');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize native StoreKit:', error);
      throw error;
    }
  }

  async getProducts(productIds: string[]): Promise<NativeStoreKitProduct[]> {
    await this.initialize();
    
    try {
      const { products } = await InAppPurchases.getProducts({ productIds });
      
      return products.map(product => ({
        productId: product.productId,
        price: product.price,
        currency: product.currency,
        title: product.title,
        description: product.description || ''
      }));
    } catch (error) {
      console.error('Failed to get products:', error);
      throw error;
    }
  }

  async purchaseProduct(productId: string): Promise<NativePurchaseTransaction> {
    await this.initialize();
    
    try {
      const result = await InAppPurchases.purchaseProduct({ productId });
      
      if (!result.receipt) {
        throw new Error('No receipt data received from purchase');
      }

      const transaction: NativePurchaseTransaction = {
        transactionId: result.transactionId || `${Date.now()}`,
        originalTransactionId: result.originalTransactionId || result.transactionId || `${Date.now()}`,
        productId: result.productId,
        purchaseDate: new Date(result.purchaseDate || Date.now()),
        expiresDate: result.expiresDate ? new Date(result.expiresDate) : undefined,
        isTrialPeriod: result.isTrialPeriod || false,
        receiptData: result.receipt
      };

      // Validate receipt with our backend
      await this.validateReceipt(transaction);
      
      return transaction;
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }

  async restorePurchases(): Promise<NativePurchaseTransaction[]> {
    await this.initialize();
    
    try {
      const { purchases } = await InAppPurchases.restorePurchases();
      
      const transactions: NativePurchaseTransaction[] = [];
      
      for (const purchase of purchases) {
        if (!purchase.receipt) continue;
        
        const transaction: NativePurchaseTransaction = {
          transactionId: purchase.transactionId || `${Date.now()}`,
          originalTransactionId: purchase.originalTransactionId || purchase.transactionId || `${Date.now()}`,
          productId: purchase.productId,
          purchaseDate: new Date(purchase.purchaseDate || Date.now()),
          expiresDate: purchase.expiresDate ? new Date(purchase.expiresDate) : undefined,
          isTrialPeriod: purchase.isTrialPeriod || false,
          receiptData: purchase.receipt
        };

        // Validate each restored receipt
        try {
          await this.validateReceipt(transaction);
          transactions.push(transaction);
        } catch (error) {
          console.error('Failed to validate restored receipt:', error);
          // Continue with other receipts even if one fails
        }
      }
      
      return transactions;
    } catch (error) {
      console.error('Restore purchases failed:', error);
      throw error;
    }
  }

  async finishTransaction(transactionId: string): Promise<void> {
    try {
      await InAppPurchases.finishTransaction({ transactionId });
      console.log(`Transaction finished: ${transactionId}`);
    } catch (error) {
      console.error('Failed to finish transaction:', error);
      // Don't throw here as the purchase may still be valid
    }
  }

  private async validateReceipt(transaction: NativePurchaseTransaction): Promise<void> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('validate-app-store-receipt', {
        body: {
          receiptData: transaction.receiptData,
          userId: user.user.id,
          transactionId: transaction.transactionId,
          originalTransactionId: transaction.originalTransactionId,
          productId: transaction.productId,
          purchaseDate: transaction.purchaseDate.toISOString(),
          expiresDate: transaction.expiresDate?.toISOString(),
          isTrialPeriod: transaction.isTrialPeriod
        }
      });

      if (error) {
        console.error('Receipt validation failed:', error);
        throw error;
      }

      if (!data?.success) {
        throw new Error('Receipt validation failed');
      }

      console.log('Receipt validated successfully:', data);
    } catch (error) {
      console.error('Receipt validation error:', error);
      throw error;
    }
  }
}
