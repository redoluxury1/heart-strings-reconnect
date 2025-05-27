
export interface ConflictInsight {
  shared: string;
  therapist: string;
  unbiased: string;
  tryThis: string;
}

export interface ConflictInsights {
  [pattern: string]: ConflictInsight;
}
