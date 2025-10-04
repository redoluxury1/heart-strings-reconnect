
import { supabase } from '@/integrations/supabase/client';
import { NativePurchaseTransaction } from './types';

export class ReceiptValidator {
  static async validateReceipt(transaction: NativePurchaseTransaction): Promise<void> {
    console.log('📝 [VALIDATION START] Starting receipt validation');
    console.log('📝 [VALIDATION] Transaction details:', {
      productId: transaction.productId,
      transactionId: transaction.transactionId,
      isTrialPeriod: transaction.isTrialPeriod,
      hasExpiresDate: !!transaction.expiresDate
    });
    
    try {
      console.log('📝 [VALIDATION] Step 1: Getting authenticated user');
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        console.error('📝 [VALIDATION ERROR] User not authenticated');
        throw new Error('User not authenticated');
      }
      console.log('📝 [VALIDATION] Step 2: User authenticated:', user.user.id);

      const requestBody = {
        receiptData: transaction.receiptData,
        userId: user.user.id,
        transactionId: transaction.transactionId,
        originalTransactionId: transaction.originalTransactionId,
        productId: transaction.productId,
        purchaseDate: transaction.purchaseDate.toISOString(),
        expiresDate: transaction.expiresDate?.toISOString(),
        isTrialPeriod: transaction.isTrialPeriod
      };
      
      console.log('📝 [VALIDATION] Step 3: Calling edge function with body:', {
        ...requestBody,
        receiptData: requestBody.receiptData ? `[${requestBody.receiptData.length} chars]` : 'empty'
      });

      const startTime = Date.now();
      const { data, error } = await supabase.functions.invoke('validate-app-store-receipt', {
        body: requestBody
      });
      const duration = Date.now() - startTime;
      
      console.log('📝 [VALIDATION] Step 4: Edge function response received (took', duration, 'ms)');

      if (error) {
        console.error('📝 [VALIDATION ERROR] Edge function returned error:', {
          message: error.message,
          status: error.status,
          details: error
        });
        throw new Error(`Edge function error: ${error.message}`);
      }

      console.log('📝 [VALIDATION] Step 5: Response data:', data);

      if (!data?.success) {
        console.error('📝 [VALIDATION ERROR] Validation unsuccessful. Response:', data);
        throw new Error(`Receipt validation failed: ${data?.error || 'Unknown error'}`);
      }

      console.log('📝 [VALIDATION SUCCESS] Receipt validated successfully');
    } catch (error) {
      console.error('📝 [VALIDATION FAILED] Receipt validation error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        transaction: {
          productId: transaction.productId,
          transactionId: transaction.transactionId
        }
      });
      throw error;
    }
  }
}
