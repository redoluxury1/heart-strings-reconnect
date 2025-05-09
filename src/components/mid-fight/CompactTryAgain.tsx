
import React from 'react';
import { Lightbulb, Heart, Shield } from 'lucide-react';
import TryAgainGraphic from './TryAgainGraphic';

interface CompactTryAgainProps {
  onCategorySelect: (goalId: string) => void;
  onSomethingElse: () => void;
}

const CompactTryAgain: React.FC<CompactTryAgainProps> = ({ 
  onCategorySelect,
  onSomethingElse
}) => {
  return (
    <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <TryAgainGraphic className="mx-auto" />
        <p className="text-[#07183D] text-lg mt-3">
          We'll help you phrase what's on your heart, in a way they can actually hear.
        </p>
      </div>
      
      {/* Clarity Section */}
      <CategorySection 
        title="Clarity" 
        icon={<Lightbulb className="text-[#E2725B]" />}
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
        icon={<Heart className="text-[#E2725B]" />}
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
        icon={<Shield className="text-[#E2725B]" />}
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
        <div className="text-2xl">
          {icon}
        </div>
        <h3 className="text-[#07183D] font-cormorant text-3xl">{title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <button 
            key={option.id} 
            onClick={() => onOptionSelect(option.id)}
            className="bg-[#536878] hover:bg-[#536878]/90 text-white rounded-full py-1.5 px-3 text-sm md:text-base transition-colors text-start shadow-sm"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompactTryAgain;
