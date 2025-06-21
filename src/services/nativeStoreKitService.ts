
import { Purchases, CustomerInfo, PurchasesOffering, PurchasesPackage, PurchasesEntitlementInfo } from '@revenuecat/purchases-capacitor';
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
      const apiKey = process.env.VITE_REVENUECAT_API_KEY;
      if (!apiKey) {
        throw new Error('RevenueCat API key not configured');
      }
      
      await Purchases.configure({ apiKey });
      console.log('Native StoreKit service initialized with RevenueCat');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize native StoreKit:', error);
      throw error;
    }
  }

  async getProducts(productIds: string[]): Promise<NativeStoreKitProduct[]> {
    await this.initialize();
    
    try {
      const offerings = await Purchases.getOfferings();
      const products: NativeStoreKitProduct[] = [];
      
      // Extract products from all offerings
      Object.values(offerings.all).forEach((offering: PurchasesOffering) => {
        offering.availablePackages.forEach((pkg: PurchasesPackage) => {
          if (productIds.includes(pkg.product.identifier)) {
            products.push({
              productId: pkg.product.identifier,
              price: pkg.product.priceString,
              currency: pkg.product.currencyCode,
              title: pkg.product.title,
              description: pkg.product.description || ''
            });
          }
        });
      });
      
      return products;
    } catch (error) {
      console.error('Failed to get products:', error);
      throw error;
    }
  }

  async purchaseProduct(productId: string): Promise<NativePurchaseTransaction> {
    await this.initialize();
    
    try {
      const offerings = await Purchases.getOfferings();
      let packageToPurchase: PurchasesPackage | null = null;
      
      // Find the package with the matching product ID
      Object.values(offerings.all).forEach((offering: PurchasesOffering) => {
        offering.availablePackages.forEach((pkg: PurchasesPackage) => {
          if (pkg.product.identifier === productId) {
            packageToPurchase = pkg;
          }
        });
      });
      
      if (!packageToPurchase) {
        throw new Error(`Product ${productId} not found in offerings`);
      }
      
      const purchaseResult = await Purchases.purchasePackage({ aPackage: packageToPurchase });
      const customerInfo = purchaseResult.customerInfo;
      
      // Get the latest transaction info
      const entitlements = customerInfo.entitlements.active;
      const entitlementKeys = Object.keys(entitlements);
      
      if (entitlementKeys.length === 0) {
        throw new Error('No active entitlements found after purchase');
      }
      
      const latestEntitlement = entitlements[entitlementKeys[0]] as PurchasesEntitlementInfo;
      
      const transaction: NativePurchaseTransaction = {
        transactionId: latestEntitlement.latestPurchaseDate || `${Date.now()}`,
        originalTransactionId: latestEntitlement.originalPurchaseDate || latestEntitlement.latestPurchaseDate || `${Date.now()}`,
        productId: productId,
        purchaseDate: new Date(latestEntitlement.latestPurchaseDate || Date.now()),
        expiresDate: latestEntitlement.expiresDate ? new Date(latestEntitlement.expiresDate) : undefined,
        isTrialPeriod: latestEntitlement.isTrialPeriod || false,
        receiptData: customerInfo.originalAppUserId || ''
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
      const customerInfo = await Purchases.restorePurchases();
      const transactions: NativePurchaseTransaction[] = [];
      
      // Process active entitlements
      const entitlements = customerInfo.entitlements.active;
      
      for (const [, entitlement] of Object.entries(entitlements)) {
        const entitlementInfo = entitlement as PurchasesEntitlementInfo;
        
        const transaction: NativePurchaseTransaction = {
          transactionId: entitlementInfo.latestPurchaseDate || `${Date.now()}`,
          originalTransactionId: entitlementInfo.originalPurchaseDate || entitlementInfo.latestPurchaseDate || `${Date.now()}`,
          productId: entitlementInfo.productIdentifier,
          purchaseDate: new Date(entitlementInfo.latestPurchaseDate || Date.now()),
          expiresDate: entitlementInfo.expiresDate ? new Date(entitlementInfo.expiresDate) : undefined,
          isTrialPeriod: entitlementInfo.isTrialPeriod || false,
          receiptData: customerInfo.originalAppUserId || ''
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
    // RevenueCat handles transaction finishing automatically
    console.log(`Transaction acknowledged: ${transactionId}`);
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
