
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SayInsteadPhrase } from '@/types/say-instead';

interface PhraseCardProps {
  phrase: SayInsteadPhrase;
  onClick: () => void;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-lg border border-lavender-blue/10 cursor-pointer hover:border-lavender-blue/30 transition-all hover:shadow-sm"
    >
      <p className="font-medium text-midnight-indigo mb-2">"{phrase.original}"</p>
      <div className="flex flex-wrap gap-1">
        {phrase.categories.slice(0, 2).map((category, index) => (
          <Badge key={index} variant="outline" className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20">
            {category}
          </Badge>
        ))}
        {phrase.categories.length > 2 && (
          <Badge variant="outline" className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20">
            +{phrase.categories.length - 2} more
          </Badge>
        )}
      </div>
    </div>
  );
};

export default PhraseCard;
