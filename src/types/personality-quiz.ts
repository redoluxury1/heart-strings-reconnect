
// Personality types
export type PersonalityType = 'anchor' | 'spark' | 'strategist' | 'reflector';

// Answer structure
export interface QuizAnswer {
  id: string;
  text: string;
  type: PersonalityType;
}

// Question structure
export interface QuizQuestion {
  id: string;
  text: string;
  answers: QuizAnswer[];
}

// Results structure
export interface QuizResult {
  primaryType: PersonalityType;
  secondaryType: PersonalityType;
  scores: Record<PersonalityType, number>;
  percentages: Record<PersonalityType, number>;
}

// Personality type descriptions
export interface PersonalityTypeDescription {
  title: string;
  shortDescription: string;
  fullDescription: string;
  color: string;
  expressionStrengths: string;
  expressionChallenges: string;
}

export interface PersonalityDescriptions {
  [key: string]: PersonalityTypeDescription;
}
