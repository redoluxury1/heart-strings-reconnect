
// Mock StoreKit service for web development
export interface MockStoreKitProduct {
  productId: string;
  price: string;
  currency: string;
  title: string;
  description: string;
}

export interface MockPurchaseTransaction {
  transactionId: string;
  originalTransactionId: string;
  productId: string;
  purchaseDate: Date;
  expiresDate?: Date;
  isTrialPeriod: boolean;
  receiptData: string;
}

export class MockStoreKitService {
  private static instance: MockStoreKitService;
  private isInitialized = false;

  static getInstance(): MockStoreKitService {
    if (!MockStoreKitService.instance) {
      MockStoreKitService.instance = new MockStoreKitService();
    }
    return MockStoreKitService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    console.log('Mock StoreKit initialized for web development');
    this.isInitialized = true;
  }

  async getProducts(productIds: string[]): Promise<MockStoreKitProduct[]> {
    await this.initialize();
    
    // Return mock products for development
    return productIds.map(productId => ({
      productId,
      price: productId.includes('yearly') ? '$59.99' : '$9.99',
      currency: 'USD',
      title: productId.includes('yearly') ? 'Premium Yearly' : 'Premium Monthly',
      description: 'Mock subscription for development'
    }));
  }

  async purchaseProduct(productId: string): Promise<MockPurchaseTransaction> {
    await this.initialize();
    
    console.log(`Mock purchase initiated for product: ${productId}`);
    
    // Simulate a successful purchase
    return {
      transactionId: `mock_${Date.now()}`,
      originalTransactionId: `mock_orig_${Date.now()}`,
      productId,
      purchaseDate: new Date(),
      expiresDate: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)), // 1 year from now
      isTrialPeriod: true,
      receiptData: 'mock_receipt_data'
    };
  }

  async restorePurchases(): Promise<MockPurchaseTransaction[]> {
    await this.initialize();
    
    console.log('Mock restore purchases called');
    return [];
  }

  async finishTransaction(transactionId: string): Promise<void> {
    console.log(`Mock finish transaction: ${transactionId}`);
  }
}
