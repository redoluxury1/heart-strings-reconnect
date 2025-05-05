
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
