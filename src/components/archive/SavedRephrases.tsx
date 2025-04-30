
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SavedRephrase } from '@/types/archive';
import { format } from 'date-fns';
import { Search, SlidersHorizontal, Star, StarOff } from 'lucide-react';

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

  const toggleFavorite = (id: string) => {
    setRephrases(rephrases.map(rephrase => 
      rephrase.id === id 
        ? { ...rephrase, isFavorite: !rephrase.isFavorite } 
        : rephrase
    ));
  };

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
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rephrases..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={showFavoritesOnly ? "bg-mauve-rose/10 text-mauve-rose border-mauve-rose/50" : ""}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            {showFavoritesOnly ? <Star className="h-4 w-4 mr-1" /> : <StarOff className="h-4 w-4 mr-1" />}
            {showFavoritesOnly ? "Favorites" : "All Items"}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
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
        </div>
      </div>
      
      {filteredRephrases.length > 0 ? (
        <div className="space-y-4">
          {filteredRephrases.map((rephrase) => (
            <Card key={rephrase.id} className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-midnight-indigo">"{rephrase.originalPhrase}"</CardTitle>
                    <CardDescription className="text-xs">
                      Saved {format(new Date(rephrase.dateSaved), 'PPP')}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-1 h-auto ${rephrase.isFavorite ? 'text-mauve-rose' : 'text-gray-400'}`}
                    onClick={() => toggleFavorite(rephrase.id)}
                  >
                    <Star className="h-5 w-5 fill-current" />
                    <span className="sr-only">
                      {rephrase.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lavender-blue font-medium">"{rephrase.rephraseText}"</p>
              </CardContent>
              <CardFooter className="pt-0 justify-between">
                {rephrase.category && (
                  <Badge variant="outline" className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20">
                    {rephrase.category}
                  </Badge>
                )}
              </CardFooter>
            </Card>
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
