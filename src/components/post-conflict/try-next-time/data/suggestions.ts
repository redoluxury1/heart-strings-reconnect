export interface Suggestion {
  id: string;
  triggers: string[];
  reactions: string[];
  tip: string;
  example: string;
  whyItHelps: string;
}

export const suggestions: Suggestion[] = [
  // Feeling dismissed + defensive reactions
  {
    id: 'pause-dismissed-defensive',
    triggers: ['dismissed'],
    reactions: ['defensive', 'raised-voice'],
    tip: "Pause and name what you need",
    example: "I'm feeling unheard right now. Can we pause and start over?",
    whyItHelps: "Naming your need gives your partner a chance to respond to it, instead of reacting to your reaction."
  },
  {
    id: 'dismissed-shutdown',
    triggers: ['dismissed'],
    reactions: ['shutdown', 'stonewalled'],
    tip: "Say you need space before going quiet",
    example: "I need a few minutes to collect my thoughts. Can we come back to this?",
    whyItHelps: "Explaining why you're withdrawing prevents your partner from feeling abandoned or punished."
  },
  
  // Being criticized
  {
    id: 'criticized-defensive',
    triggers: ['criticized'],
    reactions: ['defensive', 'blamed-back'],
    tip: "Ask for the concern behind the criticism",
    example: "It sounds like something's really bothering you. Can you help me understand what you need?",
    whyItHelps: "Criticism often masks an unmet need. Asking about it shifts from attack/defend to problem-solving."
  },
  {
    id: 'criticized-shutdown',
    triggers: ['criticized'],
    reactions: ['shutdown', 'cried'],
    tip: "Request gentler delivery",
    example: "I want to hear your feedback, but I need it delivered more gently so I can really take it in.",
    whyItHelps: "You're not dismissing their point—you're asking for a form you can receive."
  },
  
  // Tone of voice
  {
    id: 'tone-raised-voice',
    triggers: ['tone'],
    reactions: ['raised-voice', 'defensive'],
    tip: "Take 3 breaths before responding",
    example: "I'm getting activated. Give me 2 minutes and I'll be able to listen better.",
    whyItHelps: "A brief pause prevents escalation and models self-regulation."
  },
  {
    id: 'tone-hurtful',
    triggers: ['tone'],
    reactions: ['hurtful', 'blamed-back'],
    tip: "Name the tone without attacking",
    example: "When you use that tone, I have trouble hearing your words. Can we try again?",
    whyItHelps: "You're addressing the delivery without dismissing the content of what they're saying."
  },
  
  // Being interrupted
  {
    id: 'interrupted-defensive',
    triggers: ['interrupted'],
    reactions: ['defensive', 'raised-voice'],
    tip: "Gently reclaim the floor",
    example: "I wasn't finished—can I complete my thought? Then I want to hear yours.",
    whyItHelps: "You assert your need to be heard while signaling you'll listen in return."
  },
  {
    id: 'interrupted-shutdown',
    triggers: ['interrupted'],
    reactions: ['shutdown', 'walked-away'],
    tip: "Propose a speaking structure",
    example: "I keep losing my train of thought when we talk over each other. Can we take turns?",
    whyItHelps: "Creating a structure reduces the chaos that makes you want to withdraw."
  },
  
  // Feeling blamed
  {
    id: 'blamed-defensive',
    triggers: ['blamed'],
    reactions: ['defensive', 'blamed-back'],
    tip: "Acknowledge their experience first",
    example: "I can see you're upset, and I want to understand. Can you tell me more about what hurt?",
    whyItHelps: "Leading with curiosity instead of counter-attack opens space for resolution."
  },
  {
    id: 'blamed-shutdown',
    triggers: ['blamed'],
    reactions: ['shutdown', 'cried'],
    tip: "Ask for a collaborative frame",
    example: "I'm feeling like this is me vs. you. Can we try to approach this as us vs. the problem?",
    whyItHelps: "Reframing from adversarial to collaborative reduces the emotional weight."
  },
  
  // Feeling overwhelmed
  {
    id: 'overwhelmed-shutdown',
    triggers: ['overwhelmed'],
    reactions: ['shutdown', 'walked-away'],
    tip: "Name your overwhelm honestly",
    example: "I'm feeling flooded right now and can't process. Can we take 20 minutes and come back?",
    whyItHelps: "Research shows flooded brains need 20+ minutes to calm down. Naming it prevents misunderstanding."
  },
  {
    id: 'overwhelmed-cried',
    triggers: ['overwhelmed'],
    reactions: ['cried', 'shutdown'],
    tip: "Ask for one thing at a time",
    example: "There's a lot coming at me. Can we focus on just one thing right now?",
    whyItHelps: "Breaking down complexity makes the conversation manageable and prevents shutdown."
  },
  
  // Feeling controlled
  {
    id: 'controlled-defensive',
    triggers: ['controlled'],
    reactions: ['defensive', 'raised-voice'],
    tip: "Assert your autonomy calmly",
    example: "I need to feel like I have a choice here. Can we find a solution that works for both of us?",
    whyItHelps: "You're standing up for yourself without attacking, which invites collaboration."
  },
  {
    id: 'controlled-walked-away',
    triggers: ['controlled'],
    reactions: ['walked-away', 'stonewalled'],
    tip: "Explain what you need to feel respected",
    example: "When decisions are made without me, I feel disrespected. Can we discuss things before deciding?",
    whyItHelps: "You're teaching your partner what you need instead of just withdrawing."
  },
  
  // Feeling unappreciated
  {
    id: 'unappreciated-hurtful',
    triggers: ['unappreciated'],
    reactions: ['hurtful', 'blamed-back'],
    tip: "Share the need behind your reaction",
    example: "I said that because I'm feeling like my efforts go unnoticed. I need to feel valued.",
    whyItHelps: "Revealing vulnerability often softens the other person and opens real dialogue."
  },
  {
    id: 'unappreciated-shutdown',
    triggers: ['unappreciated'],
    reactions: ['shutdown', 'cried'],
    tip: "Ask for what you need directly",
    example: "I've been feeling invisible lately. I would really appreciate hearing what you value about me.",
    whyItHelps: "Clear requests are easier to respond to than silent resentment."
  },
  
  // General fallbacks for common combos
  {
    id: 'general-escalation',
    triggers: ['dismissed', 'criticized', 'tone', 'blamed'],
    reactions: ['raised-voice', 'hurtful', 'blamed-back'],
    tip: "Call a time-out before things escalate",
    example: "I don't want to say something I'll regret. Let's take a break and come back in 30 minutes.",
    whyItHelps: "Preventing escalation protects the relationship and makes resolution more likely."
  },
  {
    id: 'general-withdrawal',
    triggers: ['dismissed', 'criticized', 'overwhelmed', 'blamed'],
    reactions: ['shutdown', 'walked-away', 'stonewalled'],
    tip: "Stay connected even when stepping back",
    example: "I need space to process, but I'm not leaving this unresolved. Let's talk tonight.",
    whyItHelps: "Assuring your partner you'll return prevents them from chasing or feeling abandoned."
  },
];

export const getSuggestionsForSelection = (
  selectedTriggers: string[],
  selectedReactions: string[]
): Suggestion[] => {
  // Score each suggestion based on how well it matches
  const scored = suggestions.map(s => {
    const triggerMatches = s.triggers.filter(t => selectedTriggers.includes(t)).length;
    const reactionMatches = s.reactions.filter(r => selectedReactions.includes(r)).length;
    const score = triggerMatches + reactionMatches;
    return { suggestion: s, score };
  });
  
  // Filter to only those with at least one match in each category, or high overall match
  const relevant = scored.filter(s => s.score >= 2);
  
  // Sort by score descending
  relevant.sort((a, b) => b.score - a.score);
  
  // Return top 4 suggestions
  return relevant.slice(0, 4).map(s => s.suggestion);
};
