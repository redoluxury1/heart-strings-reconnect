export interface RepairAttempt {
  id: string;
  category: 'de-escalation' | 'validation' | 'responsibility' | 'affection' | 'humor' | 'break';
  phrase: string;
  situation: string;
  tone: 'gentle' | 'sincere' | 'warm' | 'light';
  researchBacked: boolean;
}

export const repairAttempts: RepairAttempt[] = [
  // De-escalation
  {
    id: 'de1',
    category: 'de-escalation',
    phrase: "Can we start this conversation over?",
    situation: "When things are getting heated",
    tone: 'gentle',
    researchBacked: true
  },
  {
    id: 'de2',
    category: 'de-escalation', 
    phrase: "I can see this is really important to you",
    situation: "When your partner is upset",
    tone: 'gentle',
    researchBacked: true
  },
  {
    id: 'de3',
    category: 'de-escalation',
    phrase: "Let's slow this down a bit",
    situation: "When conversation is moving too fast",
    tone: 'gentle',
    researchBacked: true
  },
  {
    id: 'de4',
    category: 'de-escalation',
    phrase: "I want to understand your perspective better",
    situation: "During disagreements",
    tone: 'sincere',
    researchBacked: true
  },

  // Validation
  {
    id: 'val1',
    category: 'validation',
    phrase: "That makes sense that you'd feel that way",
    situation: "When partner expresses emotions",
    tone: 'sincere',
    researchBacked: true
  },
  {
    id: 'val2',
    category: 'validation',
    phrase: "I can see why this matters so much to you",
    situation: "When partner is passionate about something",
    tone: 'warm',
    researchBacked: true
  },
  {
    id: 'val3',
    category: 'validation',
    phrase: "Your feelings are completely understandable",
    situation: "When partner is hurt or upset",
    tone: 'warm',
    researchBacked: true
  },
  {
    id: 'val4',
    category: 'validation',
    phrase: "I hear how much this means to you",
    situation: "When partner shares something important",
    tone: 'sincere',
    researchBacked: true
  },

  // Taking Responsibility
  {
    id: 'resp1',
    category: 'responsibility',
    phrase: "You're right, I did that",
    situation: "When you made a mistake",
    tone: 'sincere',
    researchBacked: true
  },
  {
    id: 'resp2',
    category: 'responsibility',
    phrase: "I can see my part in this problem",
    situation: "During conflict resolution",
    tone: 'sincere',
    researchBacked: true
  },
  {
    id: 'resp3',
    category: 'responsibility',
    phrase: "I'm sorry, that wasn't fair of me",
    situation: "After saying something hurtful",
    tone: 'sincere',
    researchBacked: true
  },
  {
    id: 'resp4',
    category: 'responsibility',
    phrase: "Let me try that again in a better way",
    situation: "When you communicated poorly",
    tone: 'gentle',
    researchBacked: true
  },

  // Affection & Connection
  {
    id: 'aff1',
    category: 'affection',
    phrase: "I love you and I want to work this out",
    situation: "During difficult conversations",
    tone: 'warm',
    researchBacked: true
  },
  {
    id: 'aff2',
    category: 'affection',
    phrase: "You mean everything to me",
    situation: "When reassurance is needed",
    tone: 'warm',
    researchBacked: true
  },
  {
    id: 'aff3',
    category: 'affection',
    phrase: "We're a team, and teams work through problems",
    situation: "When facing challenges together",
    tone: 'warm',
    researchBacked: true
  },
  {
    id: 'aff4',
    category: 'affection',
    phrase: "I care more about our relationship than being right",
    situation: "During arguments",
    tone: 'sincere',
    researchBacked: true
  },

  // Appropriate Humor (use carefully)
  {
    id: 'hum1',
    category: 'humor',
    phrase: "Can we press the reset button?",
    situation: "When both people are calm enough for light humor",
    tone: 'light',
    researchBacked: true
  },
  {
    id: 'hum2',
    category: 'humor',
    phrase: "I think we're both being a little crazy right now",
    situation: "When tensions are high but manageable",
    tone: 'light',
    researchBacked: true
  },

  // Taking a Break
  {
    id: 'break1',
    category: 'break',
    phrase: "I need a few minutes to calm down so I can hear you better",
    situation: "When emotionally flooded",
    tone: 'gentle',
    researchBacked: true
  },
  {
    id: 'break2',
    category: 'break',
    phrase: "Can we take a 20-minute break and come back to this?",
    situation: "When discussion is unproductive",
    tone: 'gentle',
    researchBacked: true
  },
  {
    id: 'break3',
    category: 'break',
    phrase: "I want to give you my best attention. Let me reset for a moment",
    situation: "When you're distracted or overwhelmed",
    tone: 'sincere',
    researchBacked: true
  }
];

// Positive-to-negative ratio suggestions (5:1 research)
export const positiveInteractions = [
  "Thank you for...",
  "I appreciate when you...",
  "I noticed you...",
  "You're really good at...",
  "I'm grateful for...",
  "I love how you...",
  "You make me feel...",
  "I admire your...",
  "It means a lot when you...",
  "I feel lucky because..."
];

export const repairAttemptsByCategory = {
  'de-escalation': repairAttempts.filter(r => r.category === 'de-escalation'),
  'validation': repairAttempts.filter(r => r.category === 'validation'),
  'responsibility': repairAttempts.filter(r => r.category === 'responsibility'),
  'affection': repairAttempts.filter(r => r.category === 'affection'),
  'humor': repairAttempts.filter(r => r.category === 'humor'),
  'break': repairAttempts.filter(r => r.category === 'break')
};