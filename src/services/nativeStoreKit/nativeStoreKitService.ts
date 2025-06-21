
import { NativeStoreKitProduct, NativePurchaseTransaction } from './types';
import { RevenueCatConfig } from './revenueCatConfig';
import { ProductService } from './productService';
import { PurchaseService } from './purchaseService';

export class NativeStoreKitService {
  private static instance: NativeStoreKitService;

  static getInstance(): NativeStoreKitService {
    if (!NativeStoreKitService.instance) {
      NativeStoreKitService.instance = new NativeStoreKitService();
    }
    return NativeStoreKitService.instance;
  }

  async initialize(): Promise<void> {
    await RevenueCatConfig.initialize();
    console.log('Native StoreKit service initialized with RevenueCat');
  }

  async getProducts(productIds: string[]): Promise<NativeStoreKitProduct[]> {
    return ProductService.getProducts(productIds);
  }

  async purchaseProduct(productId: string): Promise<NativePurchaseTransaction> {
    return PurchaseService.purchaseProduct(productId);
  }

  async restorePurchases(): Promise<NativePurchaseTransaction[]> {
    return PurchaseService.restorePurchases();
  }

  async finishTransaction(transactionId: string): Promise<void> {
    return PurchaseService.finishTransaction(transactionId);
  }
}
