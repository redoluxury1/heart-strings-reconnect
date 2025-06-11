
import React from 'react';
import { TalkAboutUsCategory } from '@/data/lets-talk-about-us';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CategoryCardProps {
  category: TalkAboutUsCategory;
  onSelect: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const IconComponent = category.icon;
  
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-soft-cream/20 bg-gradient-to-br from-white to-soft-cream/30">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-midnight-indigo/10 rounded-full">
          <IconComponent className="h-8 w-8 text-midnight-indigo" />
        </div>
        
        <h3 className="font-cormorant text-xl font-medium text-midnight-indigo">
          {category.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          {category.questions.length} thoughtful questions
        </p>
        
        <Button 
          onClick={() => onSelect(category.id)}
          className="w-full bg-midnight-indigo hover:bg-midnight-indigo/90 text-soft-cream"
        >
          Explore Questions
        </Button>
      </div>
    </Card>
  );
};

export default CategoryCard;
