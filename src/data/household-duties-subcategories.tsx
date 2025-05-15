import React from 'react';
import { Divide, EyeOff, Wrench, Brain, Trash } from 'lucide-react';

export interface HouseholdPrompt {
  text: string;
  type: 'open-ended' | 'yes-no';
}

export interface SubcategoryData {
  id: string;
  name: string;
  icon?: React.ReactNode;
  color: string;
  bgColor: string;
  prompts: HouseholdPrompt[];
}

export const SUBCATEGORY_DATA: SubcategoryData[] = [
  {
    id: 'division-of-labor',
    name: 'Division of Labor',
    icon: <Divide className="h-4 w-4" />,
    color: 'text-[#C7747F]',
    bgColor: 'bg-[#C7747F]/10',
    prompts: [
      { text: "What do you think feels uneven when it comes to the daily workload?", type: 'open-ended' },
      { text: "Is there a task you dread doing that we could reassign or split?", type: 'open-ended' },
      { text: "What does fairness feel like—not perfection, but partnership?", type: 'open-ended' },
      { text: "Do you feel like we each carry our weight at home?", type: 'yes-no' },
      { text: "Do we talk about who's doing what, or just assume?", type: 'yes-no' }
    ]
  },
  {
    id: 'invisible-labor',
    name: 'Invisible Labor',
    icon: <EyeOff className="h-4 w-4" />,
    color: 'text-[#5D3A5A]',
    bgColor: 'bg-[#5D3A5A]/10',
    prompts: [
      { text: "What's something you manage that often goes unnoticed?", type: 'open-ended' },
      { text: "Do you ever feel like you're mentally carrying more than I see?", type: 'open-ended' },
      { text: "What's one thing I could do to lighten your load?", type: 'open-ended' },
      { text: "Do you feel appreciated for the things that don't get seen?", type: 'yes-no' },
      { text: "Do you feel like I check in on how you're doing, not just what you're doing?", type: 'yes-no' }
    ]
  },
  {
    id: 'resentment-about-roles',
    name: 'Resentment About Roles',
    icon: <Wrench className="h-4 w-4" />,
    color: 'text-[#162137]',
    bgColor: 'bg-[#162137]/10',
    prompts: [
      { text: "Do you ever feel stuck in a role that doesn't feel fair or chosen?", type: 'open-ended' },
      { text: "When did resentment first start showing up around chores or routines?", type: 'open-ended' },
      { text: "How can we divide things based on strengths and support—not default?", type: 'open-ended' },
      { text: "Do you feel like our roles at home are flexible when needed?", type: 'yes-no' },
      { text: "Do we both feel allowed to ask for help?", type: 'yes-no' }
    ]
  },
  {
    id: 'mental-load',
    name: 'Mental Load Management',
    icon: <Brain className="h-4 w-4" />,
    color: 'text-[#D3876A]',
    bgColor: 'bg-[#D3876A]/10',
    prompts: [
      { text: "What part of the daily grind stresses you out the most?", type: 'open-ended' },
      { text: "Do you feel like the to-do list lives in your head more than mine?", type: 'open-ended' },
      { text: "How can we externalize or share the mental load?", type: 'open-ended' },
      { text: "Do you feel like we're on the same team when it comes to logistics?", type: 'yes-no' },
      { text: "Do you feel like you get time to reset, not just recharge?", type: 'yes-no' }
    ]
  },
  {
    id: 'cleanliness-clashes',
    name: 'Cleanliness & Clutter Clashes',
    icon: <Trash className="h-4 w-4" />,
    color: 'text-[#C7747F]',
    bgColor: 'bg-[#C7747F]/10',
    prompts: [
      { text: "What does \"clean\" mean to each of us—and how far apart are we?", type: 'open-ended' },
      { text: "When does clutter or mess impact your stress level?", type: 'open-ended' },
      { text: "Can we agree on a few shared expectations or reset rituals?", type: 'open-ended' },
      { text: "Do we clash over how clean the house should be?", type: 'yes-no' },
      { text: "Do I ever dismiss your standards or preferences?", type: 'yes-no' }
    ]
  }
];
