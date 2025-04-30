
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SayInsteadPhrase } from '@/types/say-instead';
import AlternativeOption from './AlternativeOption';

interface PhraseDetailViewProps {
  phrase: SayInsteadPhrase;
  onBack: () => void;
  onFavorite: (alternative: string) => void;
  onCustomize: (alternative: string) => void;
}

const PhraseDetailView: React.FC<PhraseDetailViewProps> = ({ 
  phrase, 
  onBack,
  onFavorite,
  onCustomize
}) => {
  return (
    <div className="bg-soft-blush/30 p-4 rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-lg text-midnight-indigo">"{phrase.original}"</h4>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack} 
          className="text-xs text-lavender-blue hover:text-lavender-blue/80"
        >
          Back to list
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {phrase.categories.map((category, index) => (
          <Badge key={index} variant="outline" className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20">
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="space-y-3 mb-3">
        <p className="font-medium text-midnight-indigo">Say this instead:</p>
        {phrase.alternatives.map((alternative, index) => (
          <AlternativeOption 
            key={index} 
            alternative={alternative}
            onFavorite={() => onFavorite(alternative)}
            onCustomize={() => onCustomize(alternative)}
          />
        ))}
      </div>
      
      <div className="bg-white/70 p-3 rounded-lg mt-4">
        <p className="text-sm text-midnight-indigo/80">
          <span className="font-medium">Why this works:</span> {phrase.whyItWorks}
        </p>
      </div>
    </div>
  );
};

export default PhraseDetailView;
