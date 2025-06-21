
import { Purchases, PurchasesOffering, PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { NativeStoreKitProduct } from './types';
import { RevenueCatConfig } from './revenueCatConfig';

export class ProductService {
  static async getProducts(productIds: string[]): Promise<NativeStoreKitProduct[]> {
    await RevenueCatConfig.initialize();
    
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

  static async findPackageByProductId(productId: string): Promise<PurchasesPackage | null> {
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
    
    return packageToPurchase;
  }
}
