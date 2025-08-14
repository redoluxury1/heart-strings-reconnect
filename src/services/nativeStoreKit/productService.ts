
import { Purchases, PurchasesOffering, PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { NativeStoreKitProduct } from './types';
import { RevenueCatConfig } from './revenueCatConfig';

export class ProductService {
  static async getProducts(productIds: string[]): Promise<NativeStoreKitProduct[]> {
    await RevenueCatConfig.initialize();
    
    try {
      const offerings = await Purchases.getOfferings();
      const products: NativeStoreKitProduct[] = [];
      
      // Get the default offering
      const defaultOffering = offerings.current || offerings.all['default'];
      if (defaultOffering) {
        defaultOffering.availablePackages.forEach((pkg: PurchasesPackage) => {
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
      }
      
      return products;
    } catch (error) {
      console.error('Failed to get products:', error);
      throw error;
    }
  }

  static async findPackageByProductId(productId: string): Promise<PurchasesPackage | null> {
    const offerings = await Purchases.getOfferings();
    
    // Get the default offering first
    const defaultOffering = offerings.current || offerings.all['default'];
    if (defaultOffering) {
      for (const pkg of defaultOffering.availablePackages) {
        if (pkg.product.identifier === productId) {
          return pkg;
        }
      }
    }
    
    return null;
  }
}
