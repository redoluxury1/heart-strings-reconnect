
import { ReconnectionTip } from '@/data/reconnection-tips';

export interface CommonPattern {
  id: number;
  name: string;
  description: string;
  examples: string[];
  breakingTips: string[];
  patternType: PatternType;
}

export type PatternType = 'criticism-defensiveness' | 'stonewalling-pursuit' | 'contempt-contempt';

export interface PatternQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface PatternQuizzes {
  [key: string]: PatternQuestion[];
}

export interface QuizAnswer {
  questionId: number;
  answer: string;
}

export interface PatternRecognitionState {
  selectedPattern: number | null;
  isShowingQuiz: boolean;
  isShowingTips: boolean;
  quizAnswers: QuizAnswer[];
  currentQuestionIndex: number;
}

export interface PatternRecognitionHelpers {
  getPatternSpecificTips: (patternType: string) => ReconnectionTip[];
}
