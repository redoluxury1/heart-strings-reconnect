
import React from 'react';
import { Eye, Heart, Star, Lightbulb, HandHeart } from 'lucide-react';

export interface FeelingUnseenSubcategoryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  prompts: {
    openEnded: string[];
    yesNoSometimes: string[];
  };
}

export const feelingUnseenSubcategories: FeelingUnseenSubcategoryData[] = [
  {
    id: 'lack-of-appreciation',
    name: 'Lack of Appreciation',
    icon: <HandHeart className="h-8 w-8" />,
    color: 'text-[#9b87f5]',
    bgColor: 'bg-[#9b87f5]/10',
    prompts: {
      openEnded: [
        "What's something you wish I noticed more often?",
        "How do you feel when your effort goes unacknowledged?",
        "What kind of appreciation feels most meaningful to you?"
      ],
      yesNoSometimes: [
        "Do you feel like your contributions are seen?",
        "Do I regularly thank or affirm you?"
      ]
    }
  },
  {
    id: 'not-feeling-valued',
    name: 'Not Feeling Valued in the Relationship',
    icon: <Heart className="h-8 w-8" />,
    color: 'text-[#7E69AB]',
    bgColor: 'bg-[#7E69AB]/10',
    prompts: {
      openEnded: [
        "Do you ever feel taken for granted in our relationship?",
        "What makes you feel cherished and respected by me?",
        "How can I show you more consistently that you matter?"
      ],
      yesNoSometimes: [
        "Do you feel emotionally important to me?",
        "Do I give you space to shine and feel significant?"
      ]
    }
  },
  {
    id: 'ignored-during-big-moments',
    name: 'Ignored During Big Moments',
    icon: <Star className="h-8 w-8" />,
    color: 'text-[#6E59A5]',
    bgColor: 'bg-[#6E59A5]/15',
    prompts: {
      openEnded: [
        "Can you name a time when you felt invisible during something important to you?",
        "How do we celebrate or support each other when milestones come up?",
        "What could I do to show up better for you next time?"
      ],
      yesNoSometimes: [
        "Do I show excitement about things that matter to you?",
        "Do you feel like I show up for you in the moments that count?"
      ]
    }
  },
  {
    id: 'lack-of-presence',
    name: 'Lack of Eye Contact or Presence',
    icon: <Eye className="h-8 w-8" />,
    color: 'text-[#D6BCFA]',
    bgColor: 'bg-[#D6BCFA]/20',
    prompts: {
      openEnded: [
        "What helps you feel like I'm really present with you?",
        "Do you notice a difference in how we connect now vs. before?",
        "How can we bring more intentional presence into everyday moments?"
      ],
      yesNoSometimes: [
        "Do I give you my full attention when we're together?",
        "Do you feel like I'm often distracted when we talk?"
      ]
    }
  },
  {
    id: 'emotional-anchor',
    name: 'Being the Emotional Anchor',
    icon: <Lightbulb className="h-8 w-8" />,
    color: 'text-[#9b87f5]',
    bgColor: 'bg-[#9b87f5]/15',
    prompts: {
      openEnded: [
        "Do you feel like you're always the strong one in our relationship?",
        "How does it affect you when you're always holding emotional weight?",
        "What would support look like if we shared that load?"
      ],
      yesNoSometimes: [
        "Do I check in on your emotional world—not just rely on you?",
        "Do you feel like I allow you to fall apart too sometimes?"
      ]
    }
  }
];
