
import React from 'react';
import { Users, Shield, Family, Clock, Balance } from 'lucide-react';

export interface InLawsSubcategoryData {
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

export const inLawsSubcategories: InLawsSubcategoryData[] = [
  {
    id: 'squeezed-between-family',
    name: 'Feeling Squeezed Between Family & Partner',
    icon: <Users className="h-8 w-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-600/10',
    prompts: {
      openEnded: [
        'Do you ever feel like you\'re caught in the middle between me and your family?',
        'How do you decide when to speak up or stay neutral?',
        'What support do you wish you\'d get from me in those moments?'
      ],
      yesNoSometimes: [
        'Do you feel like I have your back when there\'s family tension?',
        'Do you feel torn between loyalty to me and to your family?'
      ]
    }
  },
  {
    id: 'conflict-with-one-side',
    name: 'Conflict With One Side',
    icon: <Shield className="h-8 w-8" />,
    color: 'text-[#9b87f5]',
    bgColor: 'bg-[#9b87f5]/10',
    prompts: {
      openEnded: [
        'Is there a recurring issue that keeps showing up with one side of the family?',
        'How do you feel when I talk about my frustrations with them?',
        'What\'s one boundary we could create or strengthen?'
      ],
      yesNoSometimes: [
        'Do we talk openly about the tension or avoid it?',
        'Do I take your concerns about my family seriously?'
      ]
    }
  },
  {
    id: 'grandparent-boundaries',
    name: 'Grandparent Boundaries',
    icon: <Family className="h-8 w-8" />,
    color: 'text-[#7E69AB]',
    bgColor: 'bg-[#7E69AB]/10',
    prompts: {
      openEnded: [
        'Do you feel like your parenting choices are respected by grandparents?',
        'What\'s something a grandparent did that crossed a line?',
        'How can we set a boundary without starting a war?'
      ],
      yesNoSometimes: [
        'Do we present a united front when it comes to parenting boundaries?',
        'Do you feel like I step in when needed?'
      ]
    }
  },
  {
    id: 'unequal-time',
    name: 'Unequal Time or Energy',
    icon: <Clock className="h-8 w-8" />,
    color: 'text-[#6E59A5]',
    bgColor: 'bg-[#6E59A5]/10',
    prompts: {
      openEnded: [
        'Do we spend more time or effort with one side of the family?',
        'How do holidays or visits usually feel to you?',
        'What would a more fair or balanced rhythm look like?'
      ],
      yesNoSometimes: [
        'Do you feel like your side of the family gets equal consideration?',
        'Do we make those decisions together?'
      ]
    }
  },
  {
    id: 'undermining-relationship',
    name: 'In-Laws Undermining the Relationship',
    icon: <Balance className="h-8 w-8" />,
    color: 'text-[#D6BCFA]',
    bgColor: 'bg-[#D6BCFA]/20',
    prompts: {
      openEnded: [
        'Has there been a moment where it felt like your family didn\'t respect our relationship?',
        'How can we hold our boundary as a couple when others don\'t?',
        'What support do you want from me when that happens?'
      ],
      yesNoSometimes: [
        'Do you feel like we protect our relationship from outside opinions?',
        'Do you feel like we\'ve defined where family ends and *we* begin?'
      ]
    }
  }
];
