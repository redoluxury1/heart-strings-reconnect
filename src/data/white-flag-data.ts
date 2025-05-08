
import { Pause, Heart, Frown } from 'lucide-react';

export type FlagType = {
  id: string;
  title: string;
  description: string;
  icon: typeof Pause | typeof Heart | typeof Frown;
  messages: string[];
};

export const flagTypes: FlagType[] = [
  {
    id: 'pause',
    title: 'I need a pause',
    description: 'I\'m overwhelmed and need to step back for a bit.',
    icon: Pause,
    messages: [
      'I need a little space to calm down, but I want to come back to this.',
      'I care about you. I just need to gather my thoughts before we talk more.',
      'Let\'s pause. I don\'t want to make things worse.',
      'I\'m not trying to avoid this, I just need a moment to breathe.',
      'I\'m feeling overwhelmed. I\'m going to step away so I don\'t make this worse.'
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
      'What happened was hard, but I still want us.',
      'I still love you. I\'d like to try again with a calmer approach.',
      'This tension between us sucks. Can we try to come back to each other?'
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
      'I\'m hurting, but our relationship matters more than this argument.',
      'I\'m not fully ready to talk about what happened but let\'s try to work through it slowly.',
      'I\'m struggling to find the words, but I don\'t want to shut you out.'
    ]
  }
];
