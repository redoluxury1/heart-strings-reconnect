
/**
 * Types for the Pattern Recognition feature
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export type PatternType = 
  | 'criticism-defensiveness'
  | 'stonewalling-pursuit'
  | 'contempt-contempt'
  | 'pursue-distance';

export interface CommonPattern {
  id: number;
  name: string;
  description: string;
  examples: string[];
  breakingTips: string[];
  patternType: PatternType;
}

export interface PatternQuizzes {
  [key: string]: QuizQuestion[];
}
