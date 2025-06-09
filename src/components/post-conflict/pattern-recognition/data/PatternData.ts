
import { PatternChip, Pattern, PatternId } from '../types/PatternTypes';

export const triggerChips: PatternChip[] = [
  {
    id: 'talk_shutdown',
    text: 'One of us wants to talk, the other shuts down',
    patternTags: ['pursue_withdraw']
  },
  {
    id: 'ignored_dismissed',
    text: 'Someone feels ignored or dismissed',
    patternTags: ['emotional_shutdown']
  },
  {
    id: 'small_blows_up',
    text: 'It starts with something small but blows up fast',
    patternTags: ['escalation_loop']
  },
  {
    id: 'reconnect_missed',
    text: "Someone's trying to reconnect, but it gets missed",
    patternTags: ['unmet_repair']
  },
  {
    id: 'exhausted_nobody_steps',
    text: "We're both exhausted and nobody steps in",
    patternTags: ['effort_imbalance']
  }
];

export const reactionChips: PatternChip[] = [
  {
    id: 'press_answers',
    text: 'I press for answers or resolution',
    patternTags: ['pursue_withdraw']
  },
  {
    id: 'shut_down_silent',
    text: 'I shut down and go silent',
    patternTags: ['emotional_shutdown']
  },
  {
    id: 'bring_up_other_hurts',
    text: 'I bring up other things that have hurt me',
    patternTags: ['escalation_loop']
  },
  {
    id: 'smooth_over_quickly',
    text: 'I try to smooth things over too quickly',
    patternTags: ['unmet_repair']
  },
  {
    id: 'keep_doing_everything',
    text: 'I keep doing everything even though I\'m resentful',
    patternTags: ['effort_imbalance']
  },
  {
    id: 'double_down_right',
    text: 'I double down on being right',
    patternTags: ['criticize_defend']
  },
  {
    id: 'dig_in_control',
    text: 'I dig in or control the direction',
    patternTags: ['power_struggle']
  }
];

export const partnerReactionChips: PatternChip[] = [
  {
    id: 'defensive_fast',
    text: 'They get defensive fast',
    patternTags: ['criticize_defend']
  },
  {
    id: 'walk_away_quiet',
    text: 'They walk away or go quiet',
    patternTags: ['pursue_withdraw', 'emotional_shutdown']
  },
  {
    id: 'say_overreacting',
    text: "They say I'm overreacting",
    patternTags: ['power_struggle']
  },
  {
    id: 'bring_up_past',
    text: 'They bring up my past mistakes',
    patternTags: ['escalation_loop']
  },
  {
    id: 'sorry_no_change',
    text: "They say sorry but things don't change",
    patternTags: ['unmet_repair']
  }
];

export const patterns: Record<PatternId, Pattern> = {
  pursue_withdraw: {
    id: 'pursue_withdraw',
    name: 'Pursue–Withdraw',
    explanation: 'One person seeks connection while the other seeks space, creating a cycle where pursuing leads to more withdrawal.',
    insight: 'This pattern often stems from different nervous system responses to conflict. The pursuer fears abandonment, while the withdrawer fears being overwhelmed. Both responses are protective, but they can amplify each other.'
  },
  criticize_defend: {
    id: 'criticize_defend',
    name: 'Criticize–Defend',
    explanation: 'One person expresses concerns as criticism, triggering defensive responses that block understanding.',
    insight: 'When we feel unheard, we often escalate our tone or language, which triggers our partner\'s defenses. The real message gets lost in the delivery and reaction cycle.'
  },
  escalation_loop: {
    id: 'escalation_loop',
    name: 'Escalation Loop',
    explanation: 'Small disagreements spiral into bigger conflicts as past hurts and grievances get pulled into the present moment.',
    insight: 'Escalation happens when we feel flooded by emotion and our brain reaches for any ammunition it can find. The original issue becomes buried under layers of accumulated frustration.'
  },
  emotional_shutdown: {
    id: 'emotional_shutdown',
    name: 'Emotional Shutdown',
    explanation: 'One or both partners withdraw emotionally, creating distance that feels safe but prevents resolution.',
    insight: 'Shutdown is often a protective response to feeling overwhelmed or criticized. While it may feel safe in the moment, it can leave both partners feeling isolated and disconnected.'
  },
  effort_imbalance: {
    id: 'effort_imbalance',
    name: 'Effort Imbalance',
    explanation: 'One partner carries more emotional or practical load, leading to resentment and exhaustion over time.',
    insight: 'When effort feels unequal, both partners suffer—one from burnout, the other from feeling inadequate or controlled. This imbalance often happens gradually and unconsciously.'
  },
  power_struggle: {
    id: 'power_struggle',
    name: 'Power Tug-of-War',
    explanation: 'Both partners fight for control or to be right, turning collaboration into competition.',
    insight: 'Power struggles often mask deeper fears about not being valued or respected. When we feel our autonomy or perspective is threatened, we can become rigid and defensive.'
  },
  unmet_repair: {
    id: 'unmet_repair',
    name: 'Unmet Repair Attempts',
    explanation: 'Efforts to reconnect or make amends get missed or rejected, leaving both partners feeling hopeless about resolution.',
    insight: 'Sometimes we\'re both trying to repair, but in different languages or timing. When repair attempts go unrecognized, it can feel like the relationship is stuck or that your partner doesn\'t care.'
  }
};
