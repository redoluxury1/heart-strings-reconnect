
import { useState } from 'react';
import { PatternType } from '../types';
import { ReconnectionTip, reconnectionTips } from '@/data/reconnection-tips';

export type PatternId = string;

export interface PatternRecognitionState {
  selectedPattern: PatternId | null;
  isShowingQuiz: boolean;
  isShowingTips: boolean;
  quizAnswers: { questionId: number; answer: string }[];
  currentQuestionIndex: number;
  showIntro: boolean;
  showCyclePattern: boolean;
  showPatternDetail: boolean;
  showPatternRepair: boolean;
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
  
  const handlePatternRepairComplete = () => {
    setState(prev => ({
      ...prev,
      showPatternRepair: false,
      isShowingQuiz: true
    }));
  };

  const handleAnswerSelect = (questionIndex: number, answerId: string) => {
    setState(prev => {
      const newQuizAnswers = [...prev.quizAnswers];
      newQuizAnswers[questionIndex] = {
        questionId: questionIndex,
        answer: answerId
      };

      const isLastQuestion = questionIndex === 2; // Assuming 3 questions per quiz
      
      if (isLastQuestion) {
        return {
          ...prev,
          quizAnswers: newQuizAnswers,
          isShowingQuiz: false,
          isShowingTips: true
        };
      }

      return {
        ...prev,
        quizAnswers: newQuizAnswers,
        currentQuestionIndex: questionIndex + 1
      };
    });
  };

  const handleGoBack = () => {
    setState(prev => {
      // If showing tips, go back to the quiz
      if (prev.isShowingTips) {
        return {
          ...prev,
          isShowingTips: false,
          isShowingQuiz: true,
          currentQuestionIndex: 0,
          quizAnswers: []
        };
      }
      
      // If showing quiz, go back to pattern repair
      if (prev.isShowingQuiz) {
        return {
          ...prev,
          isShowingQuiz: false,
          showPatternRepair: true,
          currentQuestionIndex: 0,
          quizAnswers: []
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
        isShowingQuiz: false,
        isShowingTips: false,
        currentQuestionIndex: 0,
        quizAnswers: []
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
      handleAnswerSelect,
      handleGoBack,
      handleIntroComplete,
      handleCyclePatternComplete,
      handlePatternDetailComplete,
      handlePatternRepairComplete
    },
    helpers: {
      getPatternSpecificTips
    }
  };
};
