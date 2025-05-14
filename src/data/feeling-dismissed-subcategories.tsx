
import React from 'react';
import { 
  MessageCircleOff,
  AlertCircle,
  VolumeX,
  Brain,
  MicOff
} from 'lucide-react';
import type { SubcategoryData } from './parenting-subcategories';

// Define subcategories for Feeling Dismissed category
export const feelingDismissedSubcategories: SubcategoryData[] = [
  {
    id: 'brushed-off-in-conversation',
    name: 'Brushed Off in Conversation',
    icon: <MessageCircleOff className="h-8 w-8" />,
    color: 'text-mauve-rose',
    bgColor: 'bg-mauve-rose/10',
    prompts: [
      {
        text: 'When I interrupt or dismiss something you said, how does it land?',
        type: 'open-ended'
      },
      {
        text: 'Can you share a moment where you didn\'t feel taken seriously?',
        type: 'open-ended'
      },
      {
        text: 'What would help you feel fully heard during our talks?',
        type: 'open-ended'
      },
      {
        text: 'Do you feel like your thoughts are respected when we disagree?',
        type: 'yes-no'
      },
      {
        text: 'Do I tend to shut things down too quickly?',
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'dismissed-during-conflict',
    name: 'Dismissed During Conflict',
    icon: <AlertCircle className="h-8 w-8" />,
    color: 'text-peachy-terracotta',
    bgColor: 'bg-peachy-terracotta/10',
    prompts: [
      {
        text: 'When you\'re upset, what kind of response helps—and what shuts you down?',
        type: 'open-ended'
      },
      {
        text: 'Do you feel like your tone or reaction gets more attention than the issue?',
        type: 'open-ended'
      },
      {
        text: 'What does it feel like when you don\'t feel taken seriously in a fight?',
        type: 'open-ended'
      },
      {
        text: 'Do you feel heard even when things are heated?',
        type: 'yes-no'
      },
      {
        text: 'Do I ever minimize what you\'re saying during conflict?',
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'tone-overreaction',
    name: 'Tone Overreaction',
    icon: <VolumeX className="h-8 w-8" />,
    color: 'text-midnight-indigo',
    bgColor: 'bg-midnight-indigo/10',
    prompts: [
      {
        text: 'Do you feel like the way you say something matters more than what you say?',
        type: 'open-ended'
      },
      {
        text: 'Has tone policing ever made you feel silenced?',
        type: 'open-ended'
      },
      {
        text: 'How can we talk about tone without shutting each other down?',
        type: 'open-ended'
      },
      {
        text: 'Do I focus too much on how things are said rather than what\'s being said?',
        type: 'yes-no'
      },
      {
        text: 'Do you feel free to express emotion without walking on eggshells?',
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'logical-vs-emotional',
    name: 'Logical vs. Emotional Disconnect',
    icon: <Brain className="h-8 w-8" />,
    color: 'text-mauve-rose',
    bgColor: 'bg-mauve-rose/10',
    prompts: [
      {
        text: 'Do you feel like I try to fix instead of feel with you?',
        type: 'open-ended'
      },
      {
        text: 'How can we better meet each other in the emotional space—without one of us feeling "too much"?',
        type: 'open-ended'
      },
      {
        text: 'What\'s a recent moment where you just needed empathy, not a solution?',
        type: 'open-ended'
      },
      {
        text: 'Do you feel emotionally validated by me in hard moments?',
        type: 'yes-no'
      },
      {
        text: 'Do I try to "solve" things when you just want understanding?',
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'ignored-or-talked-over',
    name: 'Ignored or Talked Over',
    icon: <MicOff className="h-8 w-8" />,
    color: 'text-peachy-terracotta',
    bgColor: 'bg-peachy-terracotta/10',
    prompts: [
      {
        text: 'What does it feel like when I talk over or cut you off?',
        type: 'open-ended'
      },
      {
        text: 'Do you ever leave conversations feeling invisible?',
        type: 'open-ended'
      },
      {
        text: 'How can we slow down to make space for both voices?',
        type: 'open-ended'
      },
      {
        text: 'Do I make space for you to finish your thoughts?',
        type: 'yes-no'
      },
      {
        text: 'Do you feel like I listen to listen—not just to respond?',
        type: 'yes-no'
      }
    ]
  }
];

export default feelingDismissedSubcategories;
