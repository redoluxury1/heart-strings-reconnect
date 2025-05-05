
import { useState, useMemo } from 'react';
import { getFilteredPhrases, getAllCategories } from '@/data/say-it-better-data';

export const useSearchFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = useMemo(() => getAllCategories(), []);
  
  const filteredPhrases = useMemo(() => 
    getFilteredPhrases(searchTerm, selectedCategory),
    [searchTerm, selectedCategory]
  );
  
  return {
    searchTerm,
    selectedCategory,
    categories,
    filteredPhrases,
    setSearchTerm,
    setSelectedCategory
  };
};
