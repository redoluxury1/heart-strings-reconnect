
import { Flame, HeartCrack, Puzzle } from 'lucide-react';
import React from 'react';
import { CardContent } from './types';

export const getCardData = (): CardContent[] => {
  return [
    {
      title: "Mid-Fight",
      description: "Emotions are high? That's okay. Here's where you can pause, breathe, and calm things down before saying more.",
      icon: React.createElement(Flame, { className: "h-6 w-6" }),
      tools: ["Time Out Timer", "Let's Try That Again", "What's Really Going On?"],
      comingSoonTools: ["Build a Bridge"],
      link: "/during-conflict",
      // Updated to terracotta-to-beige gradient
      gradientClass: "bg-gradient-to-br from-peachy-terracotta to-[#f5f0e6]",
      iconBgClass: "bg-peachy-terracotta/40",
      buttonText: "Let's Slow Down",
      sectionHeader: "Let's Start Here:",
      visualEffect: "terracotta-plum-blend"
    },
    {
      title: "Post-Fight",
      description: "That was a lot. This space helps you process what just happened, understand what you need, and find clarity before reconnecting.",
      icon: React.createElement(HeartCrack, { className: "h-6 w-6" }),
      tools: ["Let's Work This Out", "Okay, but now what?", "Color Healing"],
      comingSoonTools: ["Build a Bridge"],
      link: "/post-conflict",
      // Updated to navy blue to lighter blue/grey gradient
      gradientClass: "bg-gradient-to-br from-[#22254a] to-[#a8b1c1]",
      iconBgClass: "bg-[#22254a]/70",
      buttonText: "Let's Reflect",
      sectionHeader: "How to Move Forward:",
      visualEffect: "starry-navy"
    },
    {
      title: "Reconnecting",
      description: "Not fighting? Beautiful. Come here for small ways to feel closer, learn more about each other, and have fun.",
      icon: React.createElement(Puzzle, { className: "h-6 w-6" }),
      tools: ["Would You Rather: Couples Game", "Spin the Date Night Wheel", "Love Code Quiz", "Personality Blueprint"],
      link: "/reconnect",
      // Updated to mauve to light plum gradient
      gradientClass: "bg-gradient-to-br from-mauve-rose to-[#e8dfea]",
      iconBgClass: "bg-mauve-rose/40",
      buttonText: "Let's Grow Closer",
      sectionHeader: "Grow Stronger:",
      visualEffect: "playful-dots"
    },
  ];
};

export default getCardData;
