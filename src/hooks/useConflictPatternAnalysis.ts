
import { useState, useEffect } from 'react';
import { SessionData } from '@/components/post-conflict/context/SessionContext';
import { supabase } from '@/integrations/supabase/client';

export type ConflictPattern = 
  | 'weaponized_vulnerability'
  | 'broken_trust'
  | 'emotional_invalidation'
  | 'power_struggles'
  | 'emotional_shutdown'
  | 'effort_imbalance'
  | 'miscommunication_loops'
  | 'general_repair';

interface ConflictPatternIndicators {
  [key: string]: {
    keywords: string[];
    phrases: string[];
    emotionalTones: string[];
    weight: number;
  };
}

const conflictPatternIndicators: ConflictPatternIndicators = {
  weaponized_vulnerability: {
    keywords: ['trusted', 'used against me', 'past', 'secret', 'vulnerable', 'threw it back', 'weaponized'],
    phrases: ['you used that against me', 'i trusted you with that', 'you always bring up my past', 'threw it in my face'],
    emotionalTones: ['betrayed', 'exposed', 'regret', 'violated'],
    weight: 10
  },
  broken_trust: {
    keywords: ['promised', 'said you would', 'cancel', 'forgot', 'lie', 'trust', 'inconsistent', 'follow through'],
    phrases: ['you said you would', 'you always cancel', 'you forgot again', 'i dont trust you', 'broken promise'],
    emotionalTones: ['disappointed', 'let down', 'suspicious', 'betrayed'],
    weight: 9
  },
  emotional_invalidation: {
    keywords: ['listen', 'interrupt', 'care', 'dismiss', 'overreacting', 'sensitive', 'dramatic', 'invalidate'],
    phrases: ['you never listen', 'stop interrupting me', 'you dont care how i feel', 'youre being dramatic', 'youre too sensitive'],
    emotionalTones: ['unheard', 'dismissed', 'frustrated', 'invisible'],
    weight: 8
  },
  emotional_shutdown: {
    keywords: ['shut down', 'silent', 'withdraw', 'space', 'overwhelmed', 'quiet', 'stonewalling', 'checked out'],
    phrases: ['you always shut down', 'you go silent', 'i need space', 'too much', 'you wont talk', 'emotionally unavailable'],
    emotionalTones: ['overwhelmed', 'numb', 'exhausted', 'abandoned', 'frozen'],
    weight: 8
  },
  effort_imbalance: {
    keywords: ['always me', 'never help', 'carry everything', 'effort', 'try', 'exhausted', 'unfair', 'one sided'],
    phrases: ['i do everything', 'you never help', 'always on me', 'i carry the load', 'one sided', 'pulling my weight'],
    emotionalTones: ['exhausted', 'resentful', 'alone', 'burned out', 'unappreciated'],
    weight: 7
  },
  power_struggles: {
    keywords: ['control', 'boss', 'tell me what to do', 'decisions', 'respect', 'power', 'authority', 'dominate'],
    phrases: ['you always have to control', 'stop telling me what to do', 'you dont respect me', 'who made you the boss'],
    emotionalTones: ['controlled', 'powerless', 'defiant', 'disrespected'],
    weight: 7
  },
  miscommunication_loops: {
    keywords: ['misunderstood', 'not what i meant', 'twisted', 'confused', 'escalated', 'spiral', 'loop'],
    phrases: ['thats not what i meant', 'you twisted my words', 'we keep missing each other', 'this got out of hand', 'same fight again'],
    emotionalTones: ['confused', 'frustrated', 'misunderstood', 'reactive', 'spinning'],
    weight: 6
  }
};

export const useConflictPatternAnalysis = (sessionData: SessionData) => {
  const [primaryPattern, setPrimaryPattern] = useState<ConflictPattern | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMethod, setAnalysisMethod] = useState<'gpt' | 'keyword' | 'fallback'>('keyword');

  useEffect(() => {
    if (sessionData.partner1.ready && sessionData.partner2.ready) {
      analyzeConflictPattern();
    }
  }, [sessionData.partner1.ready, sessionData.partner2.ready]);

  const analyzeConflictPattern = async () => {
    setIsAnalyzing(true);
    
    try {
      // Extract conversation content
      const conversationText = extractConversationText();
      
      console.log('Starting conflict pattern analysis for:', conversationText.substring(0, 200) + '...');

      // Try GPT analysis first
      let detectedPattern = await tryGPTAnalysis(conversationText);
      
      if (detectedPattern) {
        setAnalysisMethod('gpt');
        setPrimaryPattern(detectedPattern);
      } else {
        // Fallback to keyword analysis
        console.log('GPT analysis failed, falling back to keyword matching');
        detectedPattern = performKeywordAnalysis(conversationText);
        setAnalysisMethod('keyword');
        setPrimaryPattern(detectedPattern);
      }
      
    } catch (error) {
      console.error('Error in conflict pattern analysis:', error);
      // Ultimate fallback
      setAnalysisMethod('fallback');
      setPrimaryPattern('general_repair');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const extractConversationText = (): string => {
    const extractTextFromPartner = (partner: 'partner1' | 'partner2') => {
      const data = sessionData[partner];
      return {
        perspective: data.responses.complete?.perspective || '',
        understanding: data.responses.complete?.understanding || '',
        needs: data.responses.complete?.needs || '',
        intent: data.responses.complete?.intent || '',
        emotions: (data.responses.emotions || []).join(' ')
      };
    };

    const partner1Data = extractTextFromPartner('partner1');
    const partner2Data = extractTextFromPartner('partner2');

    return `
      Partner 1: ${partner1Data.perspective} ${partner1Data.understanding} ${partner1Data.needs} ${partner1Data.emotions} ${partner1Data.intent}
      Partner 2: ${partner2Data.perspective} ${partner2Data.understanding} ${partner2Data.needs} ${partner2Data.emotions} ${partner2Data.intent}
    `.toLowerCase();
  };

  const tryGPTAnalysis = async (conversationText: string): Promise<ConflictPattern | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-conflict-pattern', {
        body: { 
          conversationText,
          availablePatterns: [
            'weaponized_vulnerability',
            'broken_trust', 
            'emotional_invalidation',
            'power_struggles',
            'emotional_shutdown',
            'effort_imbalance',
            'miscommunication_loops'
          ]
        }
      });

      if (error) {
        console.error('GPT analysis error:', error);
        return null;
      }

      return data?.pattern || null;
    } catch (error) {
      console.error('Failed to call GPT analysis:', error);
      return null;
    }
  };

  const performKeywordAnalysis = (conversationText: string): ConflictPattern | null => {
    console.log('Performing keyword analysis on conversation text');

    const patternScores: { [key: string]: number } = {};
    
    Object.entries(conflictPatternIndicators).forEach(([pattern, indicators]) => {
      let score = 0;
      
      // Check keywords
      indicators.keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi');
        const matches = (conversationText.match(regex) || []).length;
        score += matches * 2;
      });
      
      // Check phrases (higher weight)
      indicators.phrases.forEach(phrase => {
        if (conversationText.includes(phrase.toLowerCase())) {
          score += 5;
        }
      });
      
      // Check emotional tones
      indicators.emotionalTones.forEach(tone => {
        const regex = new RegExp(`\\b${tone.toLowerCase()}\\b`, 'gi');
        const matches = (conversationText.match(regex) || []).length;
        score += matches * 3;
      });
      
      patternScores[pattern] = score * indicators.weight;
    });

    console.log('Pattern analysis scores:', patternScores);

    // Find the highest scoring pattern with minimum threshold
    const topPattern = Object.entries(patternScores)
      .sort(([,a], [,b]) => b - a)
      .find(([, score]) => score > 10); // Minimum confidence threshold

    if (topPattern) {
      const detectedPattern = topPattern[0] as ConflictPattern;
      console.log('Detected pattern:', detectedPattern, 'with score:', topPattern[1]);
      return detectedPattern;
    }

    console.log('No clear pattern detected, defaulting to general_repair');
    return 'general_repair';
  };

  const getPatternDisplayName = (pattern: ConflictPattern): string => {
    const names = {
      weaponized_vulnerability: 'Weaponized Vulnerability',
      broken_trust: 'Broken Trust',
      emotional_invalidation: 'Emotional Invalidation',
      power_struggles: 'Power Struggles',
      emotional_shutdown: 'Emotional Shutdown',
      effort_imbalance: 'Effort Imbalance',
      miscommunication_loops: 'Miscommunication Loops',
      general_repair: 'General Repair'
    };
    return names[pattern] || 'General Communication';
  };

  return {
    primaryPattern,
    isAnalyzing,
    analysisMethod,
    getPatternDisplayName
  };
};
