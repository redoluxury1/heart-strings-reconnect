export interface CommunicationPitfall {
  id: 'criticism' | 'contempt' | 'defensiveness' | 'stonewalling';
  name: string;
  description: string;
  examples: string[];
  antidote: string;
  repairPhrases: string[];
  warningSigns: string[];
}

export const communicationPitfalls: CommunicationPitfall[] = [
  {
    id: 'criticism',
    name: 'Criticism',
    description: 'Attacking your partner\'s character or personality rather than addressing a specific behavior.',
    examples: [
      "You never listen to me",
      "You always forget everything", 
      "You're so selfish",
      "What's wrong with you?",
      "You don't care about anyone but yourself"
    ],
    antidote: 'Use "I" statements and focus on specific behaviors, not character attacks.',
    repairPhrases: [
      "I feel unheard when...",
      "I need help with...",
      "It would mean a lot if you could...",
      "I'm feeling frustrated about this specific situation..."
    ],
    warningSigns: [
      'Using "you always" or "you never"',
      'Making character judgments',
      'Bringing up past grievances',
      'Generalizing about personality flaws'
    ]
  },
  {
    id: 'contempt',
    name: 'Contempt',
    description: 'Speaking from a position of moral superiority through sarcasm, cynicism, or mockery.',
    examples: [
      "Oh, great idea genius",
      "You're pathetic",
      "That's rich coming from you",
      "How convenient for you",
      "*eye rolling* Sure, whatever you say"
    ],
    antidote: 'Build a culture of appreciation and respect. Remember your partner\'s positive qualities.',
    repairPhrases: [
      "I respect your perspective, and here's mine...",
      "I appreciate that you...",
      "Help me understand your point of view",
      "I value our relationship too much to speak this way"
    ],
    warningSigns: [
      'Eye rolling or mocking facial expressions',
      'Sarcastic tone',
      'Name-calling',
      'Superiority complex language'
    ]
  },
  {
    id: 'defensiveness',
    name: 'Defensiveness',
    description: 'Playing the victim or counter-attacking instead of taking responsibility.',
    examples: [
      "That's not what I meant",
      "You're the one who...",
      "I was just trying to help",
      "It's not my fault that...",
      "You're being too sensitive"
    ],
    antidote: 'Take responsibility for your part, even if small. Ask clarifying questions.',
    repairPhrases: [
      "You're right, I did...",
      "I can see how that hurt you",
      "What part of this is my responsibility?",
      "Help me understand what you need"
    ],
    warningSigns: [
      'Immediately explaining away behavior',
      'Counter-attacking when criticized',
      'Playing victim',
      'Deflecting responsibility'
    ]
  },
  {
    id: 'stonewalling',
    name: 'Stonewalling',
    description: 'Shutting down and withdrawing from the conversation emotionally and physically.',
    examples: [
      "Complete silence during conflict",
      "Leaving the room without explanation",
      "Minimal responses: 'Fine', 'Whatever'",
      "Appearing to ignore your partner",
      "Busy work to avoid conversation"
    ],
    antidote: 'Self-soothe and take breaks when overwhelmed, but communicate your needs.',
    repairPhrases: [
      "I need a 20-minute break to calm down",
      "I'm feeling overwhelmed and need space to think",
      "I want to talk about this, but I need time first",
      "Can we revisit this in [specific time]?"
    ],
    warningSigns: [
      'Feeling emotionally flooded',
      'Heart rate above 100 bpm',
      'Unable to think clearly',
      'Urge to escape the situation'
    ]
  }
];

// Detection patterns for text analysis
export const pitfallPatterns = {
  criticism: [
    /you always/gi,
    /you never/gi,
    /what's wrong with you/gi,
    /you don't care/gi,
    /you're so/gi
  ],
  contempt: [
    /pathetic/gi,
    /ridiculous/gi,
    /whatever/gi,
    /sure/gi, // context-dependent
    /great job/gi // sarcastic context
  ],
  defensiveness: [
    /that's not what i meant/gi,
    /you're the one/gi,
    /it's not my fault/gi,
    /i was just/gi,
    /you're being too sensitive/gi
  ],
  stonewalling: [
    /fine/gi,
    /whatever/gi,
    /i don't want to talk/gi,
    /leave me alone/gi
  ]
};