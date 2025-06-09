
# iOS Subscription Implementation Plan

## Overview
This document outlines the complete implementation plan for adding iOS App Store subscriptions to the Bridge For Couples app, including "first month free" promotional offers.

## Phase 1: Database Schema Setup

### Required Tables (Execute via lov-sql)

```sql
-- Subscription products table
CREATE TABLE subscription_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT UNIQUE NOT NULL, -- App Store product identifier
  name TEXT NOT NULL,
  description TEXT,
  price_tier TEXT NOT NULL,
  billing_period TEXT NOT NULL CHECK (billing_period IN ('monthly', 'yearly')),
  trial_period_days INTEGER,
  features JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'canceled', 'pending', 'in_trial')),
  trial_end_date TIMESTAMP WITH TIME ZONE,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  auto_renew BOOLEAN DEFAULT true,
  app_store_transaction_id TEXT,
  app_store_original_transaction_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- App Store receipt validation table
CREATE TABLE app_store_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receipt_data TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  original_transaction_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  purchase_date TIMESTAMP WITH TIME ZONE NOT NULL,
  expires_date TIMESTAMP WITH TIME ZONE,
  is_trial_period BOOLEAN DEFAULT false,
  is_in_intro_offer_period BOOLEAN DEFAULT false,
  validation_status TEXT DEFAULT 'pending' CHECK (validation_status IN ('pending', 'valid', 'invalid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Subscription features mapping
CREATE TABLE subscription_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_key TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  included_in_products TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User feature access cache
CREATE TABLE user_subscription_features (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  feature_key TEXT NOT NULL,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, feature_key)
);

-- Indexes for performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_original_transaction ON subscriptions(app_store_original_transaction_id);
CREATE INDEX idx_receipts_user_id ON app_store_receipts(user_id);
CREATE INDEX idx_receipts_transaction_id ON app_store_receipts(transaction_id);
```

### Row Level Security Policies

```sql
-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_store_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscription_features ENABLE ROW LEVEL SECURITY;

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Receipts policies
CREATE POLICY "Users can view own receipts" ON app_store_receipts
  FOR SELECT USING (auth.uid() = user_id);

-- Features policies
CREATE POLICY "Users can view own features" ON user_subscription_features
  FOR SELECT USING (auth.uid() = user_id);

-- Public read access for products and features
CREATE POLICY "Anyone can view subscription products" ON subscription_products
  FOR SELECT USING (active = true);

CREATE POLICY "Anyone can view subscription features" ON subscription_features
  FOR SELECT USING (true);
```

## Phase 2: Backend Implementation

### Edge Functions Required

1. **Receipt Validation Function** (`supabase/functions/validate-app-store-receipt/index.ts`)
   - Validates App Store receipts with Apple's servers
   - Updates subscription status in database
   - Handles subscription lifecycle events

2. **Subscription Webhook Handler** (`supabase/functions/app-store-webhook/index.ts`)
   - Processes App Store Server-to-Server notifications
   - Handles subscription renewals, cancellations, refunds

3. **Feature Access Checker** (`supabase/functions/check-feature-access/index.ts`)
   - Validates user access to premium features
   - Returns feature permissions for API calls

### Native iOS Integration Required

1. **StoreKit 2 Implementation**
   - Product fetching from App Store
   - Purchase flow handling
   - Receipt validation
   - Subscription status monitoring

2. **Capacitor Plugin or Native Bridge**
   - Interface between React app and native iOS code
   - Handles purchase transactions
   - Manages subscription state

## Phase 3: Frontend Integration

### Core Components (Already Created)
- ✅ `SubscriptionGate` - Controls access to premium features
- ✅ `SubscriptionUpgradeModal` - Handles purchase flow
- ✅ `SubscriptionStatus` - Displays subscription information
- ✅ `useSubscription` - Hook for subscription management
- ✅ `SubscriptionService` - Backend API interface

### Premium Feature Integration
Apply `SubscriptionGate` to premium features:

```typescript
// Example usage in existing components
<SubscriptionGate featureKey="advanced_communication_tools">
  <SayThisInsteadTool />
</SubscriptionGate>

<SubscriptionGate featureKey="pattern_recognition">
  <PatternRecognitionFlow />
</SubscriptionGate>

<SubscriptionGate featureKey="unlimited_love_notes">
  <LoveNotesSection />
</SubscriptionGate>
```

## Phase 4: App Store Connect Configuration

### Products Setup
1. Create subscription products in App Store Connect:
   - Monthly Premium ($9.99/month)
   - Annual Premium ($99.99/year)

2. Configure Introductory Offers:
   - Free trial: 1 month free
   - Pay as you go: $1.99 for first month
   - Pay up front: $19.99 for first 3 months

### App Store Settings
- Configure subscription groups
- Set up promotional offers
- Configure server-to-server notifications
- Set up App Store Connect API access

## Phase 5: Testing Strategy

### Test Scenarios
1. **Purchase Flow**
   - Free trial activation
   - Direct subscription purchase
   - Restore purchases

2. **Subscription Management**
   - Auto-renewal
   - Cancellation
   - Expiration handling

3. **Feature Access**
   - Premium feature gating
   - Graceful degradation for expired subscriptions

### Test Environment
- Use App Store Connect sandbox for testing
- Test with sandbox Apple IDs
- Validate receipt processing with test receipts

## Phase 6: Deployment Checklist

### Backend Deployment
- [ ] Deploy edge functions to Supabase
- [ ] Configure App Store Connect API secrets
- [ ] Set up subscription product data
- [ ] Configure webhook endpoints

### iOS App Updates
- [ ] Implement StoreKit 2 integration
- [ ] Add subscription UI to existing app
- [ ] Configure app capabilities for in-app purchases
- [ ] Test purchase flows thoroughly

### App Store Submission
- [ ] Update app metadata for subscriptions
- [ ] Add subscription pricing information
- [ ] Submit for App Store review
- [ ] Configure subscription offers in App Store Connect

## Security Considerations

### Receipt Validation
- Always validate receipts server-side
- Use Apple's receipt validation API
- Store and verify transaction signatures
- Implement anti-fraud measures

### Access Control
- Never trust client-side subscription status
- Always verify server-side before granting access
- Implement proper session management
- Use Row Level Security for database access

## Estimated Timeline

- **Phase 1 (Database)**: 1-2 days
- **Phase 2 (Backend)**: 1 week
- **Phase 3 (Frontend)**: 3-4 days
- **Phase 4 (App Store)**: 2-3 days
- **Phase 5 (Testing)**: 1 week
- **Phase 6 (Deployment)**: 2-3 days

**Total Estimated Time**: 3-4 weeks

## Next Steps

1. Execute database schema changes (lov-sql)
2. Implement receipt validation edge function
3. Set up App Store Connect configuration
4. Implement native iOS StoreKit integration
5. Test end-to-end purchase flow

This implementation will provide a complete subscription system with proper App Store integration, including the ability to offer "first month free" promotions configured through App Store Connect.
