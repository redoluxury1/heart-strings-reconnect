
import React from 'react';
import { SavedRephrase } from '@/types/archive';
import RephraseCard from './RephraseCard';
import EmptyState from './EmptyState';

interface RephraseListProps {
  rephrases: SavedRephrase[];
  toggleFavorite: (id: string) => void;
}

const RephraseList: React.FC<RephraseListProps> = ({ 
  rephrases,
  toggleFavorite,
}) => {
  if (rephrases.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {rephrases.map((rephrase, index) => (
        <RephraseCard
          key={rephrase.id}
          rephrase={rephrase}
          toggleFavorite={toggleFavorite}
          index={index}
        />
      ))}
    </div>
  );
};

export default RephraseList;
