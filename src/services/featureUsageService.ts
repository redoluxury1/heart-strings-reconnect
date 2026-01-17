
const STORAGE_KEY = 'feature_usage_data';

export interface FeatureUsage {
  featureName: string;
  usageCount: number;
  lastUsed: string;
}

export interface UsageSummary {
  totalFeatureUses: number;
  uniqueFeaturesUsed: string[];
  shouldShowPaywall: boolean;
}

// Freemium rules:
// - Same feature used 2+ times → paywall
// - 2+ different features used → paywall
const SAME_FEATURE_LIMIT = 2;
const UNIQUE_FEATURES_LIMIT = 2;

class FeatureUsageServiceClass {
  private getStoredUsage(): FeatureUsage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveUsage(usage: FeatureUsage[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
    } catch (error) {
      console.error('Failed to save feature usage:', error);
    }
  }

  trackFeatureCompletion(featureName: string): void {
    const usage = this.getStoredUsage();
    const existingIndex = usage.findIndex(u => u.featureName === featureName);
    
    if (existingIndex >= 0) {
      usage[existingIndex].usageCount += 1;
      usage[existingIndex].lastUsed = new Date().toISOString();
    } else {
      usage.push({
        featureName,
        usageCount: 1,
        lastUsed: new Date().toISOString()
      });
    }
    
    this.saveUsage(usage);
    console.log(`📊 Feature tracked: ${featureName}`, this.getUsageSummary());
  }

  getUsageSummary(): UsageSummary {
    const usage = this.getStoredUsage();
    const totalFeatureUses = usage.reduce((sum, u) => sum + u.usageCount, 0);
    const uniqueFeaturesUsed = usage.map(u => u.featureName);
    
    // Check if any single feature has been used 2+ times
    const anyFeatureUsedTwice = usage.some(u => u.usageCount >= SAME_FEATURE_LIMIT);
    
    // Check if 2+ different features have been used
    const twoOrMoreFeatures = uniqueFeaturesUsed.length >= UNIQUE_FEATURES_LIMIT;
    
    const shouldShowPaywall = anyFeatureUsedTwice || twoOrMoreFeatures;
    
    return {
      totalFeatureUses,
      uniqueFeaturesUsed,
      shouldShowPaywall
    };
  }

  shouldShowPaywall(): boolean {
    return this.getUsageSummary().shouldShowPaywall;
  }

  resetUsage(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('🔄 Feature usage reset');
    } catch (error) {
      console.error('Failed to reset feature usage:', error);
    }
  }

  // Get a personalized message for the paywall
  getPaywallMessage(): string {
    const { uniqueFeaturesUsed } = this.getUsageSummary();
    
    if (uniqueFeaturesUsed.length === 0) {
      return "Subscribe to unlock all our relationship tools.";
    }
    
    if (uniqueFeaturesUsed.length === 1) {
      return `You've tried our tools! Subscribe to continue using them unlimited.`;
    }
    
    return `You've explored multiple tools! Subscribe to continue using them all.`;
  }
}

export const FeatureUsageService = new FeatureUsageServiceClass();
