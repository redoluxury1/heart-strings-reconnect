
import React from 'react';
import { LightbulbIcon, HeartIcon, ShieldIcon } from 'lucide-react';

interface PhraseOptionProps {
  text: string;
  onClick: () => void;
}

const PhraseOption: React.FC<PhraseOptionProps> = ({ text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-rosewood-tint/80 hover:bg-rosewood-tint/90 text-white rounded-full py-3 px-5 text-sm md:text-base transition-colors"
    >
      {text}
    </button>
  );
};

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  options: Array<{ text: string; id: string }>;
  onOptionSelect: (id: string) => void;
  backgroundColor: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  icon, 
  options, 
  onOptionSelect,
  backgroundColor 
}) => {
  return (
    <div className={`${backgroundColor} rounded-xl p-5 mb-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl">
          {icon}
        </div>
        <h3 className="text-white font-cormorant text-3xl">{title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <PhraseOption 
            key={option.id} 
            text={option.text} 
            onClick={() => onOptionSelect(option.id)} 
          />
        ))}
      </div>
    </div>
  );
};

interface PausePhraseCardProps {
  onOptionSelect: (goalId: string) => void;
}

const PausePhraseCard: React.FC<PausePhraseCardProps> = ({ onOptionSelect }) => {
  const clarityOptions = [
    { id: 'explain-meant', text: 'Explain what I meant' },
    { id: 'ask-question', text: 'Ask a question calmly' },
    { id: 'express-need', text: 'Share a need' },
    { id: 'acknowledge-pattern', text: 'Share a vulnerability' }
  ];
  
  const vulnerabilityOptions = [
    { id: 'say-what-hurt', text: 'Say what hurt me' },
    { id: 'share-fear', text: 'Share a vulnerability' }
  ];
  
  const repairOptions = [
    { id: 'suggest-solution', text: 'Suggest a compromise' },
    { id: 'request-appreciation', text: 'Ask for appreciation' },
    { id: 'set-boundary', text: 'Set a boundary' }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-cormorant font-medium text-midnight-indigo mb-4">
          PAUSE + PHRASE
        </h2>
        <p className="text-midnight-indigo/80 text-lg max-w-lg mx-auto">
          We'll help you phrase what's on your heart, in a way they can actually hear.
        </p>
      </div>
      
      <CategoryCard 
        title="Clarity" 
        icon={<LightbulbIcon className="text-yellow-300" />}
        options={clarityOptions}
        onOptionSelect={onOptionSelect}
        backgroundColor="bg-mauve-rose/80"
      />
      
      <CategoryCard 
        title="Vulnerability" 
        icon={<HeartIcon className="text-pink-300" />}
        options={vulnerabilityOptions}
        onOptionSelect={onOptionSelect}
        backgroundColor="bg-mauve-rose/80"
      />
      
      <CategoryCard 
        title="Repair" 
        icon={<ShieldIcon className="text-orange-300" />}
        options={repairOptions}
        onOptionSelect={onOptionSelect}
        backgroundColor="bg-mauve-rose/80"
      />
    </div>
  );
};

export default PausePhraseCard;
