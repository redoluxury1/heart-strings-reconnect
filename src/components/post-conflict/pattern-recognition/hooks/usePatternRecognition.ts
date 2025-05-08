import { useState } from 'react';
import { PatternType } from '../types';
import { ReconnectionTip, reconnectionTips } from '@/data/reconnection-tips';

export type PatternId = string;

export interface PatternRecognitionState {
  selectedPattern: PatternId | null;
  isShowingTips: boolean;
  showIntro: boolean;
  showCyclePattern: boolean;
  showPatternDetail: boolean;
  showPatternRepair: boolean;
}

export const usePatternRecognition = () => {
  const [state, setState] = useState<PatternRecognitionState>({
    selectedPattern: null,
    isShowingTips: false,
    showIntro: true,
    showCyclePattern: false,
    showPatternDetail: false,
    showPatternRepair: false
  });

  const handleIntroComplete = () => {
    setState(prev => ({
      ...prev,
      showIntro: false,
      showCyclePattern: true
    }));
  };

  const handleCyclePatternComplete = () => {
    setState(prev => ({
      ...prev,
      showCyclePattern: false
    }));
  };

  const handlePatternSelect = (patternId: PatternId) => {
    setState(prev => ({
      ...prev,
      selectedPattern: patternId,
      showPatternDetail: true
    }));
  };
  
  const handlePatternDetailComplete = () => {
    setState(prev => ({
      ...prev,
      showPatternDetail: false,
      showPatternRepair: true
    }));
  };

  const handleGoBack = () => {
    setState(prev => {
      // If showing tips, go back to pattern selection
      if (prev.isShowingTips) {
        return {
          ...prev,
          isShowingTips: false,
          selectedPattern: null
        };
      }
      
      // If showing pattern repair, go back to pattern detail
      if (prev.showPatternRepair) {
        return {
          ...prev,
          showPatternRepair: false,
          showPatternDetail: true
        };
      }
      
      // If showing pattern detail, go back to pattern selection
      if (prev.showPatternDetail) {
        return {
          ...prev,
          selectedPattern: null,
          showPatternDetail: false
        };
      }

      // Default: reset to the initial pattern selection
      return {
        ...prev,
        selectedPattern: null,
        isShowingTips: false
      };
    });
  };

  const getPatternSpecificTips = (patternType: PatternType): ReconnectionTip[] => {
    // Filter tips that are specific to this pattern type
    const specificTips = reconnectionTips.filter(tip => 
      tip.patterns && tip.patterns.includes(patternType)
    );
    
    // If we have at least 3 specific tips, return those
    if (specificTips.length >= 3) {
      return specificTips.slice(0, 3);
    }
    
    // Otherwise, add some generic tips to reach 3
    const genericTips = reconnectionTips
      .filter(tip => !tip.patterns || !tip.patterns.includes(patternType))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3 - specificTips.length);
    
    return [...specificTips, ...genericTips];
  };

  return {
    state,
    actions: {
      handlePatternSelect,
      handleGoBack,
      handleIntroComplete,
      handleCyclePatternComplete,
      handlePatternDetailComplete
    },
    helpers: {
      getPatternSpecificTips
    }
  };
};
