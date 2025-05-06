
import React from 'react';
import { Lightbulb, Heart, Shield } from 'lucide-react';

interface CompactPausePhraseProps {
  onCategorySelect: (goalId: string) => void;
  onSomethingElse: () => void;
}

const CompactPausePhrase: React.FC<CompactPausePhraseProps> = ({ 
  onCategorySelect,
  onSomethingElse
}) => {
  return (
    <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-5xl font-cormorant font-medium text-midnight-indigo mb-2">
          PAUSE + PHRASE
        </h2>
        <p className="text-midnight-indigo/80 text-lg">
          We'll help you phrase what's on your heart, in a way they can actually hear.
        </p>
      </div>
      
      {/* Clarity Section */}
      <CategorySection 
        title="Clarity" 
        icon={<Lightbulb className="text-yellow-300" />}
        options={[
          { id: 'explain-meant', text: 'Explain what I meant' },
          { id: 'ask-question', text: 'Ask a question calmly' },
          { id: 'express-need', text: 'Share a need' },
          { id: 'acknowledge-pattern', text: 'Address a recurring issue' }
        ]}
        onOptionSelect={onCategorySelect}
      />
      
      {/* Vulnerability Section */}
      <CategorySection 
        title="Vulnerability" 
        icon={<Heart className="text-pink-300" />}
        options={[
          { id: 'say-what-hurt', text: 'Say what hurt me' },
          { id: 'share-fear', text: 'Share a vulnerability' },
          { id: 'express-feeling', text: 'Express feelings without blame' }
        ]}
        onOptionSelect={onCategorySelect}
      />
      
      {/* Repair Section */}
      <CategorySection 
        title="Repair" 
        icon={<Shield className="text-orange-300" />}
        options={[
          { id: 'suggest-solution', text: 'Suggest a compromise' },
          { id: 'request-appreciation', text: 'Ask for appreciation' },
          { id: 'set-boundary', text: 'Set a boundary' },
          { id: 'apologize', text: 'Apologize' },
          { id: 'ask-for-space', text: 'Ask for space' }
        ]}
        onOptionSelect={onCategorySelect}
      />
      
      {/* Something Else - could be added if needed */}
    </div>
  );
};

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  options: Array<{ id: string; text: string }>;
  onOptionSelect: (id: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  icon, 
  options,
  onOptionSelect
}) => {
  return (
    <div className="bg-soft-cream/70 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl flex items-center justify-center w-8 h-8 rounded-full bg-white/30">
          {icon}
        </div>
        <h3 className="text-midnight-indigo font-cormorant text-3xl">{title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <button 
            key={option.id} 
            onClick={() => onOptionSelect(option.id)}
            className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white rounded-full py-1.5 px-3 text-sm md:text-base transition-colors text-start shadow-sm max-w-[80%]"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompactPausePhrase;
