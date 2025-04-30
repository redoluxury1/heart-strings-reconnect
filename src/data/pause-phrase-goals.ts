
// Goal data type
export interface Goal {
  id: string;
  title: string;
  phrases: string[];
}

// All available goals with their phrases
export const goals: Goal[] = [
  {
    id: 'ask-for-space',
    title: 'Ask for space',
    phrases: [
      "I need a moment to collect my thoughts. Can we take 15 minutes and then come back to this?",
      "I'm feeling overwhelmed right now. I'd like some time to process before we continue.",
      "I want to have this conversation, but I need a short break first so I can be more present."
    ]
  },
  {
    id: 'say-what-hurt',
    title: 'Say what hurt me',
    phrases: [
      "It really hurt when I felt dismissed in that moment.",
      "I'm not trying to attack you—I just felt really small when that happened.",
      "That landed hard for me, and I'm still trying to sort through why."
    ]
  },
  {
    id: 'explain-meant',
    title: 'Explain what I meant',
    phrases: [
      "What I was trying to express earlier was... I think I didn't say it clearly.",
      "I can see how that came across differently than I intended. What I meant was...",
      "Let me try again because I don't think I expressed myself well the first time."
    ]
  },
  {
    id: 'apologize',
    title: 'Apologize',
    phrases: [
      "I'm sorry I hurt you. That wasn't my intention, but I see the impact it had.",
      "I apologize for how I responded. You deserved better than that.",
      "I was wrong to say that. I'm truly sorry, and I'd like to make it right."
    ]
  },
  {
    id: 'express-need',
    title: 'Express a need',
    phrases: [
      "Something I really need in our relationship is... Would that be possible?",
      "It would mean a lot to me if we could... How does that sound to you?",
      "I realize I need more... in moments like this. Could we work on that together?"
    ]
  },
  {
    id: 'ask-question',
    title: 'Ask a question calmly',
    phrases: [
      "I'd like to understand your perspective better. Can you help me see what this looks like from your side?",
      "What was going through your mind when that happened?",
      "What would feel supportive to you right now?"
    ]
  },
  {
    id: 'express-feeling',
    title: 'Say how I feel without blame',
    phrases: [
      "I'm feeling anxious about our conversation, but I still want to work through this.",
      "I notice I'm feeling sad, and I'm trying to understand why.",
      "When that happened, I felt confused about where we stand."
    ]
  },
  {
    id: 'share-fear',
    title: 'Share a vulnerability',
    phrases: [
      "I'm afraid that if I'm honest about this, you might pull away from me.",
      "It's hard for me to say this, but I'm worried about where we're heading.",
      "I feel scared to bring this up because I don't want to make things worse between us."
    ]
  },
  {
    id: 'acknowledge-pattern',
    title: 'Address a recurring issue',
    phrases: [
      "I notice we keep having the same argument. Can we try something different this time?",
      "I think we're stuck in a pattern here. I want us to find a new way through this together.",
      "This feels familiar—like we've been here before. What can we do differently right now?"
    ]
  },
  {
    id: 'suggest-solution',
    title: 'Suggest a compromise',
    phrases: [
      "What if we both try to meet in the middle? Maybe I could... and you could...",
      "I have an idea that might work for both of us. Would you be open to hearing it?",
      "I think we both want the same thing deep down. Could we try approaching it this way?"
    ]
  },
  {
    id: 'set-boundary',
    title: 'Set a boundary',
    phrases: [
      "I care about our relationship, but I need to be clear about what works for me.",
      "I'm committed to us, and that means I need to be honest about my limits here.",
      "For me to feel safe in this conversation, I need us to agree that..."
    ]
  },
];
