
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
  | 'pursue-distance'
  | 'silent-tension-snap'
  | 'criticize-control'
  | 'fix-reject';

// Base pattern interface
export interface Pattern {
  id: number;
  name: string;
  description: string;
  examples: string[];
  breakingTips?: string[];
  patternType: PatternType;
}

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

// Props for component interfaces
export interface PatternIntroScreenProps {
  onContinue: () => void;
}

export interface PatternListProps {
  patterns?: CommonPattern[];
  onPatternSelect: (pattern: CommonPattern) => void;
  togglePatternSelection?: (id: number | string) => void;
  selectedPatterns?: (number | string)[];
}

export interface PatternDetailScreenProps {
  pattern: CommonPattern | null;
  onBack: () => void;
  onViewCycle: () => void;
  onViewRepair: () => void;
}

export interface PursueDistanceDetailScreenProps {
  onBack: () => void;
  onViewCycle: () => void;
  onViewRepair: () => void;
}

export interface CyclePatternScreenProps {
  pattern?: CommonPattern | null;
  cycleData?: any;
  onBack?: () => void;
  onViewRepair?: () => void;
  onContinue: () => void;
}

export interface PatternRepairScreenProps {
  pattern?: CommonPattern | null;
  onBack: () => void;
  onContinue: () => void;
  buttonText?: string;
}

export interface PursueDistanceRepairScreenProps {
  onBack?: () => void;
  onContinue: () => void;
  buttonText?: string;
}
