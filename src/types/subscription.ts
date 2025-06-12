
export interface Subscription {
  id: string;
  user_id: string;
  product_id: string;
  status: 'active' | 'expired' | 'canceled' | 'pending' | 'in_trial';
  trial_end_date?: string;
  current_period_start: string;
  current_period_end: string;
  auto_renew: boolean;
  app_store_transaction_id?: string;
  app_store_original_transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionProduct {
  id: string;
  product_id: string; // App Store product identifier
  name: string;
  description?: string;
  price_tier?: string;
  billing_period: 'monthly' | 'yearly';
  trial_period_days?: number;
  features: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AppStoreReceipt {
  id: string;
  user_id: string;
  receipt_data: string;
  transaction_id: string;
  original_transaction_id: string;
  product_id: string;
  purchase_date: string;
  expires_date?: string;
  is_trial_period: boolean;
  is_in_intro_offer_period: boolean;
  validation_status: 'pending' | 'valid' | 'invalid';
  created_at: string;
}

export interface SubscriptionFeature {
  feature_key: string;
  display_name: string;
  description: string;
  included_in_products: string[];
}
