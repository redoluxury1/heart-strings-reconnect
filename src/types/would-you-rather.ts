
export interface GameAnswer {
  cardId: string;
  selectedOption: 'optionA' | 'optionB';
  answeredAt: string;
}

export interface PartnerAnswers {
  userId: string;
  name: string;
  answers: GameAnswer[];
}

export interface ComparisonResult {
  cardId: string;
  myChoice: 'optionA' | 'optionB';
  partnerChoice?: 'optionA' | 'optionB';
  match: boolean;
  answeredAt: string;
}

export interface GameState {
  currentCategory: 'normal' | 'spicy';
  currentCardIndex: number;
  myAnswers: GameAnswer[];
  partnerAnswers: GameAnswer[];
  partnerName: string;
  showResults: boolean;
}
