
export interface GameCard {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  category: 'normal' | 'spicy';
}

// Normal category cards
export const normalCards: GameCard[] = [
  {
    id: 'n1',
    question: 'Would you rather...',
    optionA: 'Relive our wedding day',
    optionB: 'Relive the day our first baby was born',
    category: 'normal'
  },
  {
    id: 'n2',
    question: 'Would you rather...',
    optionA: 'Go on a spontaneous road trip together',
    optionB: 'Have a cozy weekend staycation at home',
    category: 'normal'
  },
  {
    id: 'n3',
    question: 'Would you rather...',
    optionA: 'Have weekly date nights for the rest of our lives',
    optionB: 'Take one month-long vacation together each year',
    category: 'normal'
  },
  {
    id: 'n4',
    question: 'Would you rather...',
    optionA: 'Know all of your partner\'s thoughts for a day',
    optionB: 'Have your partner know all of your thoughts for a day',
    category: 'normal'
  },
  {
    id: 'n5',
    question: 'Would you rather...',
    optionA: 'Never argue again but have less passion',
    optionB: 'Keep the passionate arguments that lead to growth',
    category: 'normal'
  },
  {
    id: 'n6',
    question: 'Would you rather...',
    optionA: 'Go back to the beginning of our relationship with the knowledge you have now',
    optionB: 'Keep all memories and experiences exactly as they happened',
    category: 'normal'
  },
  {
    id: 'n7',
    question: 'Would you rather...',
    optionA: 'Have your partner plan every vacation',
    optionB: 'Be in charge of planning every vacation',
    category: 'normal'
  },
  {
    id: 'n8',
    question: 'Would you rather...',
    optionA: 'Have a weekly technology-free day together',
    optionB: 'Have one hour of quality time together every day',
    category: 'normal'
  },
  {
    id: 'n9',
    question: 'Would you rather...',
    optionA: 'Your partner surprise you with gifts regularly',
    optionB: 'Your partner write you heartfelt notes regularly',
    category: 'normal'
  },
  {
    id: 'n10',
    question: 'Would you rather...',
    optionA: 'Live in your dream home in a location you don\'t love',
    optionB: 'Live in an average home in your ideal location',
    category: 'normal'
  },
];

// Spicy category cards
export const spicyCards: GameCard[] = [
  {
    id: 's1',
    question: 'Would you rather your partner...',
    optionA: 'Send you a flirty voice memo',
    optionB: 'Send you a spicy selfie',
    category: 'spicy'
  },
  {
    id: 's2',
    question: 'Would you rather...',
    optionA: 'Have an intimate date night at home',
    optionB: 'Have a spontaneous encounter somewhere unexpected',
    category: 'spicy'
  },
  {
    id: 's3',
    question: 'Would you rather...',
    optionA: 'Try a new intimate experience together',
    optionB: 'Perfect an old favorite experience together',
    category: 'spicy'
  },
  {
    id: 's4',
    question: 'Would you rather...',
    optionA: 'Be in control of a romantic evening',
    optionB: 'Let your partner take complete control',
    category: 'spicy'
  },
  {
    id: 's5',
    question: 'Would you rather...',
    optionA: 'Have an intimate encounter in the morning',
    optionB: 'Have an intimate encounter at night',
    category: 'spicy'
  },
  {
    id: 's6',
    question: 'Would you rather...',
    optionA: 'Try role-playing together',
    optionB: 'Try a new intimate location together',
    category: 'spicy'
  },
  {
    id: 's7',
    question: 'Would you rather...',
    optionA: 'Have a passionate quickie',
    optionB: 'Have a long, slow romantic evening',
    category: 'spicy'
  },
  {
    id: 's8',
    question: 'Would you rather your partner...',
    optionA: 'Whisper what they want to do later',
    optionB: 'Leave you a suggestive note to find',
    category: 'spicy'
  },
  {
    id: 's9',
    question: 'Would you rather...',
    optionA: 'Try a new spicy game together',
    optionB: 'Try a new toy together',
    category: 'spicy'
  },
  {
    id: 's10',
    question: 'Would you rather...',
    optionA: 'Have a romantic bath or shower together',
    optionB: 'Give each other massages that lead to more',
    category: 'spicy'
  },
];

export const getAllCards = (): GameCard[] => {
  return [...normalCards, ...spicyCards];
};

export const getCardById = (id: string): GameCard | undefined => {
  return getAllCards().find(card => card.id === id);
};

export const getCardsByCategory = (category: 'normal' | 'spicy'): GameCard[] => {
  return getAllCards().filter(card => card.category === category);
};
