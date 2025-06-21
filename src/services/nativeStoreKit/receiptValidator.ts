
import { supabase } from '@/integrations/supabase/client';
import { NativePurchaseTransaction } from './types';

export class ReceiptValidator {
  static async validateReceipt(transaction: NativePurchaseTransaction): Promise<void> {
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
