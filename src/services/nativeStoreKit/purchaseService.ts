
import { Purchases, PurchasesEntitlementInfo } from '@revenuecat/purchases-capacitor';
import { NativePurchaseTransaction } from './types';
import { RevenueCatConfig } from './revenueCatConfig';
import { ProductService } from './productService';
import { ReceiptValidator } from './receiptValidator';

export class PurchaseService {
  static async purchaseProduct(productId: string): Promise<NativePurchaseTransaction> {
    console.log('🛒 [PURCHASE START] Product ID:', productId);
    console.log('🛒 [PURCHASE] Step 1: Initializing RevenueCat');
    
    await RevenueCatConfig.initialize();
    console.log('🛒 [PURCHASE] Step 2: RevenueCat initialized successfully');
    
    try {
      console.log('🛒 [PURCHASE] Step 3: Finding package for product:', productId);
      const packageToPurchase = await ProductService.findPackageByProductId(productId);
      
      if (!packageToPurchase) {
        console.error('🛒 [PURCHASE ERROR] Product not found in offerings:', productId);
        throw new Error(`Product ${productId} not found in offerings`);
      }
      console.log('🛒 [PURCHASE] Step 4: Package found:', packageToPurchase.identifier);
      
      console.log('🛒 [PURCHASE] Step 5: Initiating purchase with RevenueCat');
      const purchaseResult = await Purchases.purchasePackage({ aPackage: packageToPurchase });
      console.log('🛒 [PURCHASE] Step 6: Purchase completed with RevenueCat');
      
      const customerInfo = purchaseResult.customerInfo;
      console.log('🛒 [PURCHASE] Step 7: Customer info received:', {
        userId: (customerInfo as any).originalAppUserId,
        hasEntitlements: !!((customerInfo as any).entitlements?.active)
      });
      
      // Get the latest transaction info
      const entitlements = (customerInfo as any).entitlements?.active || {};
      const entitlementKeys = Object.keys(entitlements);
      
      console.log('🛒 [PURCHASE] Step 8: Active entitlements count:', entitlementKeys.length);
      
      if (entitlementKeys.length === 0) {
        console.error('🛒 [PURCHASE ERROR] No active entitlements found after purchase');
        throw new Error('No active entitlements found after purchase');
      }
      
      const latestEntitlement = entitlements[entitlementKeys[0]] as PurchasesEntitlementInfo;
      console.log('🛒 [PURCHASE] Step 9: Latest entitlement:', {
        identifier: latestEntitlement.identifier,
        productIdentifier: latestEntitlement.productIdentifier,
        isActive: latestEntitlement.isActive
      });
      
      const transaction = this.createTransactionFromEntitlement(latestEntitlement, productId, (customerInfo as any).originalAppUserId || '');
      console.log('🛒 [PURCHASE] Step 10: Transaction object created:', {
        transactionId: transaction.transactionId,
        productId: transaction.productId,
        isTrialPeriod: transaction.isTrialPeriod
      });

      console.log('🛒 [PURCHASE] Step 11: Validating receipt with backend');
      try {
        await ReceiptValidator.validateReceipt(transaction);
        console.log('🛒 [PURCHASE] Step 12: Receipt validated successfully');
      } catch (validationError) {
        console.error('🛒 [PURCHASE ERROR] Receipt validation failed:', validationError);
        console.error('🛒 [PURCHASE ERROR] Validation error details:', {
          message: validationError.message,
          stack: validationError.stack,
          transaction: transaction
        });
        throw new Error(`Receipt validation failed: ${validationError.message}`);
      }
      
      console.log('🛒 [PURCHASE SUCCESS] Purchase flow completed successfully');
      return transaction;
    } catch (error) {
      console.error('🛒 [PURCHASE FAILED] Error occurred:', error);
      console.error('🛒 [PURCHASE FAILED] Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        productId: productId
      });
      throw error;
    }
  }

  static async restorePurchases(): Promise<NativePurchaseTransaction[]> {
    console.log('🔄 [RESTORE START] Initiating purchase restoration');
    
    await RevenueCatConfig.initialize();
    console.log('🔄 [RESTORE] RevenueCat initialized');
    
    try {
      console.log('🔄 [RESTORE] Calling RevenueCat restorePurchases');
      const customerInfo = await Purchases.restorePurchases();
      console.log('🔄 [RESTORE] Customer info received');
      
      const transactions: NativePurchaseTransaction[] = [];
      
      // Process active entitlements
      const entitlements = (customerInfo as any).entitlements?.active || {};
      const entitlementCount = Object.keys(entitlements).length;
      console.log('🔄 [RESTORE] Found active entitlements:', entitlementCount);
      
      for (const [key, entitlement] of Object.entries(entitlements)) {
        console.log('🔄 [RESTORE] Processing entitlement:', key);
        const entitlementInfo = entitlement as PurchasesEntitlementInfo;
        
        const transaction = this.createTransactionFromEntitlement(
          entitlementInfo, 
          entitlementInfo.productIdentifier, 
          (customerInfo as any).originalAppUserId || ''
        );
        
        console.log('🔄 [RESTORE] Created transaction for:', {
          productId: transaction.productId,
          transactionId: transaction.transactionId
        });

        // Validate each restored receipt
        try {
          console.log('🔄 [RESTORE] Validating receipt for:', transaction.productId);
          await ReceiptValidator.validateReceipt(transaction);
          console.log('🔄 [RESTORE] Receipt validated successfully for:', transaction.productId);
          transactions.push(transaction);
        } catch (error) {
          console.error('🔄 [RESTORE ERROR] Failed to validate restored receipt:', error);
          console.error('🔄 [RESTORE ERROR] Transaction details:', transaction);
          // Continue with other receipts even if one fails
        }
      }
      
      console.log('🔄 [RESTORE SUCCESS] Restoration completed. Valid transactions:', transactions.length);
      return transactions;
    } catch (error) {
      console.error('🔄 [RESTORE FAILED] Restore purchases failed:', error);
      console.error('🔄 [RESTORE FAILED] Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
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
