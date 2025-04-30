
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from 'lucide-react';

interface JournalSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
}

const JournalSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  showFavoritesOnly, 
  setShowFavoritesOnly 
}: JournalSearchProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search journal entries..."
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
          <Star className="h-4 w-4 mr-1" />
          {showFavoritesOnly ? "Favorites" : "All Entries"}
        </Button>
      </div>
    </div>
  );
};

export default JournalSearch;
