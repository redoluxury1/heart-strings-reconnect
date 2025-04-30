
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Star, StarOff, FilterX, Copy } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SavedRephrase } from '@/types/archive';
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

// Sample data - in a real app, this would come from storage/database
const sampleRephrases: SavedRephrase[] = [
  {
    id: '1',
    originalPhrase: "You never listen to me.",
    rephraseText: "It feels like I'm not being heard. Can we try again?",
    dateSaved: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    category: "Communication",
    isFavorite: true
  },
  {
    id: '2',
    originalPhrase: "You always make everything about you.",
    rephraseText: "Sometimes I feel like my side of things gets lost in the conversation.",
    dateSaved: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    category: "Self-centeredness",
    isFavorite: false
  },
  {
    id: '3',
    originalPhrase: "You're being dramatic.",
    rephraseText: "I'm having a hard time understanding where you're coming from—can we slow it down?",
    dateSaved: new Date(Date.now() - 86400000 * 8).toISOString(), // 8 days ago
    category: "Emotional Invalidation",
    isFavorite: false
  }
];

const categoriesList = ["Communication", "Self-centeredness", "Emotional Invalidation", "Resentment", "Frustration"];

const SavedRephrases = () => {
  const [rephrases, setRephrases] = useState<SavedRephrase[]>(sampleRephrases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { toast } = useToast();

  const toggleFavorite = (id: string) => {
    setRephrases(rephrases.map(rephrase => 
      rephrase.id === id 
        ? { ...rephrase, isFavorite: !rephrase.isFavorite } 
        : rephrase
    ));
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Phrase copied to clipboard",
        duration: 2000,
      });
    });
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
      <div className="mb-6 flex gap-4 items-center justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rephrases..."
            className="pl-10 pr-4 py-2 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-full px-5 border-slate-200"
              >
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuCheckboxItem
                checked={showFavoritesOnly}
                onCheckedChange={setShowFavoritesOnly}
              >
                Favorites Only
              </DropdownMenuCheckboxItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {categoriesList.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category)
                      );
                    }
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="rounded-full"
            >
              <FilterX className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {filteredRephrases.length > 0 ? (
        <div className="space-y-5">
          {filteredRephrases.map((rephrase) => (
            <div 
              key={rephrase.id} 
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 animate-fade-in relative"
            >
              <div className="flex justify-between items-start">
                <div className="mb-3">
                  <p className="text-xs text-slate-500">
                    Saved {format(new Date(rephrase.dateSaved), 'MMMM d, yyyy')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-1 h-auto ${rephrase.isFavorite ? 'text-mauve-rose' : 'text-gray-400'}`}
                  onClick={() => toggleFavorite(rephrase.id)}
                >
                  {rephrase.isFavorite ? (
                    <Star className="h-5 w-5 fill-mauve-rose" />
                  ) : (
                    <StarOff className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {rephrase.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  </span>
                </Button>
              </div>

              <div className="mb-4">
                <p className="text-xl md:text-2xl text-midnight-indigo font-cormorant mb-3">
                  "{rephrase.rephraseText}"
                </p>
                <p className="text-sm text-slate-600 italic">
                  Original: {rephrase.originalPhrase}
                </p>
              </div>

              <div className="flex justify-between items-center">
                {rephrase.category && (
                  <Badge className="bg-soft-blush/30 text-midnight-indigo hover:bg-soft-blush/40 border-none">
                    {rephrase.category}
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-midnight-indigo"
                  onClick={() => handleCopyToClipboard(rephrase.rephraseText)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-midnight-indigo text-lg mb-2">
            No saved rephrases found
          </p>
          <p className="text-midnight-indigo/60">
            Use "Say This Instead" or "Pause Phrase" tools to save rephrases for future reference.
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedRephrases;
