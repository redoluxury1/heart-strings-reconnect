
import React from 'react';
import { MessageSquare, Bell, Volume, Clock, User } from 'lucide-react';

export interface CommunicationSubcategoryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor?: string;
  prompts: {
    openEnded: string[];
    yesNoSometimes: string[];
  };
}

export const communicationSubcategories: CommunicationSubcategoryData[] = [
  {
    id: 'talking-past-each-other',
    name: 'Talking Past Each Other',
    icon: <MessageSquare className="h-4 w-4" />,
    color: 'text-[#9b87f5]',
    bgColor: 'bg-[#9b87f5]/10',
    prompts: {
      openEnded: [
        "Do you feel like we hear the words but miss the meaning?",
        "What's a topic we keep misfiring on?",
        "What helps you feel truly understood?"
      ],
      yesNoSometimes: [
        "Do you feel like I listen with curiosity?",
        "Do you think we slow down enough to avoid spiraling?"
      ]
    }
  },
  {
    id: 'defensiveness',
    name: 'Defensiveness',
    icon: <Bell className="h-4 w-4" />,
    color: 'text-[#D3876A]',
    bgColor: 'bg-[#D3876A]/10',
    prompts: {
      openEnded: [
        "Do I get defensive when you bring up hard things?",
        "What does it feel like when you try to bring up a concern?",
        "How can we both listen without jumping into defense mode?"
      ],
      yesNoSometimes: [
        "Do you feel safe bringing things up with me?",
        "Do I tend to justify instead of reflect?"
      ]
    }
  },
  {
    id: 'avoidance',
    name: 'Avoidance',
    icon: <User className="h-4 w-4" />,
    color: 'text-[#162137]',
    bgColor: 'bg-[#162137]/10',
    prompts: {
      openEnded: [
        "What topics do we avoid, and why?",
        "What would make hard conversations feel safer?",
        "What happens when things go unspoken too long?"
      ],
      yesNoSometimes: [
        "Do we avoid conflict at the cost of connection?",
        "Do you feel like you can be honest with me?"
      ]
    }
  },
  {
    id: 'misinterpretation',
    name: 'Misinterpretation',
    icon: <Volume className="h-4 w-4" />,
    color: 'text-[#5D3A5A]',
    bgColor: 'bg-[#5D3A5A]/10',
    prompts: {
      openEnded: [
        "Do you feel like your tone or intent is often misunderstood?",
        "How can we check in before assuming the worst?",
        "What's one example of a message that got totally misread?"
      ],
      yesNoSometimes: [
        "Do we give each other the benefit of the doubt?",
        "Do you feel like we ask or assume?"
      ]
    }
  },
  {
    id: 'timing-mismatches',
    name: 'Timing Mismatches',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-[#9b87f5]',
    bgColor: 'bg-[#9b87f5]/10',
    prompts: {
      openEnded: [
        "Do you prefer to talk things out right away or after a pause?",
        "Have we ever escalated something just because we weren't ready at the same time?",
        "What timing usually works best for repair?"
      ],
      yesNoSometimes: [
        "Do we mismatch on when we want to talk?",
        "Do you feel rushed or shut down during hard conversations?"
      ]
    }
  }
];
