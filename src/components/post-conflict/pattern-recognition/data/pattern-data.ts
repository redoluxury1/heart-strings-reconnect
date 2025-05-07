
import { CommonPattern, PatternQuizzes } from '../types';

// Define common patterns
export const commonPatterns: CommonPattern[] = [
  {
    id: 1,
    name: "Blame / Defend / Withdraw",
    description: "You feel blamed, so you shut down. They get louder. Repeat.",
    examples: ["You always...", "That's not fair!", "Silence or stonewalling"],
    breakingTips: [
      "Soften the Start – "I'm feeling…" vs. "You always…"",
      "Breathe Before You Defend",
      "Repair Before You Retreat"
    ],
    patternType: "criticism-defensiveness"
  },
  {
    id: 2,
    name: "Pursue / Distance",
    description: "One of you chases connection. The other pulls away.",
    examples: ["Talk to me!", "Avoiding eye contact", "Feeling abandoned or smothered"],
    breakingTips: [
      "Take the Pressure Off – Use warmth, not urgency",
      "Signal Safety – Say "I'm overwhelmed," not "I'm done"",
      "Reconnect Without Solving – Be near, not fix"
    ],
    patternType: "pursue-distance"
  },
  {
    id: 3,
    name: "Silent Tension > Snap > Shame",
    description: "It builds up… until it bursts.",
    examples: ["Passive tension", "Bottled-up frustration", "Big reaction, followed by regret"],
    breakingTips: [
      "Check in Sooner – Don't wait until you're boiling",
      "Name the Build-Up – "Something's been bothering me…"",
      "Repair the Aftershock – Apologize for tone, not the truth"
    ],
    patternType: "silent-tension-snap"
  },
  {
    id: 4,
    name: "Criticize / Control",
    description: "Everything feels like a correction.",
    examples: ["Why did you do it like that?", "Hyper-focusing on mistakes", "Partner pulls away or rebels"],
    breakingTips: [
      "Shift from Fixing to Understanding",
      "Ask, Don't Instruct",
      "Celebrate Progress, Not Perfection"
    ],
    patternType: "criticize-control"
  },
  {
    id: 5,
    name: "Fix It / Reject It",
    description: "One wants to solve. The other isn't ready.",
    examples: ["Let's just fix this.", "I can't talk about this right now.", "One over-explains, one shuts down"],
    breakingTips: [
      "Honor the Pause – Don't force closure",
      "Ask, "Is now okay?" before solving",
      "Come Back Later with Softness"
    ],
    patternType: "fix-reject"
  }
];

// Define quiz questions for each pattern
export const patternQuizzes: PatternQuizzes = {
  "criticism-defensiveness": [
    {
      id: 1,
      question: "During disagreements, does one of you often point out what the other is doing wrong?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "How often do you feel the need to explain yourself or defend your actions?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "Do conversations about problems often turn into accusations?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ],
  "pursue-distance": [
    {
      id: 1,
      question: "During conflicts, does one of you try to talk more while the other withdraws?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "How often do you feel that one person wants more discussion while the other wants space?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "Do you feel caught in a cycle where the more one person pursues, the more the other distances?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ],
  "silent-tension-snap": [
    {
      id: 1,
      question: "Do you hold in your frustrations until they eventually explode?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "After an outburst, do you feel shame or regret about how you expressed yourself?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "Does tension build silently before conflicts actually surface?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ],
  "criticize-control": [
    {
      id: 1,
      question: "Does one of you tend to micromanage or correct the other's actions?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "Do small suggestions often feel like harsh criticism?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "Does one partner feel they can never meet the other's standards?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ],
  "fix-reject": [
    {
      id: 1,
      question: "When problems arise, does one of you immediately try to solve it while the other isn't ready?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "Do you have different timelines for wanting to resolve conflicts?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "Does one partner provide solutions while the other just wants empathy?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ]
};
