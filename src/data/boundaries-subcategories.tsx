
import React from 'react';
import { Clock, Heart, Users, Lock, Hand } from 'lucide-react';

export interface Prompt {
  text: string;
  type: 'open-ended' | 'yes-no';
}

export interface SubcategoryData {
  id: string;
  name: string;
  icon?: React.ReactNode;
  color?: string;
  bgColor?: string;
  prompts: Prompt[];
}

const boundariesSubcategories: SubcategoryData[] = [
  {
    id: 'time-boundaries',
    name: 'Time Boundaries',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-sage',
    bgColor: 'bg-sage/10',
    prompts: [
      {
        text: "Do you ever feel like we don't protect time for ourselves or each other?",
        type: 'open-ended'
      },
      {
        text: "What does \"too busy\" look like in our relationship?",
        type: 'open-ended'
      },
      {
        text: "How can we create more intentional time instead of just reactive time?",
        type: 'open-ended'
      },
      {
        text: "Do you feel like we prioritize our time together?",
        type: 'yes-no'
      },
      {
        text: "Do you wish we had clearer boundaries around work or phone use?",
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'emotional-boundaries',
    name: 'Emotional Boundaries',
    icon: <Heart className="h-4 w-4" />,
    color: 'text-mauve-rose',
    bgColor: 'bg-mauve-rose/10',
    prompts: [
      {
        text: "Are there moments where we blur the line between emotional sharing and emotional dumping?",
        type: 'open-ended'
      },
      {
        text: "How can we each express what we feel without feeling attacked?",
        type: 'open-ended'
      },
      {
        text: "What's one thing you wish I protected better—your space or mine?",
        type: 'open-ended'
      },
      {
        text: "Do you feel like your emotions are treated as valid—even when different from mine?",
        type: 'yes-no'
      },
      {
        text: "Do we each take responsibility for our own emotional states?",
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'family-boundaries',
    name: 'Family Boundaries',
    icon: <Users className="h-4 w-4" />,
    color: 'text-lavender-blue',
    bgColor: 'bg-lavender-blue/10',
    prompts: [
      {
        text: "Do you feel like our relationship has a \"line\" when it comes to outside family?",
        type: 'open-ended'
      },
      {
        text: "Has there been a time when you wish I had spoken up or protected us more?",
        type: 'open-ended'
      },
      {
        text: "How do we draw the line between respect and interference?",
        type: 'open-ended'
      },
      {
        text: "Do you feel like we present a united front when family opinions get involved?",
        type: 'yes-no'
      },
      {
        text: "Do I back you up when your boundaries are crossed?",
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'privacy-and-space',
    name: 'Privacy & Personal Space',
    icon: <Lock className="h-4 w-4" />,
    color: 'text-golden-mustard',
    bgColor: 'bg-golden-mustard/10',
    prompts: [
      {
        text: "What does privacy mean to you inside a relationship?",
        type: 'open-ended'
      },
      {
        text: "How can we balance closeness with breathing room?",
        type: 'open-ended'
      },
      {
        text: "What are signs that one of us is craving more space?",
        type: 'open-ended'
      },
      {
        text: "Do you feel like I respect your personal time or routines?",
        type: 'yes-no'
      },
      {
        text: "Do we both feel safe setting boundaries around space or tech?",
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'saying-no',
    name: 'Saying No Without Guilt',
    icon: <Hand className="h-4 w-4" />,
    color: 'text-peachy-terracotta',
    bgColor: 'bg-peachy-terracotta/10',
    prompts: [
      {
        text: "Do you ever say yes just to avoid conflict—even when you don't want to?",
        type: 'open-ended'
      },
      {
        text: "How can we make it easier to say no without taking it personally?",
        type: 'open-ended'
      },
      {
        text: "What helps you feel safe setting boundaries with me?",
        type: 'open-ended'
      },
      {
        text: "Do you feel like it's okay to disappoint each other sometimes?",
        type: 'yes-no'
      },
      {
        text: "Do I respond well when you set limits?",
        type: 'yes-no'
      }
    ]
  }
];

export default boundariesSubcategories;
