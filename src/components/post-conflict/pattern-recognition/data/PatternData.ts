
import { PatternChip, Pattern } from '../types/PatternTypes';

export const triggerChips: PatternChip[] = [
  {
    id: 'talk_vs_shutdown',
    text: 'One of us wants to talk, the other shuts down',
    patternTags: ['pursue_withdraw', 'emotional_shutdown']
  },
  {
    id: 'ignored_dismissed',
    text: 'Someone feels ignored or dismissed',
    patternTags: ['emotional_shutdown', 'emotional_invalidation']
  },
  {
    id: 'small_blows_up',
    text: 'It starts with something small but blows up fast',
    patternTags: ['escalation_loop', 'criticize_defend']
  },
  {
    id: 'reconnect_missed',
    text: 'Someone\'s trying to reconnect, but it gets missed',
    patternTags: ['unmet_repair', 'pursue_withdraw']
  },
  {
    id: 'exhausted_nobody_steps',
    text: 'We\'re both exhausted and nobody steps in',
    patternTags: ['effort_imbalance', 'emotional_shutdown']
  }
];

export const reactionChips: PatternChip[] = [
  {
    id: 'press_for_answers',
    text: 'I press for answers or resolution',
    patternTags: ['pursue_withdraw', 'power_struggle']
  },
  {
    id: 'shut_down_silent',
    text: 'I shut down and go silent',
    patternTags: ['emotional_shutdown', 'pursue_withdraw']
  },
  {
    id: 'bring_up_other_things',
    text: 'I bring up other things that have hurt me',
    patternTags: ['escalation_loop', 'criticize_defend']
  },
  {
    id: 'smooth_things_over',
    text: 'I try to smooth things over too quickly',
    patternTags: ['unmet_repair', 'effort_imbalance']
  },
  {
    id: 'keep_doing_everything',
    text: 'I keep doing everything even though I\'m resentful',
    patternTags: ['effort_imbalance', 'emotional_shutdown']
  },
  {
    id: 'double_down_right',
    text: 'I double down on being right',
    patternTags: ['criticize_defend', 'power_struggle']
  },
  {
    id: 'dig_in_control',
    text: 'I dig in or control the direction',
    patternTags: ['power_struggle', 'criticize_defend']
  }
];

export const partnerReactionChips: PatternChip[] = [
  {
    id: 'defensive_fast',
    text: 'They get defensive fast',
    patternTags: ['criticize_defend', 'escalation_loop']
  },
  {
    id: 'walk_away_quiet',
    text: 'They walk away or go quiet',
    patternTags: ['pursue_withdraw', 'emotional_shutdown']
  },
  {
    id: 'overreacting',
    text: 'They say I\'m overreacting',
    patternTags: ['power_struggle', 'emotional_invalidation']
  },
  {
    id: 'past_mistakes',
    text: 'They bring up my past mistakes',
    patternTags: ['escalation_loop', 'criticize_defend']
  },
  {
    id: 'sorry_no_change',
    text: 'They say sorry but things don\'t change',
    patternTags: ['unmet_repair', 'effort_imbalance']
  }
];

export const patterns: Record<string, Pattern> = {
  pursue_withdraw: {
    id: 'pursue_withdraw',
    name: 'Pursue–Withdraw',
    explanation: 'One person seeks connection, the other shuts down, creating a chase/retreat spiral.',
    insight: 'The pursuer fears abandonment. The withdrawer fears overwhelm.',
    repairAdvice: 'Instead of chasing or retreating, agree on a pause word before things escalate. When it\'s said, both partners take 10 minutes apart and return to the conversation using slower, gentler tone.'
  },
  criticize_defend: {
    id: 'criticize_defend',
    name: 'Criticize–Defend',
    explanation: 'One partner criticizes, the other defends, creating an endless loop of blame and protection.',
    insight: 'The critic feels unheard. The defender feels attacked.',
    repairAdvice: 'Try starting with "I feel..." instead of "You always..." When criticized, respond with "Help me understand what you need" instead of explaining why you\'re right.'
  },
  escalation_loop: {
    id: 'escalation_loop',
    name: 'Escalation Loop',
    explanation: 'Small disagreements spiral into big fights as both partners bring up past hurts and grievances.',
    insight: 'You\'re fighting about everything except what\'s actually bothering you right now.',
    repairAdvice: 'Set a "stay in the present" rule. If either of you brings up something older than this week, gently redirect with "Let\'s focus on what happened today first."'
  },
  emotional_shutdown: {
    id: 'emotional_shutdown',
    name: 'Emotional Shutdown',
    explanation: 'One or both partners shut down emotionally, creating distance and leaving issues unresolved.',
    insight: 'Shutdown often happens when someone feels emotionally flooded or unsafe.',
    repairAdvice: 'Create a "soft re-entry" signal for when you\'re ready to reconnect. Something like "I\'m coming back now" can help both partners know the wall is coming down.'
  },
  effort_imbalance: {
    id: 'effort_imbalance',
    name: 'Effort Imbalance',
    explanation: 'One partner carries most of the emotional or practical load, leading to resentment and burnout.',
    insight: 'The over-functioner feels alone. The under-functioner feels inadequate.',
    repairAdvice: 'Pick one specific area where the under-functioning partner can step up this week. Start small and celebrate the effort, not just the outcome.'
  },
  power_struggle: {
    id: 'power_struggle',
    name: 'Power Tug-of-War',
    explanation: 'Both partners fight for control, with each trying to be "right" rather than finding understanding.',
    insight: 'You\'re more invested in winning than in connecting.',
    repairAdvice: 'Try this phrase: "I want to understand your perspective, even if I see it differently." Then actually listen to their answer without planning your rebuttal.'
  },
  unmet_repair: {
    id: 'unmet_repair',
    name: 'Unmet Repair Attempts',
    explanation: 'One partner tries to make things better, but their attempts miss the mark or get ignored.',
    insight: 'Good intentions aren\'t always received as care if they don\'t match what your partner actually needs.',
    repairAdvice: 'Ask directly: "What would actually help you feel better right now?" Then do that thing, even if it\'s not what you would want.'
  }
};
