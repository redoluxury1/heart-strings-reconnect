import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, MapPin, Mountain, Heart, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/types/date-wheel';

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const categories = [
    { id: 'all', label: 'All Ideas', icon: null },
    { id: 'home', label: 'Cozy at Home', icon: <Home className="h-4 w-4" /> },
    { id: 'out', label: 'Out & About', icon: <MapPin className="h-4 w-4" /> },
    { id: 'adventure', label: 'Adventurous', icon: <Mountain className="h-4 w-4" /> },
    { id: 'flirty', label: 'Flirty', icon: <Heart className="h-4 w-4" /> },
    { id: 'low-effort', label: 'Low Effort', icon: <Sun className="h-4 w-4" /> },
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          className={cn(
            selectedCategory === category.id
              ? "bg-midnight-indigo text-white"
              : "text-midnight-indigo hover:bg-midnight-indigo/10",
            "rounded-full"
          )}
          onClick={() => onCategoryChange(category.id as Category)}
        >
          {category.icon && <span className="mr-1.5">{category.icon}</span>}
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
