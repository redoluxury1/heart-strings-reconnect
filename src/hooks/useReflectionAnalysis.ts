
import { useState, useEffect } from 'react';
import { reflectionPacks } from '@/data/reflection-insights';
import { ReflectionInsight } from '@/types/reflection-insights';
import { SessionData } from '@/components/post-conflict/context/SessionContext';

// Maximum number of reflections to return
const MAX_REFLECTIONS = 2;

export const useReflectionAnalysis = (sessionData: SessionData) => {
  const [matchedReflections, setMatchedReflections] = useState<ReflectionInsight[]>([]);

  useEffect(() => {
    if (sessionData.partner1.ready && sessionData.partner2.ready) {
      analyzeResponses();
    }
  }, [sessionData.partner1.ready, sessionData.partner2.ready]);

  const analyzeResponses = () => {
    // Extract all text responses from both partners
    const partner1Perspective = sessionData.partner1.responses.complete?.perspective || '';
    const partner1Understanding = sessionData.partner1.responses.complete?.understanding || '';
    const partner1Needs = sessionData.partner1.responses.complete?.needs || '';

    const partner2Perspective = sessionData.partner2.responses.complete?.perspective || '';
    const partner2Understanding = sessionData.partner2.responses.complete?.understanding || '';
    const partner2Needs = sessionData.partner2.responses.complete?.needs || '';

    // Combine all text into a single string for analysis
    const combinedText = `
      ${partner1Perspective} 
      ${partner1Understanding} 
      ${partner1Needs}
      ${partner2Perspective}
      ${partner2Understanding}
      ${partner2Needs}
    `.toLowerCase();

    // Find matches for each reflection insight across all batches
    const matches: { reflection: ReflectionInsight, matchCount: number }[] = [];

    // Process each batch of reflection packs
    Object.values(reflectionPacks).forEach(packBatch => {
      packBatch.forEach(reflection => {
        let matchCount = 0;
        
        // Count how many trigger words match in the combined text
        reflection.triggers.forEach(trigger => {
          const regex = new RegExp(`\\b${trigger.toLowerCase()}\\b`, 'g');
          const occurrences = (combinedText.match(regex) || []).length;
          matchCount += occurrences;
        });
        
        // If we found any matches, add to our matches array
        if (matchCount > 0) {
          matches.push({ reflection, matchCount });
        }
      });
    });

    // Sort matches by the number of matches (highest to lowest)
    matches.sort((a, b) => b.matchCount - a.matchCount);

    // Take only the top matches (up to MAX_REFLECTIONS)
    const topMatches = matches.slice(0, MAX_REFLECTIONS).map(match => match.reflection);
    
    setMatchedReflections(topMatches);
  };

  return { matchedReflections };
};
