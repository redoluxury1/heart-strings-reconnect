
import React from 'react';
import PhraseOption from './PhraseOption';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PhraseSelectionViewProps {
  selectedGoal: {
    id: string;
    title: string;
    phrases: string[];
  } | null;
  onBack: () => void;
  onFavoritePhrase: (phrase: string) => void;
  onCustomizePhrase: (phrase: string) => void;
}

const PhraseSelectionView: React.FC<PhraseSelectionViewProps> = ({
  selectedGoal,
  onBack,
  onFavoritePhrase,
  onCustomizePhrase
}) => {
  return (
    <>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="text-midnight-indigo hover:bg-midnight-indigo/5 mb-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to goals
        </Button>
        <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mb-2">
          Try saying it like this...
        </h3>
      </div>
      
      {selectedGoal && selectedGoal.phrases.map((phrase, index) => (
        <PhraseOption
          key={index}
          text={phrase}
          onFavorite={() => onFavoritePhrase(phrase)}
          onCustomize={() => onCustomizePhrase(phrase)}
        />
      ))}
    </>
  );
};

export default PhraseSelectionView;
