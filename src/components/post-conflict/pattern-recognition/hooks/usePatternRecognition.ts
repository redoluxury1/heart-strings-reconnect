
import { useState, useCallback } from 'react';
import { reconnectionTips, ReconnectionTip } from '@/data/reconnection-tips';
import { PatternType } from '../types';

export type PatternId = string;

export const usePatternRecognition = () => {
  const [selectedPattern, setSelectedPattern] = useState<PatternId | null>(null);
  const [isShowingQuiz, setIsShowingQuiz] = useState(false);
  const [isShowingTips, setIsShowingTips] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Array<{questionId: number, answer: string}>>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const handlePatternSelect = useCallback((patternId: PatternId) => {
    setSelectedPattern(patternId);
    setIsShowingQuiz(true);
    setCurrentQuestionIndex(0);
    setQuizAnswers([]);
  }, []);

  const handleAnswerSelect = useCallback((questionIndex: number, answerId: string) => {
    setQuizAnswers(prev => [
      ...prev, 
      { questionId: questionIndex, answer: answerId }
    ]);
    
    // Move to the next question or show tips
    setCurrentQuestionIndex(prev => {
      const nextIndex = prev + 1;
      // If no more questions, show tips
      if (nextIndex >= 3) { // Assuming 3 questions per pattern
        setIsShowingTips(true);
        setIsShowingQuiz(false);
        return 0;
      }
      return nextIndex;
    });
  }, []);
  
  const handleGoBack = useCallback(() => {
    if (isShowingTips) {
      setIsShowingTips(false);
      setIsShowingQuiz(true);
    } else if (isShowingQuiz) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        setQuizAnswers(prev => prev.slice(0, -1));
      } else {
        setIsShowingQuiz(false);
        setSelectedPattern(null);
      }
    } else {
      setSelectedPattern(null);
    }
  }, [isShowingQuiz, isShowingTips, currentQuestionIndex]);
  
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);
  
  const getPatternSpecificTips = useCallback((patternType: string): ReconnectionTip[] => {
    const matchingTips = reconnectionTips.filter(tip => 
      tip.applicablePatterns.includes(patternType as PatternType)
    );
    
    if (matchingTips.length >= 3) {
      return matchingTips.slice(0, 3);
    }
    
    // Not enough matching tips, add some general ones
    const generalTips = reconnectionTips.filter(tip => 
      tip.applicablePatterns.includes('all')
    );
    
    return [...matchingTips, ...generalTips].slice(0, 3);
  }, []);
  
  return {
    state: {
      selectedPattern,
      isShowingQuiz,
      isShowingTips,
      quizAnswers,
      currentQuestionIndex,
      showIntro
    },
    actions: {
      handlePatternSelect,
      handleAnswerSelect,
      handleGoBack,
      handleIntroComplete
    },
    helpers: {
      getPatternSpecificTips
    }
  };
};
