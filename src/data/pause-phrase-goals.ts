
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
      "I want to have this conversation, but I need a short break first so I can be more present.",
      "I care about resolving this, but I need to step away briefly to gather myself.",
      "Could we pause for a bit? I need some space to think clearly about what we're discussing."
    ]
  },
  {
    id: 'say-what-hurt',
    title: 'Say what hurt me',
    phrases: [
      "It really hurt when I felt dismissed in that moment.",
      "I'm not trying to attack you—I just felt really small when that happened.",
      "That landed hard for me, and I'm still trying to sort through why.",
      "When you said that earlier, it struck a nerve I didn't expect.",
      "I felt hurt by what happened, and I want to understand it better together."
    ]
  },
  {
    id: 'explain-meant',
    title: 'Explain what I meant',
    phrases: [
      "What I was trying to express earlier was... I think I didn't say it clearly.",
      "I can see how that came across differently than I intended. What I meant was...",
      "Let me try again because I don't think I expressed myself well the first time.",
      "I'm realizing my words didn't match what I was feeling. Can I try again?",
      "I think we're misunderstanding each other. What I was trying to say was..."
    ]
  },
  {
    id: 'apologize',
    title: 'Apologize',
    phrases: [
      "I'm sorry I hurt you. That wasn't my intention, but I see the impact it had.",
      "I apologize for how I responded. You deserved better than that.",
      "I was wrong to say that. I'm truly sorry, and I'd like to make it right.",
      "I regret how I handled that. I'm sorry, and I want to do better.",
      "I take responsibility for my part in this. I'm genuinely sorry."
    ]
  },
  {
    id: 'express-need',
    title: 'Express a need',
    phrases: [
      "Something I really need in our relationship is... Would that be possible?",
      "It would mean a lot to me if we could... How does that sound to you?",
      "I realize I need more... in moments like this. Could we work on that together?",
      "I've been reflecting on what would help me feel more secure, and I need...",
      "For me to feel understood, I need us to try..."
    ]
  },
  {
    id: 'ask-question',
    title: 'Ask a question calmly',
    phrases: [
      "I'd like to understand your perspective better. Can you help me see what this looks like from your side?",
      "What was going through your mind when that happened?",
      "What would feel supportive to you right now?",
      "I'm curious about how you're experiencing this conversation. Would you share that with me?",
      "Could you help me understand what you need from me in this moment?"
    ]
  },
  {
    id: 'express-feeling',
    title: 'Say how I feel without blame',
    phrases: [
      "I'm feeling anxious about our conversation, but I still want to work through this.",
      "I notice I'm feeling sad, and I'm trying to understand why.",
      "When that happened, I felt confused about where we stand.",
      "I'm carrying some disappointment that I want to talk through without blame.",
      "I feel uncertain right now, and I'm trying to make sense of it."
    ]
  },
  {
    id: 'share-fear',
    title: 'Share a vulnerability',
    phrases: [
      "I'm afraid that if I'm honest about this, you might pull away from me.",
      "It's hard for me to say this, but I'm worried about where we're heading.",
      "I feel scared to bring this up because I don't want to make things worse between us.",
      "This is difficult to share, but I feel insecure about...",
      "I'm taking a risk by telling you this, but I need to be honest about my fears..."
    ]
  },
  {
    id: 'acknowledge-pattern',
    title: 'Address a recurring issue',
    phrases: [
      "I notice we keep having the same argument. Can we try something different this time?",
      "I think we're stuck in a pattern here. I want us to find a new way through this together.",
      "This feels familiar—like we've been here before. What can we do differently right now?",
      "We seem to keep circling back to this issue. What if we tried a new approach?",
      "I recognize this pattern we're in. I think we both want to break it, so maybe we could..."
    ]
  },
  {
    id: 'suggest-solution',
    title: 'Suggest a compromise',
    phrases: [
      "What if we both try to meet in the middle? Maybe I could... and you could...",
      "I have an idea that might work for both of us. Would you be open to hearing it?",
      "I think we both want the same thing deep down. Could we try approaching it this way?",
      "What would you think about this as a possible solution that addresses both our needs?",
      "I'm wondering if there's a middle ground here that we haven't explored yet..."
    ]
  },
  {
    id: 'set-boundary',
    title: 'Set a boundary',
    phrases: [
      "I care about our relationship, but I need to be clear about what works for me.",
      "I'm committed to us, and that means I need to be honest about my limits here.",
      "For me to feel safe in this conversation, I need us to agree that...",
      "I want to keep talking, but I need to establish some boundaries first.",
      "To make this conversation productive, I need to set a boundary around..."
    ]
  },
  {
    id: 'request-appreciation',
    title: 'Ask for appreciation',
    phrases: [
      "I'd really value hearing what you appreciate about me right now.",
      "It would help me feel more connected if we could share some things we value about each other.",
      "I'm feeling a bit unseen. Could you share something you appreciate about our relationship?",
      "It would mean a lot to hear what you still love about us.",
      "In the middle of this tension, could we pause to remember what we cherish about each other?"
    ]
  },
];
