
import { SayItBetterPhrase, sayItBetterPhrases } from './phrases';

// Return a filtered list of phrases by search term and/or category
export const getFilteredPhrases = (
  searchTerm: string = "", 
  category: string = ""
): SayItBetterPhrase[] => {
  let filtered = sayItBetterPhrases;
  
  // Filter by search term if provided
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(phrase => 
      phrase.original.toLowerCase().includes(term) || 
      phrase.emotionalSubtext.toLowerCase().includes(term) || 
      phrase.trySayingInstead.toLowerCase().includes(term)
    );
  }
  
  // Filter by category if provided
  if (category && category !== "all") {
    filtered = filtered.filter(phrase => 
      phrase.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
    );
  }
  
  return filtered;
};

// Get a list of all unique categories
export const getAllCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  
  sayItBetterPhrases.forEach(phrase => {
    phrase.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
};

// Get a phrase by ID
export const getPhraseById = (id: string): SayItBetterPhrase | undefined => {
  return sayItBetterPhrases.find(phrase => phrase.id === id);
};

// Get all phrases
export const getAllPhrases = (): SayItBetterPhrase[] => {
  return sayItBetterPhrases;
};
