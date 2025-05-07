/**
 * Reconnection tips data for the "Okay, but now what?" feature
 * These tips provide practical actions users can take to reconnect after a conflict
 */

import { PatternType } from '@/components/post-conflict/pattern-recognition/types';

export interface ReconnectionTip {
  id: number;
  text: string;
  category: 'physical' | 'emotional' | 'activity' | 'communication';
  patterns?: PatternType[];
}

export const reconnectionTips: ReconnectionTip[] = [
  {
    id: 1,
    text: "Take a 10-minute walk together without discussing the argument.",
    category: 'physical',
    patterns: ['criticism-defensiveness', 'contempt-contempt']
  },
  {
    id: 2,
    text: "Send a message expressing appreciation for something they did today.",
    category: 'communication',
    patterns: ['criticism-defensiveness', 'contempt-contempt']
  },
  {
    id: 3,
    text: "Plan a simple activity you both enjoy to do this week.",
    category: 'activity'
  },
  {
    id: 4,
    text: "Make your partner's favorite drink or snack as a small gesture.",
    category: 'physical'
  },
  {
    id: 5,
    text: "Share a memory of a time when you felt really connected.",
    category: 'emotional',
    patterns: ['stonewalling-pursuit']
  },
  {
    id: 6,
    text: "Watch a show or movie you both enjoy together.",
    category: 'activity'
  },
  {
    id: 7,
    text: "Give a 20-second hug - it releases oxytocin and helps rebuild connection.",
    category: 'physical',
    patterns: ['stonewalling-pursuit']
  },
  {
    id: 8,
    text: "Write down one thing you're committed to working on after this disagreement.",
    category: 'communication',
    patterns: ['criticism-defensiveness']
  },
  {
    id: 9,
    text: "Play a quick game together - even a simple card game can shift the energy.",
    category: 'activity'
  },
  {
    id: 10,
    text: "Ask an open question about something they're interested in, unrelated to the disagreement.",
    category: 'communication',
    patterns: ['stonewalling-pursuit', 'contempt-contempt']
  },
  {
    id: 11,
    text: "Suggest getting takeout from a restaurant you both love.",
    category: 'activity'
  },
  {
    id: 12,
    text: "Listen to a song that holds a special meaning for both of you.",
    category: 'emotional'
  },
  {
    id: 13,
    text: "Create a small gratitude list about your relationship and share it.",
    category: 'emotional',
    patterns: ['criticism-defensiveness', 'contempt-contempt']
  },
  {
    id: 14,
    text: "Take five minutes to just sit together quietly without phones.",
    category: 'physical',
    patterns: ['stonewalling-pursuit']
  },
  {
    id: 15,
    text: "Offer a genuine compliment about something you admire in them.",
    category: 'communication',
    patterns: ['criticism-defensiveness', 'contempt-contempt']
  },
  {
    id: 16,
    text: "Suggest working on a small household task together.",
    category: 'activity',
    patterns: ['stonewalling-pursuit']
  },
  {
    id: 17,
    text: "Take turns naming three things you love about each other.",
    category: 'emotional',
    patterns: ['criticism-defensiveness', 'contempt-contempt']
  },
  {
    id: 18,
    text: "Make a small future plan for something to look forward to together.",
    category: 'communication',
    patterns: ['stonewalling-pursuit']
  },
  {
    id: 19,
    text: "Share a funny meme or video you know they'd appreciate.",
    category: 'emotional'
  },
  {
    id: 20,
    text: "Ask if they need anything right now - a glass of water, some space, or comfort.",
    category: 'physical'
  },
  // Pattern-specific reconnection activities
  {
    id: 21,
    text: "Practice active listening by summarizing what they said before responding.",
    category: 'communication',
    patterns: ['criticism-defensiveness']
  },
  {
    id: 22,
    text: "Write down your thoughts first before speaking to avoid defensive reactions.",
    category: 'communication',
    patterns: ['criticism-defensiveness']
  },
  {
    id: 23,
    text: "Set a timer for 15 minutes where you each speak uninterrupted for 5 minutes, followed by 5 minutes of reflection.",
    category: 'communication',
    patterns: ['criticism-defensiveness', 'stonewalling-pursuit']
  },
  {
    id: 24,
    text: "Create a signal for when either of you feels overwhelmed and needs a break.",
    category: 'communication',
    patterns: ['stonewalling-pursuit', 'pursue-distance']
  },
  {
    id: 25,
    text: "Practice making 'I feel' statements instead of 'You always' statements.",
    category: 'communication',
    patterns: ['criticism-defensiveness']
  },
  {
    id: 26,
    text: "Share one vulnerable feeling about the situation without blame.",
    category: 'emotional',
    patterns: ['contempt-contempt', 'criticism-defensiveness']
  },
  {
    id: 27,
    text: "Take turns completing the sentence: 'I feel cared for when you...'",
    category: 'emotional',
    patterns: ['contempt-contempt']
  },
  {
    id: 28,
    text: "Agree on a time to return to the conversation that works for both of you.",
    category: 'communication',
    patterns: ['stonewalling-pursuit', 'pursue-distance']
  },
  {
    id: 29,
    text: "For pursuers: Practice waiting 24 hours before bringing up a concern again.",
    category: 'communication',
    patterns: ['pursue-distance']
  },
  {
    id: 30,
    text: "For distancers: Set a timer for 10 minutes of active engagement before taking space.",
    category: 'communication',
    patterns: ['pursue-distance']
  },
  {
    id: 31,
    text: "Create a shared signal that means 'I need connection' without words.",
    category: 'communication',
    patterns: ['pursue-distance']
  },
  {
    id: 32,
    text: "Agree on a daily 'connection time' that's scheduled and reliable.",
    category: 'activity',
    patterns: ['pursue-distance']
  }
];
