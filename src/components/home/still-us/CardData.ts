
import { Flame, HeartCrack, Puzzle } from 'lucide-react';
import React from 'react';
import { CardContent } from './types';

export const getCardData = (): CardContent[] => {
  return [
    {
      title: "Mid-Fight",
      description: "Emotions are high? That's okay. Here's where you can pause, breathe, and calm things down before saying more.",
      icon: React.createElement(Flame, { className: "h-7 w-7 text-[#b25a44]" }),
      tools: ["Time Out Timer", "Let's Try That Again", "What's Really Going On?"],
      comingSoonTools: ["Build a Bridge"],
      link: "/during-conflict",
      gradientClass: "bg-[#FDFBF9]",
      iconBgClass: "",
      buttonText: "Let's Slow Down",
      sectionHeader: "Let's Start Here:",
      visualEffect: null,
      borderColor: "border-[#b25a44]",
      headerColor: "text-[#b25a44]"
    },
    {
      title: "Post-Fight",
      description: "That was a lot. This space helps you process what just happened, understand what you need, and find clarity before reconnecting.",
      icon: React.createElement(HeartCrack, { className: "h-7 w-7 text-[#2f3975]" }),
      tools: ["Let's Work This Out", "Okay, but now what?", "How to Move Forward", "Glossary"],
      comingSoonTools: ["Build a Bridge"],
      link: "/post-conflict",
      gradientClass: "bg-[#FDFBF9]",
      iconBgClass: "",
      buttonText: "Let's Reflect",
      sectionHeader: "How to Move Forward:",
      visualEffect: null,
      borderColor: "border-[#2f3975]",
      headerColor: "text-[#2f3975]"
    },
    {
      title: "Reconnecting",
      description: "Not fighting? Beautiful. Come here for small ways to feel closer, learn more about each other, and have fun.",
      icon: React.createElement(Puzzle, { className: "h-7 w-7 text-mauve-rose" }),
      tools: ["Would You Rather: Couples Game", "Spin the Date Night Wheel", "Love Code Quiz", "Personality Blueprint"],
      link: "/reconnect",
      gradientClass: "bg-[#FDFBF9]",
      iconBgClass: "",
      buttonText: "Let's Grow Closer",
      sectionHeader: "Grow Stronger:",
      visualEffect: null,
      borderColor: "border-mauve-rose",
      headerColor: "text-mauve-rose"
    },
  ];
};

export default getCardData;
