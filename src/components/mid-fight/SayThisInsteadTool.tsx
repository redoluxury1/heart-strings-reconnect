
import React, { useState } from 'react';
import { sayInsteadPhrases } from '@/data/say-instead-phrases';
import { SayInsteadPhrase } from '@/types/say-instead';
import SearchBar from './say-instead/SearchBar';
import PhraseCard from './say-instead/PhraseCard';
import PhraseDetailView from './say-instead/PhraseDetailView';
import NoResults from './say-instead/NoResults';

const SayThisInsteadTool: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState<SayInsteadPhrase | null>(null);
  
  // Filter phrases based on search term
  const filteredPhrases = searchTerm.trim() === '' 
    ? sayInsteadPhrases 
    : sayInsteadPhrases.filter(phrase => 
        phrase.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phrase.categories.some(category => 
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  const handleFavorite = (alternative: string) => {
    // This would be implemented in a future feature
    console.log('Favorite:', alternative);
  };

  const handleCustomize = (alternative: string) => {
    // This would be implemented in a future feature
    console.log('Customize:', alternative);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-2">
          Say This Instead
        </h3>
        <p className="text-midnight-indigo/80 mb-4">
          Turn common conflict phrases into calmer alternatives that keep the conversation productive.
        </p>
      </div>
      
      {/* Search */}
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      {/* Results display */}
      <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
        {selectedPhrase ? (
          <PhraseDetailView 
            phrase={selectedPhrase}
            onBack={() => setSelectedPhrase(null)}
            onFavorite={handleFavorite}
            onCustomize={handleCustomize}
          />
        ) : (
          filteredPhrases.length > 0 ? (
            filteredPhrases.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                onClick={() => setSelectedPhrase(phrase)}
              />
            ))
          ) : (
            <NoResults />
          )
        )}
      </div>
    </div>
  );
};

export default SayThisInsteadTool;
