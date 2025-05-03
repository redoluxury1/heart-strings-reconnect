// Keep imports the same 

// Export the Behavior interface so components can use it
export interface Behavior {
  id: string;
  gender: 'female' | 'male';
  phrase: string;
  response: string;
  explanation: {
    title: string;
    description: string;
  };
}

const femaleBehaviorsData: Behavior[] = [
  {
    id: 'female-1',
    gender: 'female',
    phrase: "You never listen to me!",
    response: "I'm sorry you feel that way. Can you tell me more about what I'm missing?",
    explanation: {
      title: "Feeling Unheard",
      description: "She feels like her thoughts and feelings are not being valued or understood in the relationship."
    }
  },
  {
    id: 'female-2',
    gender: 'female',
    phrase: "Why are you always on your phone?",
    response: "I didn't realize it bothered you. I can put it away when we're together.",
    explanation: {
      title: "Seeking Connection",
      description: "She craves undivided attention and feels neglected when technology interferes with your time together."
    }
  },
  {
    id: 'female-3',
    gender: 'female',
    phrase: "I do everything around here!",
    response: "I appreciate everything you do. How can we better divide the responsibilities?",
    explanation: {
      title: "Feeling Overwhelmed",
      description: "She feels overburdened with household tasks and seeks a more equitable distribution of labor."
    }
  },
  {
    id: 'female-4',
    gender: 'female',
    phrase: "You don't appreciate me.",
    response: "I'm sorry, I don't mean to make you feel that way. What can I do to show you my appreciation?",
    explanation: {
      title: "Longing for Validation",
      description: "She needs to feel valued and recognized for her contributions and efforts in the relationship."
    }
  },
  {
    id: 'female-5',
    gender: 'female',
    phrase: "You never want to talk.",
    response: "I know I can be closed off. Let's set aside time each day to connect and share our thoughts.",
    explanation: {
      title: "Yearning for Intimacy",
      description: "She desires deeper emotional connection and feels disconnected due to lack of communication."
    }
  },
  {
    id: 'female-6',
    gender: 'female',
    phrase: "You're always late!",
    response: "I understand my lateness is disrespectful. I'll make a conscious effort to be on time from now on.",
    explanation: {
      title: "Seeking Respect",
      description: "She feels that her time is not being valued when you're consistently late."
    }
  },
  {
    id: 'female-7',
    gender: 'female',
    phrase: "You're so insensitive!",
    response: "I'm sorry, I didn't realize I was being insensitive. Can you help me understand what I did?",
    explanation: {
      title: "Needing Empathy",
      description: "She needs you to be more understanding and considerate of her feelings."
    }
  },
  {
    id: 'female-8',
    gender: 'female',
    phrase: "You never take my side!",
    response: "I want to support you. Can you tell me how I can better show that I'm on your side?",
    explanation: {
      title: "Desiring Support",
      description: "She wants to feel like you're her ally and advocate, especially in difficult situations."
    }
  },
  {
    id: 'female-9',
    gender: 'female',
    phrase: "You're always criticizing me!",
    response: "I don't mean to make you feel inadequate. I'll focus on expressing my needs without criticizing you.",
    explanation: {
      title: "Feeling Judged",
      description: "She feels constantly evaluated and judged, which undermines her self-esteem."
    }
  },
  {
    id: 'female-10',
    gender: 'female',
    phrase: "You don't understand me!",
    response: "I want to understand you better. Can you help me see things from your perspective?",
    explanation: {
      title: "Yearning for Understanding",
      description: "She feels misunderstood and wants you to make an effort to see the world through her eyes."
    }
  },
  {
    id: 'female-11',
    gender: 'female',
    phrase: "Ok... *eye roll*",
    response: "I sense you're upset but holding back. Can we talk about what's really bothering you?",
    explanation: {
      title: "Passive Disappointment",
      description: "She's frustrated but avoiding direct confrontation. The eye roll signals unresolved feelings and disagreement."
    }
  }
];

const maleBehaviorsData: Behavior[] = [
  {
    id: 'male-1',
    gender: 'male',
    phrase: "Just calm down!",
    response: "I can see that you're upset. What can I do to help?",
    explanation: {
      title: "Feeling Overwhelmed",
      description: "He feels helpless and unsure how to handle intense emotions."
    }
  },
  {
    id: 'male-2',
    gender: 'male',
    phrase: "Why are you so emotional?",
    response: "I'm sorry, I didn't mean to invalidate your feelings. Can you tell me more about what you're feeling?",
    explanation: {
      title: "Difficulty Processing Emotions",
      description: "He struggles to understand and respond to strong emotional displays."
    }
  },
  {
    id: 'male-3',
    gender: 'male',
    phrase: "Leave me alone!",
    response: "I respect your need for space. I'll check in later to see if you're up for talking.",
    explanation: {
      title: "Needing Space",
      description: "He needs time alone to process his thoughts and feelings."
    }
  },
  {
    id: 'male-4',
    gender: 'male',
    phrase: "I don't want to talk about it.",
    response: "I understand. I'm here when you're ready to share.",
    explanation: {
      title: "Avoiding Vulnerability",
      description: "He finds it difficult to open up and share his feelings."
    }
  },
  {
    id: 'male-5',
    gender: 'male',
    phrase: "You're overreacting!",
    response: "I'm sorry, I didn't mean to dismiss your feelings. Can you help me understand why you're so upset?",
    explanation: {
      title: "Struggling with Empathy",
      description: "He has difficulty understanding and validating your emotional response."
    }
  },
  {
    id: 'male-6',
    gender: 'male',
    phrase: "What's your problem?",
    response: "I'm sorry, I didn't mean to sound accusatory. What's going on?",
    explanation: {
      title: "Feeling Defensive",
      description: "He feels attacked and responds defensively to protect himself."
    }
  },
  {
    id: 'male-7',
    gender: 'male',
    phrase: "I don't care.",
    response: "I'm sorry, I didn't mean to sound apathetic. What's important to you right now?",
    explanation: {
      title: "Difficulty Expressing Care",
      description: "He struggles to show his concern and support in a way that resonates with you."
    }
  },
  {
    id: 'male-8',
    gender: 'male',
    phrase: "You're always nagging me!",
    response: "I'm sorry, I didn't realize I was nagging. What can I do to better meet your needs?",
    explanation: {
      title: "Feeling Controlled",
      description: "He feels like you're constantly trying to control or change him."
    }
  },
  {
    id: 'male-9',
    gender: 'male',
    phrase: "I'm fine.",
    response: "I'm here if you want to talk about it.",
    explanation: {
      title: "Hiding Emotions",
      description: "He tends to suppress his feelings and put on a brave face."
    }
  },
  {
    id: 'male-10',
    gender: 'male',
    phrase: "It's not a big deal.",
    response: "I'm sorry, I didn't mean to minimize your feelings. Can you help me understand why it's important to you?",
    explanation: {
      title: "Dismissing Concerns",
      description: "He tends to downplay the significance of your concerns."
    }
  }
];

export const getFemaleBehaviors = (): Behavior[] => {
  return femaleBehaviorsData;
};

export const getMaleBehaviors = (): Behavior[] => {
  return maleBehaviorsData;
};
