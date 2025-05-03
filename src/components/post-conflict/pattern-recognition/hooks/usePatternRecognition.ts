import { useState } from 'react';
import { QuizAnswer, PatternType } from '../types';
import { reconnectionTips, ReconnectionTip } from '@/data/reconnection-tips';
import { commonPatterns } from '../data/pattern-data';

export const usePatternRecognition = () => {
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [isShowingQuiz, setIsShowingQuiz] = useState(false);
  const [isShowingTips, setIsShowingTips] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Get pattern-specific reconnection tips
  const getPatternSpecificTips = (patternType: string): ReconnectionTip[] => {
    // First try to get pattern-specific tips
    const specificTips = reconnectionTips
      .filter(tip => tip.patterns && tip.patterns.includes(patternType as PatternType))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    // If we don't have enough specific tips, supplement with general ones
    if (specificTips.length < 3) {
      const generalTips = reconnectionTips
        .filter(tip => !tip.patterns || !tip.patterns.includes(patternType as PatternType))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 - specificTips.length);
      
      return [...specificTips, ...generalTips];
    }
    
    return specificTips;
  };
  
  const handlePatternSelect = (patternId: number) => {
    setSelectedPattern(patternId);
    setIsShowingQuiz(true);
    setQuizAnswers([]);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setQuizAnswers([...quizAnswers, { questionId, answer }]);
    
    const selectedPatternData = selectedPattern !== null 
      ? commonPatterns.find(p => p.id === selectedPattern)
      : null;
      
    const patternType = selectedPatternData?.patternType || '';
    
    // If we're on the last question, show reconnection tips
    if (currentQuestionIndex >= 2) {  // Hard-coded 2 as all quizzes have 3 questions (0, 1, 2)
      setIsShowingQuiz(false);
      setIsShowingTips(true);
    } else {
      // Otherwise, move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleGoBack = () => {
    if (isShowingTips) {
      setIsShowingTips(false);
      if (isShowingQuiz) {
        setIsShowingQuiz(true);
      } else {
        setSelectedPattern(null);
      }
    } else if (isShowingQuiz) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        // Remove the last answer
        setQuizAnswers(quizAnswers.slice(0, quizAnswers.length - 1));
      } else {
        setIsShowingQuiz(false);
        setSelectedPattern(null);
      }
    } else if (selectedPattern !== null) {
      setSelectedPattern(null);
    }
  };

  return {
    state: {
      selectedPattern,
      isShowingQuiz,
      isShowingTips,
      quizAnswers,
      currentQuestionIndex
    },
    actions: {
      handlePatternSelect,
      handleAnswerSelect,
      handleGoBack
    },
    helpers: {
      getPatternSpecificTips
    }
  };
};
