
import { supabase } from '@/integrations/supabase/client';

export interface FeatureUsageData {
  featureName: string;
  action: string;
  metadata?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}

export interface BetaFeedbackData {
  feedbackType: 'bug' | 'feature_request' | 'general' | 'rating';
  title?: string;
  content: string;
  rating?: number;
  pageUrl?: string;
  userAgent?: string;
}

// Track feature usage for analytics
export const trackFeatureUsage = async (data: FeatureUsageData) => {
  try {
    const { error } = await supabase
      .from('feature_usage')
      .insert({
        user_id: data.userId || null,
        session_id: data.sessionId || generateSessionId(),
        feature_name: data.featureName,
        action: data.action,
        metadata: data.metadata || null
      });

    if (error) {
      console.error('Error tracking feature usage:', error);
    }
  } catch (error) {
    console.error('Error tracking feature usage:', error);
  }
};

// Submit beta feedback
export const submitBetaFeedback = async (userId: string, data: BetaFeedbackData) => {
  try {
    const { error } = await supabase
      .from('beta_feedback')
      .insert({
        user_id: userId,
        feedback_type: data.feedbackType,
        title: data.title || null,
        content: data.content,
        rating: data.rating || null,
        page_url: data.pageUrl || window.location.href,
        user_agent: data.userAgent || navigator.userAgent
      });

    if (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
};

// Generate a session ID for anonymous tracking
function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Helper function to track common actions
export const trackAction = {
  toolUsed: (toolName: string, metadata?: Record<string, any>) => {
    trackFeatureUsage({
      featureName: toolName,
      action: 'used',
      metadata
    });
  },
  
  pageViewed: (pageName: string) => {
    trackFeatureUsage({
      featureName: pageName,
      action: 'viewed'
    });
  },
  
  featureCompleted: (featureName: string, metadata?: Record<string, any>) => {
    trackFeatureUsage({
      featureName: featureName,
      action: 'completed',
      metadata
    });
  },
  
  promptSelected: (promptType: string, promptText: string) => {
    trackFeatureUsage({
      featureName: promptType,
      action: 'prompt_selected',
      metadata: { prompt: promptText }
    });
  }
};
