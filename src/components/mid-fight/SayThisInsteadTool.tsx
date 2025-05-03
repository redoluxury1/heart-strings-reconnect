
import React, { useState, useMemo } from 'react';
import { sayInsteadPhrases } from '@/data/love-code-quiz';
import { SayInsteadPhrase } from '@/types/love-code-quiz';
import { MessageCircle, Search } from 'lucide-react';
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
import { Input } from "@/components/ui/input";

// Ensure we're displaying at least 3 options per category
const validateCategories = (phrases: SayInsteadPhrase[]) => {
  const categoryCounts: Record<string, number> = {};
  
  // Count phrases per category
  phrases.forEach(phrase => {
    phrase.categories.forEach(category => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
  });
  
  // Filter out categories with less than 3 phrases
  return Object.keys(categoryCounts).filter(category => categoryCounts[category] >= 3);
};

// Sample phrases for quick selection
const commonPhrases = [
  "You never listen",
  "Always about you", 
  "You're being dramatic",
  "Trying to control me"
];

const SayThisInsteadTool: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhrase, setSelectedPhrase] = useState<SayInsteadPhrase | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Extract valid categories from all phrases (ensuring at least 3 per category)
  const categories = useMemo(() => {
    return validateCategories(sayInsteadPhrases).sort();
  }, []);
  
  // Filter phrases based on selected category and search query
  const filteredPhrases = useMemo(() => {
    let phrases = sayInsteadPhrases;
    
    // Filter by category if not "all"
    if (selectedCategory !== 'all') {
      phrases = phrases.filter(phrase => 
        phrase.categories.some(category => 
          category === selectedCategory
        )
      );
    }
    
    // Filter by search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      phrases = phrases.filter(phrase => 
        phrase.original.toLowerCase().includes(query) ||
        phrase.alternatives.some(alt => alt.toLowerCase().includes(query)) ||
        phrase.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }
    
    return phrases;
  }, [selectedCategory, searchQuery]);

  // Handle quick phrase selection
  const handleQuickPhraseSelect = (phrase: string) => {
    setSearchQuery(phrase);
  };

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
      
      {/* Quick select common phrases */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {commonPhrases.map((phrase, index) => (
          <button
            key={index}
            className="text-xs px-3 py-1 rounded-full bg-lavender-blue/10 text-midnight-indigo border border-lavender-blue/20 hover:bg-lavender-blue/20"
            onClick={() => handleQuickPhraseSelect(phrase)}
          >
            "{phrase}"
          </button>
        ))}
      </div>
      
      {/* Search input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Type a phrase or feeling..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white border-lavender-blue/30 focus:border-lavender-blue"
        />
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
