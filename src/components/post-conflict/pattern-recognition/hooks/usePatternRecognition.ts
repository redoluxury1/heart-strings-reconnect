
import { useState, useCallback } from 'react';
import { reconnectionTips, ReconnectionTip } from '@/data/reconnection-tips';
import { PatternType } from '../types';

export type PatternId = string;

interface PatternRecognitionState {
  selectedPattern: PatternId | null;
  isShowingQuiz: boolean;
  isShowingTips: boolean;
  quizAnswers: Array<{ questionId: number; answer: string }>;
  currentQuestionIndex: number;
  showIntro: boolean;
  showCyclePattern: boolean;
}

export const usePatternRecognition = () => {
  const [state, setState] = useState<PatternRecognitionState>({
    selectedPattern: null,
    isShowingQuiz: false,
    isShowingTips: false,
    quizAnswers: [],
    currentQuestionIndex: 0,
    showIntro: true,
    showCyclePattern: false,
  });
  
  const handleIntroComplete = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      showIntro: false,
      showCyclePattern: true,
    }));
  }, []);
  
  const handleCyclePatternComplete = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      showCyclePattern: false,
    }));
  }, []);

  const handlePatternSelect = useCallback((patternId: PatternId) => {
    setState(prevState => ({
      ...prevState,
      selectedPattern: patternId,
      isShowingQuiz: true,
      currentQuestionIndex: 0,
      quizAnswers: [],
    }));
  }, []);
  
  const handleAnswerSelect = useCallback((questionId: number, answerId: string) => {
    setState(prevState => {
      const newAnswers = [
        ...prevState.quizAnswers, 
        { questionId, answer: answerId }
      ];
      
      const isLastQuestion = prevState.currentQuestionIndex >= 1;
      
      if (isLastQuestion) {
        return {
          ...prevState,
          quizAnswers: newAnswers,
          isShowingQuiz: false,
          isShowingTips: true,
        };
      }
      
      return {
        ...prevState,
        quizAnswers: newAnswers,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      };
    });
  }, []);
  
  const handleGoBack = useCallback(() => {
    setState(prevState => {
      if (prevState.isShowingTips) {
        return {
          ...prevState,
          isShowingTips: false,
          isShowingQuiz: true,
        };
      }
      
      if (prevState.isShowingQuiz) {
        return {
          ...prevState,
          isShowingQuiz: false,
          selectedPattern: null,
          quizAnswers: [],
          currentQuestionIndex: 0,
        };
      }
      
      if (prevState.showCyclePattern) {
        return {
          ...prevState,
          showCyclePattern: false,
          showIntro: true,
        };
      }
      
      return {
        ...prevState,
        selectedPattern: null,
      };
    });
  }, []);
  
  const getPatternSpecificTips = useCallback((patternType: string): ReconnectionTip[] => {
    return reconnectionTips
      .filter(tip => 
        tip.patterns.includes(patternType as PatternType)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, []);
  
  return {
    state,
    actions: {
      handlePatternSelect,
      handleAnswerSelect,
      handleGoBack,
      handleIntroComplete,
      handleCyclePatternComplete,
    },
    helpers: {
      getPatternSpecificTips,
    }
  };
};
