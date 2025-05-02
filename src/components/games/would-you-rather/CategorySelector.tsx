
import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategorySelectorProps {
  currentCategory: 'normal' | 'spicy';
  onSelectCategory: (category: 'normal' | 'spicy') => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  currentCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <Button
        variant={currentCategory === 'normal' ? 'default' : 'outline'}
        className={currentCategory === 'normal' 
          ? 'bg-midnight-indigo hover:bg-midnight-indigo/90 text-white' 
          : 'border-midnight-indigo/60 text-midnight-indigo hover:bg-midnight-indigo/10'
        }
        onClick={() => onSelectCategory('normal')}
      >
        <Star className="mr-2 h-4 w-4" />
        Normal
      </Button>
      
      <Button
        variant={currentCategory === 'spicy' ? 'default' : 'outline'}
        className={currentCategory === 'spicy' 
          ? 'bg-mauve-rose hover:bg-mauve-rose/90 text-white' 
          : 'border-mauve-rose/60 text-mauve-rose hover:bg-mauve-rose/10'
        }
        onClick={() => onSelectCategory('spicy')}
      >
        <Heart className="mr-2 h-4 w-4" />
        Spicy
      </Button>
    </div>
  );
};

export default CategorySelector;
