
-- Add Row Level Security policies for subscription tables

-- Users can view their own subscriptions
CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own subscriptions (for purchase flow)
CREATE POLICY "Users can create their own subscriptions" 
  ON public.subscriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscriptions
CREATE POLICY "Users can update their own subscriptions" 
  ON public.subscriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can view their own receipts
CREATE POLICY "Users can view their own receipts" 
  ON public.app_store_receipts 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own receipts
CREATE POLICY "Users can create their own receipts" 
  ON public.app_store_receipts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Anyone can view active subscription products (public data)
CREATE POLICY "Anyone can view active subscription products" 
  ON public.subscription_products 
  FOR SELECT 
  USING (active = true);

-- Enable RLS on all subscription tables
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_store_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_products ENABLE ROW LEVEL SECURITY;
