
import React from 'react';
import { Wallet, TrendingDown, DollarSign, HandCoins, PiggyBank } from 'lucide-react';

export interface PromptData {
  text: string;
  type: 'open-ended' | 'yes-no';
}

export interface SubcategoryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  prompts: PromptData[];
}

export const SUBCATEGORY_DATA: SubcategoryData[] = [
  {
    id: 'spending-habits',
    name: 'Spending Habits',
    icon: <Wallet className="h-8 w-8" />,
    color: 'text-sage',
    bgColor: 'bg-sage/10',
    prompts: [
      {
        text: 'What counts as a "big purchase" to each of us?',
        type: 'open-ended'
      },
      {
        text: 'How do you feel when one of us spends without talking about it?',
        type: 'open-ended'
      },
      {
        text: 'What values are driving how we each spend money?',
        type: 'open-ended'
      },
      {
        text: 'Do we trust each other\'s judgment when it comes to spending?',
        type: 'yes-no'
      },
      {
        text: 'Do we both feel free and secure with our personal purchases?',
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'budgeting-avoidance',
    name: 'Budgeting Avoidance',
    icon: <TrendingDown className="h-8 w-8" />,
    color: 'text-lavender-blue',
    bgColor: 'bg-lavender-blue/10',
    prompts: [
      {
        text: 'Why do budget talks stress us out or get put off?',
        type: 'open-ended'
      },
      {
        text: 'What would make talking about money feel less like a fight?',
        type: 'open-ended'
      },
      {
        text: 'How can we set shared financial goals without feeling blamed?',
        type: 'open-ended'
      },
      {
        text: 'Do we have a regular rhythm for talking about money?',
        type: 'yes-no'
      },
      {
        text: 'Do you feel judged when finances come up?',
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'income-imbalance',
    name: 'Income Imbalance',
    icon: <DollarSign className="h-8 w-8" />,
    color: 'text-golden-mustard',
    bgColor: 'bg-golden-mustard/10',
    prompts: [
      {
        text: 'How does the way we earn impact the way we relate to each other?',
        type: 'open-ended'
      },
      {
        text: 'Do you ever feel pressure to contribute more or differently?',
        type: 'open-ended'
      },
      {
        text: 'How can we talk about money without comparing worth?',
        type: 'open-ended'
      },
      {
        text: 'Do you feel like your contribution is equally valued, no matter the amount?',
        type: 'yes-no'
      },
      {
        text: 'Do we both feel empowered to make financial decisions?',
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'financial-stress',
    name: 'Financial Stress & Fear',
    icon: <HandCoins className="h-8 w-8" />,
    color: 'text-mauve-rose',
    bgColor: 'bg-mauve-rose/10',
    prompts: [
      {
        text: 'What\'s your biggest fear when it comes to our financial future?',
        type: 'open-ended'
      },
      {
        text: 'How does money stress show up in your body or in our relationship?',
        type: 'open-ended'
      },
      {
        text: 'What helps you feel safe and supported when things are tight?',
        type: 'open-ended'
      },
      {
        text: 'Do you feel like I understand your financial worries?',
        type: 'yes-no'
      },
      {
        text: 'Do you feel like we\'re tackling financial stress as a team?',
        type: 'yes-no'
      }
    ]
  },
  {
    id: 'secret-spending',
    name: 'Secret Spending or Withheld Info',
    icon: <PiggyBank className="h-8 w-8" />,
    color: 'text-sage',
    bgColor: 'bg-sage/10',
    prompts: [
      {
        text: 'Do we both feel safe sharing every financial decision?',
        type: 'open-ended'
      },
      {
        text: 'What might make someone want to hide or avoid money talk?',
        type: 'open-ended'
      },
      {
        text: 'How can we rebuild financial trust if it\'s been broken?',
        type: 'open-ended'
      },
      {
        text: 'Do you feel like we\'re fully honest with each other about money?',
        type: 'yes-no'
      },
      {
        text: 'Do we both know where our money is going each month?',
        type: 'yes-no'
      }
    ]
  }
];
