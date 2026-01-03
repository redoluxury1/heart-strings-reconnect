export interface PatternCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface ConflictPattern {
  id: string;
  categoryId: string;
  label: string;
  description: string;
}

export const patternCategories: PatternCategory[] = [
  {
    id: 'communication',
    label: 'Communication',
    icon: 'MessageCircle',
    description: 'How we talk (or don\'t talk) to each other'
  },
  {
    id: 'triggers',
    label: 'Recurring Triggers',
    icon: 'Zap',
    description: 'What keeps setting off conflicts'
  },
  {
    id: 'responses',
    label: 'Response Patterns',
    icon: 'RefreshCw',
    description: 'How we typically react in conflict'
  },
  {
    id: 'unmet-needs',
    label: 'Unmet Needs',
    icon: 'Heart',
    description: 'What we keep asking for but not getting'
  }
];

export const conflictPatterns: ConflictPattern[] = [
  // Communication patterns
  { id: 'stonewalling', categoryId: 'communication', label: 'One of us shuts down', description: 'Withdrawing or refusing to engage during conflict' },
  { id: 'interrupting', categoryId: 'communication', label: 'We interrupt each other', description: 'Not letting the other finish their thoughts' },
  { id: 'yelling', categoryId: 'communication', label: 'Voices get raised', description: 'Escalating to yelling or harsh tones' },
  { id: 'passive-aggressive', categoryId: 'communication', label: 'Indirect comments', description: 'Sarcasm, silent treatment, or backhanded remarks' },
  { id: 'blame-game', categoryId: 'communication', label: 'Blame game', description: 'Pointing fingers instead of problem-solving' },
  
  // Recurring triggers
  { id: 'chores', categoryId: 'triggers', label: 'Chores & housework', description: 'Division of labor at home' },
  { id: 'money', categoryId: 'triggers', label: 'Money & finances', description: 'Spending, saving, or financial decisions' },
  { id: 'time', categoryId: 'triggers', label: 'Quality time', description: 'Not spending enough time together' },
  { id: 'family', categoryId: 'triggers', label: 'Family & in-laws', description: 'Issues involving extended family' },
  { id: 'parenting', categoryId: 'triggers', label: 'Parenting differences', description: 'Different approaches to raising kids' },
  { id: 'stress', categoryId: 'triggers', label: 'External stress', description: 'Work, health, or life pressures spilling over' },
  
  // Response patterns
  { id: 'defensive', categoryId: 'responses', label: 'Getting defensive', description: 'Immediately defending yourself instead of listening' },
  { id: 'avoidance', categoryId: 'responses', label: 'Avoiding the topic', description: 'Changing the subject or leaving the room' },
  { id: 'criticism', categoryId: 'responses', label: 'Criticizing character', description: 'Attacking who they are, not what they did' },
  { id: 'contempt', categoryId: 'responses', label: 'Eye-rolling & dismissal', description: 'Showing disrespect or superiority' },
  { id: 'escalation', categoryId: 'responses', label: 'Quick escalation', description: 'Small issues become big fights fast' },
  
  // Unmet needs
  { id: 'appreciation', categoryId: 'unmet-needs', label: 'Feeling unappreciated', description: 'Efforts go unnoticed or unacknowledged' },
  { id: 'heard', categoryId: 'unmet-needs', label: 'Not feeling heard', description: 'Opinions or feelings being dismissed' },
  { id: 'support', categoryId: 'unmet-needs', label: 'Lack of support', description: 'Not having your back when it matters' },
  { id: 'intimacy', categoryId: 'unmet-needs', label: 'Intimacy disconnect', description: 'Physical or emotional closeness issues' },
  { id: 'respect', categoryId: 'unmet-needs', label: 'Feeling disrespected', description: 'Being talked down to or dismissed' }
];

export const getPatternsByCategory = (categoryId: string): ConflictPattern[] => {
  return conflictPatterns.filter(p => p.categoryId === categoryId);
};

export interface PatternInsight {
  patternIds: string[];
  insight: string;
  suggestion: string;
}

export const patternInsights: PatternInsight[] = [
  {
    patternIds: ['stonewalling', 'avoidance'],
    insight: 'You both tend to withdraw when things get heated.',
    suggestion: 'Try agreeing on a "pause phrase" that means "I need 20 minutes to calm down, then we\'ll continue."'
  },
  {
    patternIds: ['blame-game', 'defensive'],
    insight: 'There\'s a cycle of blaming and defending happening.',
    suggestion: 'Try starting sentences with "I feel..." instead of "You always..." to break the pattern.'
  },
  {
    patternIds: ['heard', 'interrupting'],
    insight: 'Feeling unheard is connected to how you listen to each other.',
    suggestion: 'Practice the "listener-speaker" technique: one person talks for 2 minutes uninterrupted, then switch.'
  },
  {
    patternIds: ['appreciation', 'chores'],
    insight: 'Chore conflicts often stem from feeling unappreciated.',
    suggestion: 'Try expressing gratitude for 3 specific things your partner does each week.'
  },
  {
    patternIds: ['escalation', 'stress'],
    insight: 'External stress is making small issues blow up.',
    suggestion: 'Consider a daily "stress check-in" where you share what\'s weighing on you before it spills into conflict.'
  }
];

export const getInsightsForPatterns = (selectedPatterns: string[]): PatternInsight[] => {
  return patternInsights.filter(insight => 
    insight.patternIds.some(id => selectedPatterns.includes(id))
  );
};