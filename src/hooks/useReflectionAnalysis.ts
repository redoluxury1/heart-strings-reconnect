
import { useState, useEffect } from 'react';
import { reflectionPacks } from '@/data/reflection-insights';
import { ReflectionInsight } from '@/types/reflection-insights';
import { SessionData } from '@/components/post-conflict/context/SessionContext';

// Maximum number of reflections to return
const MAX_REFLECTIONS = 3;

export const useReflectionAnalysis = (sessionData: SessionData) => {
  const [matchedReflections, setMatchedReflections] = useState<ReflectionInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sessionData.partner1.ready && sessionData.partner2.ready) {
      analyzeResponses();
    }
  }, [sessionData.partner1.ready, sessionData.partner2.ready]);

  const analyzeResponses = () => {
    setIsLoading(true);
    
    // Extract all text responses from both partners
    const extractTextFromPartner = (partner: 'partner1' | 'partner2') => {
      const data = sessionData[partner];
      return {
        perspective: data.responses.complete?.perspective || '',
        understanding: data.responses.complete?.understanding || '',
        needs: data.responses.complete?.needs || '',
        tone: data.responses.complete?.intent || '',
        emotions: (data.responses.emotions || []).join(' ')
      };
    };

    const partner1Data = extractTextFromPartner('partner1');
    const partner2Data = extractTextFromPartner('partner2');

    // Combine all text into a single string for analysis
    const combinedText = `
      ${partner1Data.perspective} 
      ${partner1Data.understanding} 
      ${partner1Data.needs}
      ${partner1Data.emotions}
      ${partner1Data.tone}
      ${partner2Data.perspective}
      ${partner2Data.understanding}
      ${partner2Data.needs}
      ${partner2Data.emotions}
      ${partner2Data.tone}
    `.toLowerCase();

    console.log('Combined text for analysis:', combinedText);

    // Find matches for each reflection insight across all batches
    const matches: { reflection: ReflectionInsight, matchCount: number, priority: number }[] = [];

    // Process each batch of reflection packs
    Object.entries(reflectionPacks).forEach(([batchKey, packBatch]) => {
      packBatch.forEach((reflection, index) => {
        let matchCount = 0;
        let highestPriorityMatch = 0;
        
        // Count how many trigger words match in the combined text
        reflection.triggers.forEach((trigger, triggerIndex) => {
          // Create a better regex pattern that matches word boundaries
          const words = trigger.toLowerCase().split(/\s+/);
          for (const word of words) {
            if (word.length < 3) continue; // Skip very short words
            
            const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'gi');
            const occurrences = (combinedText.match(regex) || []).length;
            
            if (occurrences > 0) {
              matchCount += occurrences;
              // Higher priority for exact phrase matches
              if (combinedText.includes(trigger.toLowerCase())) {
                highestPriorityMatch = Math.max(highestPriorityMatch, 10 + (5 - triggerIndex));
              } else {
                highestPriorityMatch = Math.max(highestPriorityMatch, 5 - triggerIndex);
              }
            }
          }
        });
        
        // If we found any matches, add to our matches array
        if (matchCount > 0) {
          // Priority is a combination of match count, trigger priority, and batch priority
          // Earlier batches are considered higher quality and should get a boost
          const batchPriority = 10 - parseInt(batchKey, 10); // Earlier batches get higher priority
          const priority = matchCount + highestPriorityMatch + batchPriority;
          
          matches.push({ reflection, matchCount, priority });
        }
      });
    });

    console.log('Found matches:', matches.length);

    // Sort matches by priority (highest to lowest)
    matches.sort((a, b) => b.priority - a.priority || b.matchCount - a.matchCount);

    // Take only the top matches (up to MAX_REFLECTIONS)
    const topMatches = matches.slice(0, MAX_REFLECTIONS).map(match => match.reflection);
    
    console.log('Top matches:', topMatches);
    
    setMatchedReflections(topMatches);
    setIsLoading(false);
    
    // If no matches were found, add a default reflection
    if (topMatches.length === 0) {
      const defaultReflection: ReflectionInsight = {
        triggers: [],
        category: "general_communication",
        insight: "Open communication is key to moving forward together.",
        reflection: "Even though your perspectives differ, you both showed up to process what happened. That willingness to engage is something to celebrate, as it shows commitment to the relationship.",
        recommendation: "Continue creating space for honest conversations. Try scheduling a weekly check-in where you can both share what's going well and what needs attention."
      };
      
      setMatchedReflections([defaultReflection]);
    }
  };

  return { matchedReflections, isLoading };
};
