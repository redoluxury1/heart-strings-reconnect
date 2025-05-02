
/**
 * Reconnection tips data for the "Okay, but now what?" feature
 * These tips provide practical actions users can take to reconnect after a conflict
 */

export interface ReconnectionTip {
  id: number;
  text: string;
  category: 'physical' | 'emotional' | 'activity' | 'communication';
}

export const reconnectionTips: ReconnectionTip[] = [
  {
    id: 1,
    text: "Take a 10-minute walk together without discussing the argument.",
    category: 'physical'
  },
  {
    id: 2,
    text: "Send a message expressing appreciation for something they did today.",
    category: 'communication'
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
    category: 'emotional'
  },
  {
    id: 6,
    text: "Watch a show or movie you both enjoy together.",
    category: 'activity'
  },
  {
    id: 7,
    text: "Give a 20-second hug - it releases oxytocin and helps rebuild connection.",
    category: 'physical'
  },
  {
    id: 8,
    text: "Write down one thing you're committed to working on after this disagreement.",
    category: 'communication'
  },
  {
    id: 9,
    text: "Play a quick game together - even a simple card game can shift the energy.",
    category: 'activity'
  },
  {
    id: 10,
    text: "Ask an open question about something they're interested in, unrelated to the disagreement.",
    category: 'communication'
  }
];
