
import { CommonPattern, PatternQuizzes } from '../types';

// Define common patterns
export const commonPatterns: CommonPattern[] = [
  {
    id: 1,
    name: "Criticism-Defensiveness Cycle",
    description: "One partner criticizes, the other becomes defensive, leading to escalation.",
    examples: ["You always...", "You never...", "Why can't you just..."],
    breakingTips: [
      "Try using 'I' statements instead of 'you' statements",
      "Take a break when you notice this pattern starting",
      "Ask clarifying questions instead of defending immediately"
    ],
    patternType: "criticism-defensiveness"
  },
  {
    id: 2,
    name: "Stonewalling-Pursuit Cycle",
    description: "One partner withdraws, the other pursues, creating a distance-closeness struggle.",
    examples: ["Silent treatment", "Walking away mid-conversation", "Constant checking in"],
    breakingTips: [
      "Agree on a specific time to return to the conversation",
      "Practice self-soothing during breaks",
      "Use gentle startups when re-engaging"
    ],
    patternType: "stonewalling-pursuit"
  },
  {
    id: 3,
    name: "Contempt-Contempt Cycle",
    description: "Partners exchange hostile humor, sarcasm, name-calling, or disrespectful body language.",
    examples: ["Eye-rolling", "Mockery", "Hostile humor"],
    breakingTips: [
      "Build a culture of appreciation",
      "Express needs directly without contempt",
      "Focus on the underlying feelings beneath contempt"
    ],
    patternType: "contempt-contempt"
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
  "stonewalling-pursuit": [
    {
      id: 1,
      question: "During conflicts, does one of you tend to shut down or go quiet?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "How often does one of you push to resolve things immediately while the other needs space?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "Do you find yourselves in a pattern where one person withdraws and the other keeps pursuing?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ],
  "contempt-contempt": [
    {
      id: 1,
      question: "How often do eye-rolls, sarcasm, or mockery show up in your disagreements?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "Do you sometimes feel like your partner doesn't respect your perspective?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "During arguments, do either of you make comments that feel dismissive or belittling?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ]
};
