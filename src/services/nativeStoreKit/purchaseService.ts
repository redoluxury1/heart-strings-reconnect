
import { Purchases, PurchasesEntitlementInfo } from '@revenuecat/purchases-capacitor';
import { NativePurchaseTransaction } from './types';
import { RevenueCatConfig } from './revenueCatConfig';
import { ProductService } from './productService';
import { ReceiptValidator } from './receiptValidator';

export class PurchaseService {
  static async purchaseProduct(productId: string): Promise<NativePurchaseTransaction> {
    await RevenueCatConfig.initialize();
    
    try {
      const packageToPurchase = await ProductService.findPackageByProductId(productId);
      
      if (!packageToPurchase) {
        throw new Error(`Product ${productId} not found in offerings`);
      }
      
      const purchaseResult = await Purchases.purchasePackage({ aPackage: packageToPurchase });
      const customerInfo = purchaseResult.customerInfo;
      
      // Get the latest transaction info
      const entitlements = (customerInfo as any).entitlements?.active || {};
      const entitlementKeys = Object.keys(entitlements);
      
      if (entitlementKeys.length === 0) {
        throw new Error('No active entitlements found after purchase');
      }
      
      const latestEntitlement = entitlements[entitlementKeys[0]] as PurchasesEntitlementInfo;
      
      const transaction = this.createTransactionFromEntitlement(latestEntitlement, productId, (customerInfo as any).originalAppUserId || '');

      // Validate receipt with our backend
      await ReceiptValidator.validateReceipt(transaction);
      
      return transaction;
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }

  static async restorePurchases(): Promise<NativePurchaseTransaction[]> {
    await RevenueCatConfig.initialize();
    
    try {
      const customerInfo = await Purchases.restorePurchases();
      const transactions: NativePurchaseTransaction[] = [];
      
      // Process active entitlements
      const entitlements = (customerInfo as any).entitlements?.active || {};
      
      for (const [, entitlement] of Object.entries(entitlements)) {
        const entitlementInfo = entitlement as PurchasesEntitlementInfo;
        
        const transaction = this.createTransactionFromEntitlement(
          entitlementInfo, 
          entitlementInfo.productIdentifier, 
          (customerInfo as any).originalAppUserId || ''
        );

        // Validate each restored receipt
        try {
          await ReceiptValidator.validateReceipt(transaction);
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

  static async finishTransaction(transactionId: string): Promise<void> {
    // RevenueCat handles transaction finishing automatically
    console.log(`Transaction acknowledged: ${transactionId}`);
  }

  private static createTransactionFromEntitlement(
    entitlement: PurchasesEntitlementInfo, 
    productId: string, 
    originalAppUserId: string
  ): NativePurchaseTransaction {
    return {
      transactionId: entitlement.latestPurchaseDate || `${Date.now()}`,
      originalTransactionId: entitlement.originalPurchaseDate || entitlement.latestPurchaseDate || `${Date.now()}`,
      productId: productId,
      purchaseDate: new Date(entitlement.latestPurchaseDate || Date.now()),
      expiresDate: entitlement.expirationDate ? new Date(entitlement.expirationDate) : undefined,
      isTrialPeriod: entitlement.willRenew || false,
      receiptData: originalAppUserId
    };
  }
}
