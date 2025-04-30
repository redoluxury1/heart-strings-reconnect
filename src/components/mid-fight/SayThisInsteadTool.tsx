
import React, { useState } from 'react';
import { sayInsteadPhrases } from '@/data/say-instead-phrases';
import { SayInsteadPhrase } from '@/types/say-instead';
import { MessageCircle } from 'lucide-react';
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
        phrase.alternatives.some(alt => alt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        phrase.categories.some(category => 
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-5">
        <MessageCircle className="h-16 md:h-20 w-16 md:w-20 text-mauve-rose mb-3" />
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-2 text-center">
          Say This Instead
        </h3>
        <p className="text-midnight-indigo/80 mb-4 text-center max-w-2xl">
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
