
import React, { useState } from 'react';
import { SavedRephrase } from '@/types/archive';
import SearchFilterBar from './rephrases/SearchFilterBar';
import RephraseList from './rephrases/RephraseList';
import { sampleRephrases, categoriesList } from '@/data/rephrase-data';

const SavedRephrases = () => {
  const [rephrases, setRephrases] = useState<SavedRephrase[]>(sampleRephrases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleFavorite = (id: string) => {
    setRephrases(rephrases.map(rephrase => 
      rephrase.id === id 
        ? { ...rephrase, isFavorite: !rephrase.isFavorite } 
        : rephrase
    ));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setShowFavoritesOnly(false);
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0 || showFavoritesOnly;

  const filteredRephrases = rephrases
    .filter(rephrase => {
      // Apply search filter
      if (searchTerm && !rephrase.originalPhrase.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !rephrase.rephraseText.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply category filter
      if (selectedCategories.length > 0 && rephrase.category && 
          !selectedCategories.includes(rephrase.category)) {
        return false;
      }
      
      // Apply favorites filter
      if (showFavoritesOnly && !rephrase.isFavorite) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime();
    });

  return (
    <div>
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        categoriesList={categoriesList}
      />
      
      <RephraseList 
        rephrases={filteredRephrases} 
        toggleFavorite={toggleFavorite} 
      />
    </div>
  );
};

export default SavedRephrases;
