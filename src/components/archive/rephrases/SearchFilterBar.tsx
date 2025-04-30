
import React from 'react';
import { Search, FilterX } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (value: boolean) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  categoriesList: string[];
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  showFavoritesOnly,
  setShowFavoritesOnly,
  clearFilters,
  hasActiveFilters,
  categoriesList
}) => {
  return (
    <div className="mb-6 flex gap-4 items-center justify-center">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search rephrases..."
          className="pl-10 pr-4 py-2 rounded-full border-slate-200"
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
  );
};

export default SearchFilterBar;
