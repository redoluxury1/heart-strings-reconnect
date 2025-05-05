
import React from 'react';
import PhraseCard from './PhraseCard';
import EmptyStateResults from './EmptyStateResults';
import { SayItBetterPhrase } from '@/data/say-it-better-data';

interface PhraseListProps {
  phrases: SayItBetterPhrase[];
  expandedPhraseId: string | null;
  onPhraseClick: (phraseId: string) => void;
  onCustomize: (phrase: SayItBetterPhrase) => void;
  onSavePhrase?: (phrase: SayItBetterPhrase) => void;
  allowSave?: boolean;
}

const PhraseList: React.FC<PhraseListProps> = ({
  phrases,
  expandedPhraseId,
  onPhraseClick,
  onCustomize,
  onSavePhrase,
  allowSave
}) => {
  if (phrases.length === 0) {
    return <EmptyStateResults />;
  }
  
  return (
    <div className="space-y-4 max-h-[400px] overflow-auto pr-1">
      {phrases.map(phrase => (
        <PhraseCard
          key={phrase.id}
          phrase={phrase}
          expandedPhraseId={expandedPhraseId}
          onPhraseClick={onPhraseClick}
          onCustomize={onCustomize}
          onSavePhrase={onSavePhrase}
          allowSave={allowSave}
        />
      ))}
    </div>
  );
};

export default PhraseList;
