
export type PatternId = 
  | 'pursue_withdraw'
  | 'criticize_defend'
  | 'escalation_loop'
  | 'emotional_shutdown'
  | 'effort_imbalance'
  | 'power_struggle'
  | 'unmet_repair';

export interface PatternChip {
  id: string;
  text: string;
  patternTags: PatternId[];
}

export interface Pattern {
  id: PatternId;
  name: string;
  explanation: string;
  insight: string;
  repairAdvice: string;
}

export interface PatternSession {
  triggerChips: string[];
  reactionChips: string[];
  partnerReactionChips: string[];
  detectedPattern?: PatternId;
}
