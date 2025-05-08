
import { Flag, Heart, Frown } from 'lucide-react';

export type FlagType = {
  id: string;
  title: string;
  description: string;
  icon: typeof Flag | typeof Heart | typeof Frown;
  messages: string[];
};

export const flagTypes: FlagType[] = [
  {
    id: 'pause',
    title: 'I need a pause',
    description: 'I\'m overwhelmed and need to step back for a bit.',
    icon: Flag,
    messages: [
      'I need a little space to calm down, but I want to come back to this.',
      'I care about you. I just need to gather my thoughts before we talk more.',
      'Let\'s pause. I don\'t want to make things worse.'
    ]
  },
  {
    id: 'reconnect',
    title: 'I want to reconnect',
    description: 'I\'m ready to soften the moment—but I don\'t know what to say.',
    icon: Heart,
    messages: [
      'I miss you. Can we start over?',
      'I want to find our way back to each other. Can we try again?',
      'What happened was hard, but I still want us.'
    ]
  },
  {
    id: 'hurt',
    title: 'I\'m not OK, but I care',
    description: 'I\'m still hurt, but I don\'t want this to grow into distance.',
    icon: Frown,
    messages: [
      'I\'m still processing, but I don\'t want distance between us.',
      'This is hard for me, but I care about us more than being right.',
      'I\'m hurting, but our relationship matters more than this argument.'
    ]
  }
];
