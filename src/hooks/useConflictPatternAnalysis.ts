import { useState, useEffect } from 'react';
import { SessionData } from '@/components/post-conflict/context/SessionContext';
import { ReflectionInsight } from '@/types/reflection-insights';
import { reflectionPacks } from '@/data/reflection-insights';

export type ConflictPattern = 
  | 'weaponized_vulnerability'
  | 'broken_trust'
  | 'emotional_invalidation'
  | 'power_struggles'
  | 'emotional_shutdown'
  | 'effort_imbalance'
  | 'miscommunication_loops';

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
    keywords: ['trusted', 'used against me', 'past', 'secret', 'vulnerable'],
    phrases: ['you used that against me', 'i trusted you with that', 'you always bring up my past', 'threw it in my face'],
    emotionalTones: ['betrayed', 'exposed', 'regret'],
    weight: 10
  },
  broken_trust: {
    keywords: ['promised', 'said you would', 'cancel', 'forgot', 'lie', 'trust'],
    phrases: ['you said you would', 'you always cancel', 'you forgot again', 'i dont trust you'],
    emotionalTones: ['disappointed', 'let down', 'suspicious'],
    weight: 9
  },
  emotional_invalidation: {
    keywords: ['listen', 'interrupt', 'care', 'dismiss', 'overreacting', 'sensitive'],
    phrases: ['you never listen', 'stop interrupting me', 'you dont care how i feel', 'youre being dramatic'],
    emotionalTones: ['unheard', 'dismissed', 'frustrated'],
    weight: 8
  },
  power_struggles: {
    keywords: ['control', 'boss', 'tell me what to do', 'decisions', 'respect'],
    phrases: ['you always have to control', 'stop telling me what to do', 'you dont respect me'],
    emotionalTones: ['controlled', 'powerless', 'defiant'],
    weight: 7
  },
  emotional_shutdown: {
    keywords: ['shut down', 'silent', 'withdraw', 'space', 'overwhelmed'],
    phrases: ['you always shut down', 'you go silent', 'i need space', 'too much'],
    emotionalTones: ['overwhelmed', 'numb', 'exhausted'],
    weight: 8
  },
  effort_imbalance: {
    keywords: ['always me', 'never help', 'carry everything', 'effort', 'try'],
    phrases: ['i do everything', 'you never help', 'always on me', 'i carry the load'],
    emotionalTones: ['exhausted', 'resentful', 'alone'],
    weight: 7
  },
  miscommunication_loops: {
    keywords: ['misunderstood', 'not what i meant', 'twisted', 'confused'],
    phrases: ['thats not what i meant', 'you twisted my words', 'we keep missing each other'],
    emotionalTones: ['confused', 'frustrated', 'misunderstood'],
    weight: 6
  }
};

export const useConflictPatternAnalysis = (sessionData: SessionData) => {
  const [primaryPattern, setPrimaryPattern] = useState<ConflictPattern | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (sessionData.partner1.ready && sessionData.partner2.ready) {
      analyzeConflictPattern();
    }
  }, [sessionData.partner1.ready, sessionData.partner2.ready]);

  const analyzeConflictPattern = () => {
    setIsAnalyzing(true);
    
    // Extract conversation content
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

    // Combine all conversation text
    const combinedText = `
      ${partner1Data.perspective} 
      ${partner1Data.understanding} 
      ${partner1Data.needs}
      ${partner1Data.emotions}
      ${partner1Data.intent}
      ${partner2Data.perspective}
      ${partner2Data.understanding}
      ${partner2Data.needs}
      ${partner2Data.emotions}
      ${partner2Data.intent}
    `.toLowerCase();

    console.log('Analyzing conflict pattern for:', combinedText);

    // Score each pattern
    const patternScores: { [key: string]: number } = {};
    
    Object.entries(conflictPatternIndicators).forEach(([pattern, indicators]) => {
      let score = 0;
      
      // Check keywords
      indicators.keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi');
        const matches = (combinedText.match(regex) || []).length;
        score += matches * 2;
      });
      
      // Check phrases (higher weight)
      indicators.phrases.forEach(phrase => {
        if (combinedText.includes(phrase.toLowerCase())) {
          score += 5;
        }
      });
      
      // Check emotional tones
      indicators.emotionalTones.forEach(tone => {
        const regex = new RegExp(`\\b${tone.toLowerCase()}\\b`, 'gi');
        const matches = (combinedText.match(regex) || []).length;
        score += matches * 3;
      });
      
      patternScores[pattern] = score * indicators.weight;
    });

    console.log('Pattern scores:', patternScores);

    // Find the highest scoring pattern
    const topPattern = Object.entries(patternScores)
      .sort(([,a], [,b]) => b - a)
      .find(([, score]) => score > 0);

    if (topPattern) {
      const detectedPattern = topPattern[0] as ConflictPattern;
      setPrimaryPattern(detectedPattern);
    } else {
      setPrimaryPattern(null);
    }
    
    setIsAnalyzing(false);
  };

  const getPatternDisplayName = (pattern: ConflictPattern): string => {
    const names = {
      weaponized_vulnerability: 'Weaponized Vulnerability',
      broken_trust: 'Broken Trust',
      emotional_invalidation: 'Emotional Invalidation',
      power_struggles: 'Power Struggles',
      emotional_shutdown: 'Emotional Shutdown',
      effort_imbalance: 'Effort Imbalance',
      miscommunication_loops: 'Miscommunication Loops'
    };
    return names[pattern] || 'General Communication';
  };

  return {
    primaryPattern,
    isAnalyzing,
    getPatternDisplayName
  };
};
