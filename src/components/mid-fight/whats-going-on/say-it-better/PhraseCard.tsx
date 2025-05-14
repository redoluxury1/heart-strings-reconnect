
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SayItBetterPhrase } from '@/data/say-it-better-data';

interface PhraseCardProps {
  phrase: SayItBetterPhrase;
  expandedPhraseId: string | null;
  onPhraseClick: (phraseId: string) => void;
  onCustomize: (phrase: SayItBetterPhrase) => void;
  onSavePhrase?: (phrase: SayItBetterPhrase) => void;
  allowSave?: boolean;
}

const PhraseCard: React.FC<PhraseCardProps> = ({
  phrase,
  expandedPhraseId,
  onPhraseClick,
  onCustomize,
  onSavePhrase,
  allowSave = false
}) => {
  const isExpanded = expandedPhraseId === phrase.id;
  
  return (
    <Card 
      className={`border-lavender-blue/20 shadow-sm transition-all ${isExpanded ? 'bg-lavender-blue/5' : 'bg-white'}`}
    >
      <div className="p-4">
        {/* Phrase header */}
        <div 
          className="flex justify-between items-start cursor-pointer"
          onClick={() => onPhraseClick(phrase.id)}
        >
          <div>
            <h4 className="font-medium text-midnight-indigo mb-1">"{phrase.original}"</h4>
            <p className="text-sm text-gray-600">{phrase.emotionalSubtext}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500">
            {isExpanded ? '−' : '+'}
          </Button>
        </div>
        
        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div>
              <h5 className="text-sm font-medium text-mauve-rose mb-1">How It Might Land:</h5>
              <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100">
                {phrase.howItMightLand}
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-lavender-blue mb-1">Try Saying Instead:</h5>
              <p className="text-sm bg-lavender-blue/10 p-3 rounded border border-lavender-blue/20">
                "{phrase.trySayingInstead}"
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {phrase.categories.map(category => (
                <span 
                  key={category} 
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="text-xs flex items-center"
                onClick={() => onCustomize(phrase)}
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Customize
              </Button>
              
              {allowSave && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => onSavePhrase && onSavePhrase(phrase)}
                >
                  Save for Later
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PhraseCard;
