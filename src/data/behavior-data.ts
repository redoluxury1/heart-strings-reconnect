
// This file is now a barrel file that re-exports all components from the say-it-better directory
// This maintains backward compatibility with existing imports

export type { SayItBetterPhrase } from './say-it-better/phrases';
export { sayItBetterPhrases } from './say-it-better/phrases';
export { 
  getFilteredPhrases, 
  getAllCategories, 
  getPhraseById, 
  getAllPhrases 
} from './say-it-better/utils';

// Behavior decoder data types and functions

export interface Behavior {
  id: string;
  label: string;
  explanation: {
    title: string;
    description: string;
  };
  response: string;
}

const femaleBehaviors: Behavior[] = [
  {
    id: 'female-silent',
    label: "Is giving you the silent treatment",
    explanation: {
      title: "She's feeling unheard or hurt",
      description: "When she goes quiet, it's often because she feels her words haven't made an impact in the past. She may be protecting herself from further disappointment or processing her emotions before speaking."
    },
    response: "I notice you're quiet. I want to understand what you're feeling. When you're ready to talk, I'm here to listen without interrupting."
  },
  {
    id: 'female-upset',
    label: "Says 'I'm fine' when clearly upset",
    explanation: {
      title: "She's testing if you care enough to dig deeper",
      description: "This isn't about being difficult. It's often because she's not sure if expressing her true feelings will make a difference, or she needs time to process what she's feeling before discussing it."
    },
    response: "I can sense something's bothering you. I care about how you feel, and I'm willing to listen whenever you're ready to talk about it."
  },
  {
    id: 'female-remember',
    label: "Expects you to remember everything she said",
    explanation: {
      title: "She associates remembering with caring",
      description: "When she mentions something important to her, it's not just about the information, but also about you acknowledging what matters to her. Remembering shows her that you're emotionally present."
    },
    response: "I'm sorry I didn't remember. That clearly matters to you, and I want to do better at paying attention to the things that are important to you."
  },
  {
    id: 'female-nag',
    label: "Keeps bringing up the same issue repeatedly",
    explanation: {
      title: "She doesn't feel her concern has been properly addressed",
      description: "What seems like nagging is often her attempt to resolve an issue that feels unaddressed. She might be repeating herself because she hasn't seen the change or acknowledgment she's seeking."
    },
    response: "I understand this keeps coming up because it's important to you. Let's talk about what a real solution would look like for both of us."
  },
  {
    id: 'female-hint',
    label: "Drops hints instead of being direct",
    explanation: {
      title: "She's trying to avoid conflict while still expressing needs",
      description: "Hinting might be her way of testing the waters or avoiding seeming demanding. She might have learned that being direct leads to conflict or rejection."
    },
    response: "I think you might be trying to tell me something important. I value your direct communication - you can tell me exactly what you need."
  }
];

const maleBehaviors: Behavior[] = [
  {
    id: 'male-withdraw',
    label: "Withdraws or seems emotionally distant",
    explanation: {
      title: "He's processing his thoughts and feelings",
      description: "Men often need space to process emotions before discussing them. What looks like shutting down is often his way of preventing saying something he might regret in the heat of the moment."
    },
    response: "I notice you might need some space. I'm here when you're ready to talk, without pressure."
  },
  {
    id: 'male-fix',
    label: "Jumps to solutions when you just want to vent",
    explanation: {
      title: "He's showing care through problem-solving",
      description: "For many men, offering solutions is their way of showing they care. It's not that he doesn't value your feelings, but rather that fixing your problem is how he expresses support."
    },
    response: "I appreciate you trying to help. Right now, I just need you to listen and understand how I feel about this situation."
  },
  {
    id: 'male-defensive',
    label: "Gets defensive when you bring up concerns",
    explanation: {
      title: "He's feeling criticized or inadequate",
      description: "Defensiveness often stems from feeling his competence or intentions are being questioned. He may be hearing criticism when you're simply expressing a need or concern."
    },
    response: "I'm not trying to criticize you. This is about how I feel and what I need, not about what you're doing wrong."
  },
  {
    id: 'male-forgets',
    label: "Forgets important dates or conversations",
    explanation: {
      title: "His memory works differently, not selectively",
      description: "Many men tend to compartmentalize information differently. He's not intentionally forgetting things that matter to you, but might not register emotional significance in the same way you do."
    },
    response: "This is important to me, and I'd appreciate if we could find a way to make sure we both remember it. Maybe we could set a reminder?"
  },
  {
    id: 'male-distracted',
    label: "Seems distracted when you're talking",
    explanation: {
      title: "He may be processing differently or struggling to multitask",
      description: "Men often process information more linearly and may struggle to switch contexts quickly. What seems like disinterest could be difficulty shifting focus from what he was doing."
    },
    response: "I'd like to talk about something that's important to me. Can we find a time when we can focus on this conversation without distractions?"
  }
];

// Function to get all female behaviors
export const getFemaleBehaviors = (): Behavior[] => {
  return femaleBehaviors;
};

// Function to get all male behaviors
export const getMaleBehaviors = (): Behavior[] => {
  return maleBehaviors;
};

// Function to get a behavior by id
export const getBehaviorById = (id: string): Behavior | undefined => {
  return [...femaleBehaviors, ...maleBehaviors].find(behavior => behavior.id === id);
};
