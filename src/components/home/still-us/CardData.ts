
import { Flame, HeartCrack, Puzzle } from 'lucide-react';
import React from 'react';
import { CardContent } from './types';

export const getCardData = (): CardContent[] => {
  return [
    {
      title: "Mid-Fight",
      description: "Emotions are high? That's okay. Here's where you can pause, breathe, and calm things down before saying more.",
      icon: React.createElement(Flame, { className: "h-6 w-6" }),
      tools: ["Time Out Timer", "Pause + Phrase", "What's Really Going On?"],
      comingSoonTools: ["Build a Bridge"],
      link: "/during-conflict",
      gradientClass: "from-mauve-rose/30 to-mauve-rose/10",
      iconBgClass: "bg-mauve-rose/30",
      buttonText: "Let's Slow Down",
      sectionHeader: "Let's Start Here:",
    },
    {
      title: "Post-Fight",
      description: "That was a lot. This space helps you process what just happened, understand what you need, and find clarity before reconnecting.",
      icon: React.createElement(HeartCrack, { className: "h-6 w-6" }),
      tools: ["Let's Work This Out", "Okay, but now what?", "Color Healing"],
      comingSoonTools: ["Build a Bridge"],
      link: "/post-conflict",
      gradientClass: "from-lavender-blue/50 to-lavender-blue/20",
      iconBgClass: "bg-lavender-blue/40",
      buttonText: "Let's Reflect",
      sectionHeader: "How to Move Forward:",
    },
    {
      title: "Reconnecting",
      description: "Not fighting? Beautiful. Come here for small ways to feel closer, learn more about each other, and have fun.",
      icon: React.createElement(Puzzle, { className: "h-6 w-6" }),
      tools: ["Would You Rather: Couples Game", "Spin the Date Night Wheel", "Love Code Quiz", "Personality Blueprint"],
      link: "/reconnect",
      gradientClass: "from-soft-cream/50 to-soft-cream/20",
      iconBgClass: "bg-soft-cream/50",
      buttonText: "Let's Grow Closer",
      sectionHeader: "Grow Stronger:",
    },
  ];
};

export default getCardData;
