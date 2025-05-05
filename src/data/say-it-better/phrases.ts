
// Define the SayItBetterPhrase type for use throughout the application
export interface SayItBetterPhrase {
  id: string;
  original: string;
  emotionalSubtext: string;
  howItMightLand: string;
  trySayingInstead: string;
  categories: string[];
}

// Import all phrase batches
import { initialPhrases } from './phrase-batches/initial-phrases';
import { additionalPhrases } from './phrase-batches/additional-phrases';
import { latestPhrases } from './phrase-batches/latest-phrases';

// Combine all phrases into one exported array
export const sayItBetterPhrases: SayItBetterPhrase[] = [
  ...initialPhrases,
  ...additionalPhrases,
  ...latestPhrases
];

