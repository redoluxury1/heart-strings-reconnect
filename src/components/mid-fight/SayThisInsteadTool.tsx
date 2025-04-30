
import React, { useState, useMemo } from 'react';
import { sayInsteadPhrases } from '@/data/say-instead-phrases';
import { SayInsteadPhrase } from '@/types/say-instead';
import { MessageCircle } from 'lucide-react';
import PhraseCard from './say-instead/PhraseCard';
import PhraseDetailView from './say-instead/PhraseDetailView';
import NoResults from './say-instead/NoResults';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const SayThisInsteadTool: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhrase, setSelectedPhrase] = useState<SayInsteadPhrase | null>(null);
  
  // Extract unique categories from all phrases
  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    sayInsteadPhrases.forEach(phrase => {
      phrase.categories.forEach(category => {
        allCategories.add(category);
      });
    });
    return Array.from(allCategories).sort();
  }, []);
  
  // Filter phrases based on selected category
  const filteredPhrases = useMemo(() => {
    if (selectedCategory === 'all') {
      return sayInsteadPhrases;
    }
    return sayInsteadPhrases.filter(phrase => 
      phrase.categories.some(category => 
        category === selectedCategory
      )
    );
  }, [selectedCategory]);

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
      
      {/* Category Filter Dropdown */}
      <div>
        <Select 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-full bg-white border-lavender-blue/30 focus:border-lavender-blue">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
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
