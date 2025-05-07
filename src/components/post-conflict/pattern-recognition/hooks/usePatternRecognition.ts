
import { useState } from 'react';
import { PatternId, PatternType } from '../types';
import { reconnectionTips } from '@/data/reconnection-tips';

export const usePatternRecognition = () => {
  const [selectedPattern, setSelectedPattern] = useState<PatternId | null>(null);
  const [isShowingQuiz, setIsShowingQuiz] = useState(false);
  const [isShowingTips, setIsShowingTips] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // Handle selecting a pattern
  const handlePatternSelect = (patternId: PatternId) => {
    setSelectedPattern(patternId);
    setIsShowingQuiz(true);
    setCurrentQuestionIndex(0);
  };

  // Handle going back to previous screen
  const handleGoBack = () => {
    if (isShowingTips) {
      setIsShowingTips(false);
      setIsShowingQuiz(true);
    } else if (isShowingQuiz) {
      setIsShowingQuiz(false);
      setSelectedPattern(null);
    } else if (selectedPattern !== null) {
      setSelectedPattern(null);
    }
  };

  // Handle selecting an answer in the quiz
  const handleAnswerSelect = (_answerId: string) => {
    // Move to next question or show tips
    if (currentQuestionIndex < 2) { // Assuming 3 questions per pattern
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsShowingQuiz(false);
      setIsShowingTips(true);
    }
  };

  // Handle intro completion
  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Helper to get pattern specific tips
  const getPatternSpecificTips = (patternType: PatternType) => {
    // Filter tips that are relevant to this pattern type
    const filteredTips = reconnectionTips.filter(tip => 
      tip.relevantPatterns.includes(patternType)
    );
    
    // If we have enough relevant tips, return those, otherwise fall back to random ones
    return filteredTips.length >= 3 
      ? filteredTips.slice(0, 3) 
      : reconnectionTips.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  return {
    state: {
      selectedPattern,
      isShowingQuiz,
      isShowingTips,
      currentQuestionIndex,
      showIntro,
    },
    actions: {
      handlePatternSelect,
      handleAnswerSelect,
      handleGoBack,
      handleIntroComplete,
    },
    helpers: {
      getPatternSpecificTips,
    }
  };
};
