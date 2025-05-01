import React, { useState } from 'react';
import { SavedRephrase } from '@/types/archive';
import RephraseList from './rephrases/RephraseList';
import { sampleRephrases } from '@/data/rephrase-data';

const SavedRephrases = () => {
  const [rephrases, setRephrases] = useState<SavedRephrase[]>(sampleRephrases);

  // We're removing the favorite feature as requested, but keeping the function
  // to avoid breaking any dependencies, just making it do nothing
  const toggleFavorite = (id: string) => {
    // No longer modifying favorites as requested
    return;
  };

  // Sort rephrases by date (newest first)
  const sortedRephrases = [...rephrases].sort((a, b) => {
    return new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime();
  });

  return (
    <div>      
      <p className="text-center mb-10 max-w-lg mx-auto text-midnight-indigo">
        Your collection of improved communication phrases. 
        Review these alternatives when you need inspiration for better conversations.
      </p>
    
      <RephraseList 
        rephrases={sortedRephrases} 
        toggleFavorite={toggleFavorite} 
      />
    </div>
  );
};

export default SavedRephrases;
