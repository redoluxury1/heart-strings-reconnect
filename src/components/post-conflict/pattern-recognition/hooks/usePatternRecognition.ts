
import { useState } from 'react';
import { PatternId, PatternSession } from '../types/PatternTypes';
import { triggerChips, reactionChips, partnerReactionChips } from '../data/PatternData';

export const usePatternRecognition = () => {
  const [session, setSession] = useState<PatternSession>({
    triggerChips: [],
    reactionChips: [],
    partnerReactionChips: []
  });

  const addTriggerChip = (chipId: string) => {
    setSession(prev => ({
      ...prev,
      triggerChips: prev.triggerChips.includes(chipId) 
        ? prev.triggerChips.filter(id => id !== chipId)
        : [...prev.triggerChips, chipId]
    }));
  };

  const addReactionChip = (chipId: string) => {
    setSession(prev => ({
      ...prev,
      reactionChips: prev.reactionChips.includes(chipId)
        ? prev.reactionChips.filter(id => id !== chipId)
        : [...prev.reactionChips, chipId]
    }));
  };

  const addPartnerReactionChip = (chipId: string) => {
    setSession(prev => ({
      ...prev,
      partnerReactionChips: prev.partnerReactionChips.includes(chipId)
        ? prev.partnerReactionChips.filter(id => id !== chipId)
        : [...prev.partnerReactionChips, chipId]
    }));
  };

  const detectPattern = (): PatternId => {
    const patternCounts: Record<PatternId, number> = {
      pursue_withdraw: 0,
      criticize_defend: 0,
      escalation_loop: 0,
      emotional_shutdown: 0,
      effort_imbalance: 0,
      power_struggle: 0,
      unmet_repair: 0
    };

    // Count pattern tags from selected chips
    const allSelectedChips = [
      ...session.triggerChips.map(id => triggerChips.find(chip => chip.id === id)),
      ...session.reactionChips.map(id => reactionChips.find(chip => chip.id === id)),
      ...session.partnerReactionChips.map(id => partnerReactionChips.find(chip => chip.id === id))
    ].filter(Boolean);

    allSelectedChips.forEach(chip => {
      if (chip) {
        chip.patternTags.forEach(patternId => {
          patternCounts[patternId]++;
        });
      }
    });

    // Find pattern with highest count
    const sortedPatterns = Object.entries(patternCounts)
      .sort(([,a], [,b]) => b - a);

    const detectedPattern = sortedPatterns[0][0] as PatternId;
    
    setSession(prev => ({
      ...prev,
      detectedPattern
    }));

    return detectedPattern;
  };

  return {
    session,
    addTriggerChip,
    addReactionChip,
    addPartnerReactionChip,
    detectPattern
  };
};
