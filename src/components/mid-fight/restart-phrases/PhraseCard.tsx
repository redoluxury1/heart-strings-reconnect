
import React from 'react';
import { Card } from '@/components/ui/card';
import { RestartPhrase } from '@/data/restart-phrases-data';

interface PhraseCardProps {
  phrase: RestartPhrase;
  isSelected: boolean;
  onClick: () => void;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, isSelected, onClick }) => {
  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case 'calm':
        return 'border-sage/20 hover:bg-sage/5';
      case 'connection':
        return 'border-lavender-blue/20 hover:bg-lavender-blue/5';
      case 'honest':
        return 'border-soft-cream/30 hover:bg-soft-cream/10';
      case 'nervous':
        return 'border-mauve-rose/20 hover:bg-mauve-rose/5';
      default:
        return 'border-gray-200 hover:bg-gray-50';
    }
  };

  return (
    <Card 
      className={`p-3 border cursor-pointer transition-colors ${getCategoryColorClass(phrase.category)} 
      ${isSelected ? 'bg-lavender-blue/10 border-lavender-blue/30 shadow-md' : 'bg-white shadow-sm'}`}
      onClick={onClick}
    >
      <p className="text-sm text-[#5d4357]">{phrase.text}</p>
    </Card>
  );
};

export default PhraseCard;
