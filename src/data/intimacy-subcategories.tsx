
import React from 'react';
import { Heart, ArrowRightLeft, HandHeart, Flame, MessageSquareOff, HeartOff } from 'lucide-react';

export interface IntimacyPrompt {
  text: string;
  type: 'open-ended' | 'yes-no';
}

export interface SubcategoryData {
  id: string;
  name: string;
  icon?: React.ReactNode;
  color: string;
  bgColor: string;
  prompts: IntimacyPrompt[];
}

export const SUBCATEGORY_DATA: SubcategoryData[] = [
  {
    id: 'initiation-imbalance',
    name: 'Initiation Imbalance',
    icon: <ArrowRightLeft className="h-10 w-10" />,
    color: 'text-peachy-terracotta',
    bgColor: 'bg-peachy-terracotta/10',
    prompts: [
      { text: "Do you ever feel like one of us wants it more than the other?", type: 'open-ended' },
      { text: "What makes it easier—or harder—to initiate closeness?", type: 'open-ended' },
      { text: "How can we make desire feel mutual instead of pressured?", type: 'open-ended' },
      { text: "Do you feel like your attempts to connect are received well?", type: 'yes-no' },
      { text: "Do you wish I initiated more often?", type: 'yes-no' }
    ]
  },
  {
    id: 'emotional-disconnect',
    name: 'Emotional Disconnect',
    icon: <MessageSquareOff className="h-10 w-10" />,
    color: 'text-mauve-rose',
    bgColor: 'bg-mauve-rose/10',
    prompts: [
      { text: "When do you feel most emotionally close to me?", type: 'open-ended' },
      { text: "What do you need more of from me to feel connected?", type: 'open-ended' },
      { text: "What usually causes us to drift apart emotionally?", type: 'open-ended' },
      { text: "Do you feel like I know what's going on inside your world?", type: 'yes-no' },
      { text: "Do we take enough time to nurture our connection?", type: 'yes-no' }
    ]
  },
  {
    id: 'affection-outside-of-sex',
    name: 'Physical Affection Outside of Sex',
    icon: <HandHeart className="h-10 w-10" />,
    color: 'text-lavender-blue',
    bgColor: 'bg-lavender-blue/10',
    prompts: [
      { text: "What kind of non-sexual touch helps you feel close to me?", type: 'open-ended' },
      { text: "Do you ever feel like affection is tied to expectations?", type: 'open-ended' },
      { text: "How can we add more small moments of warmth throughout the day?", type: 'open-ended' },
      { text: "Do you feel like we're physically close outside the bedroom?", type: 'yes-no' },
      { text: "Do you think we show each other love in everyday ways?", type: 'yes-no' }
    ]
  },
  {
    id: 'mismatched-desire',
    name: 'Mismatched Desire',
    icon: <Flame className="h-10 w-10" />,
    color: 'text-sage',
    bgColor: 'bg-sage/10',
    prompts: [
      { text: "What's one thing you wish I understood about your desire?", type: 'open-ended' },
      { text: "How do we tend to handle it when we're not on the same page sexually?", type: 'open-ended' },
      { text: "How can we keep physical closeness from turning into resentment?", type: 'open-ended' },
      { text: "Do you feel comfortable saying no without guilt?", type: 'yes-no' },
      { text: "Do you feel like your needs matter even when they're different than mine?", type: 'yes-no' }
    ]
  },
  {
    id: 'feeling-unwanted',
    name: 'Feeling Undesired or Unwanted',
    icon: <HeartOff className="h-10 w-10" />,
    color: 'text-golden-mustard',
    bgColor: 'bg-golden-mustard/10',
    prompts: [
      { text: "When do you feel most wanted or desired by me?", type: 'open-ended' },
      { text: "What makes you feel emotionally or physically rejected?", type: 'open-ended' },
      { text: "How can we create more moments of reassurance?", type: 'open-ended' },
      { text: "Do you feel like I see you as attractive?", type: 'yes-no' },
      { text: "Do you wish I gave more compliments or physical signals of interest?", type: 'yes-no' }
    ]
  }
];
