
-- Create subscription products table
CREATE TABLE public.subscription_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL UNIQUE, -- App Store product identifier
  name TEXT NOT NULL,
  description TEXT,
  price_tier TEXT,
  billing_period TEXT NOT NULL CHECK (billing_period IN ('monthly', 'yearly')),
  trial_period_days INTEGER DEFAULT 0,
  features TEXT[] DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'canceled', 'pending', 'in_trial')),
  trial_end_date TIMESTAMP WITH TIME ZONE,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  auto_renew BOOLEAN NOT NULL DEFAULT true,
  app_store_transaction_id TEXT,
  app_store_original_transaction_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create app store receipts table
CREATE TABLE public.app_store_receipts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  receipt_data TEXT NOT NULL,
  transaction_id TEXT NOT NULL UNIQUE,
  original_transaction_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  purchase_date TIMESTAMP WITH TIME ZONE NOT NULL,
  expires_date TIMESTAMP WITH TIME ZONE,
  is_trial_period BOOLEAN NOT NULL DEFAULT false,
  is_in_intro_offer_period BOOLEAN NOT NULL DEFAULT false,
  validation_status TEXT NOT NULL DEFAULT 'pending' CHECK (validation_status IN ('pending', 'valid', 'invalid')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.subscription_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_store_receipts ENABLE ROW LEVEL SECURITY;

-- Subscription products can be read by everyone (public)
CREATE POLICY "Anyone can view active subscription products" 
  ON public.subscription_products 
  FOR SELECT 
  USING (active = true);

-- Users can only see their own subscriptions
CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" 
  ON public.subscriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
  ON public.subscriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can only see their own receipts
CREATE POLICY "Users can view their own receipts" 
  ON public.app_store_receipts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own receipts" 
  ON public.app_store_receipts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Insert some default subscription products
INSERT INTO public.subscription_products (product_id, name, description, billing_period, trial_period_days, features) VALUES
('com.bridgeforcouples.premium.monthly', 'Premium Monthly', 'Full access to all premium features', 'monthly', 3, ARRAY['mid_fight_access', 'post_conflict_access', 'reconnect_access', 'love_notes_access', 'archive_access', 'quiz_access']),
('com.bridgeforcouples.premium.yearly', 'Premium Yearly', 'Full access to all premium features - Best Value', 'yearly', 7, ARRAY['mid_fight_access', 'post_conflict_access', 'reconnect_access', 'love_notes_access', 'archive_access', 'quiz_access']);
