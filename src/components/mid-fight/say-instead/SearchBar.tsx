
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-midnight-indigo/50" />
      <Input
        type="text"
        placeholder="Search phrases or topics (e.g., 'listen', 'dismissive'...)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-white border-lavender-blue/30 focus:border-lavender-blue"
      />
    </div>
  );
};

export default SearchBar;
