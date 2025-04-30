
import React from 'react';
import PhraseOption from './PhraseOption';

interface PhraseSelectionViewProps {
  selectedGoal: {
    id: string;
    title: string;
    phrases: string[];
  } | null;
  onBack: () => void;
  onCustomizePhrase: (phrase: string) => void;
}

const PhraseSelectionView: React.FC<PhraseSelectionViewProps> = ({
  selectedGoal,
  onBack,
  onCustomizePhrase
}) => {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mb-2">
          Try saying it like this...
        </h3>
      </div>
      
      {selectedGoal && selectedGoal.phrases.map((phrase, index) => (
        <PhraseOption
          key={index}
          text={phrase}
          onNewTopic={onBack}
          onCustomize={() => onCustomizePhrase(phrase)}
        />
      ))}
    </>
  );
};

export default PhraseSelectionView;
