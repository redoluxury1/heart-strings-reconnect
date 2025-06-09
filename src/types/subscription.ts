
export interface Subscription {
  id: string;
  user_id: string;
  product_id: string;
  status: 'active' | 'expired' | 'canceled' | 'pending' | 'in_trial';
  trial_end_date?: Date;
  current_period_start: Date;
  current_period_end: Date;
  auto_renew: boolean;
  app_store_transaction_id?: string;
  app_store_original_transaction_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface SubscriptionProduct {
  id: string;
  product_id: string; // App Store product identifier
  name: string;
  description: string;
  price_tier: string;
  billing_period: 'monthly' | 'yearly';
  trial_period_days?: number;
  features: string[];
  active: boolean;
}

export interface AppStoreReceipt {
  id: string;
  user_id: string;
  receipt_data: string;
  transaction_id: string;
  original_transaction_id: string;
  product_id: string;
  purchase_date: Date;
  expires_date?: Date;
  is_trial_period: boolean;
  is_in_intro_offer_period: boolean;
  validation_status: 'pending' | 'valid' | 'invalid';
  created_at: Date;
}

export interface SubscriptionFeature {
  feature_key: string;
  display_name: string;
  description: string;
  included_in_products: string[];
}
