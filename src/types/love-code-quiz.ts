
// Love Code types
export type LoveCode = 'loving_words' | 'thoughtful_gestures' | 'intentional_time' | 'helpful_actions' | 'physical_connection';

// Answer structure
export interface LoveCodeAnswer {
  id: string;
  text: string;
  code: LoveCode;
}

// Question structure
export interface LoveCodeQuestion {
  id: string;
  text: string;
  answers: LoveCodeAnswer[];
}

// Results structure
export interface LoveCodeResult {
  primaryCode: LoveCode;
  secondaryCode: LoveCode;
  scores: Record<LoveCode, number>;
  percentages: Record<LoveCode, number>;
}

// Love Code descriptions
export interface LoveCodeDescription {
  title: string;
  emotionalCore: string;
  howYouFeelLoved: string;
  oftenMisread: string;
  growthTips: string;
  shortSummary: string;
  color: string;
  detailedDescription?: {
    emotionalCore?: string;
    howYouFeelLoved?: string;
    oftenMisread?: string;
    relationalGrowthTips?: string;
  };
  secondaryDescription?: string;
}

export interface LoveCodeDescriptions {
  [key: string]: LoveCodeDescription;
}

// PhraseCatagory definition for say-instead-phrases
export type PhraseCategory = string;

export interface SayInsteadPhrase {
  id: number;
  original: string;
  categories: PhraseCategory[];
  alternatives: string[];
  whyItWorks: string;
}
