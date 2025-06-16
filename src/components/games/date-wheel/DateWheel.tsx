
import React from 'react';
import CategoryFilter from './CategoryFilter';
import SpinningWheel from './SpinningWheel';
import DateIdeaCard from './DateIdeaCard';
import { useWheelLogic } from './hooks/useWheelLogic';

const DateWheel: React.FC = () => {
  const {
    isSpinning,
    rotation,
    selectedCategory,
    selectedIdea,
    dateIdeas,
    handleSpin,
    handleFilterChange,
    handleSaveIdea
  } = useWheelLogic();
  
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-midnight-indigo text-center mb-3">
        Spin for a Surprise Date Night
      </h2>
      
      <p className="text-center text-gray-600 mb-6">
        No overthinking. No planning. Just spin and go.
      </p>
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleFilterChange}
      />
      
      {!selectedIdea ? (
        <SpinningWheel
          dateIdeas={dateIdeas}
          rotation={rotation}
          isSpinning={isSpinning}
          onSpin={handleSpin}
        />
      ) : (
        <DateIdeaCard 
          dateIdea={selectedIdea}
          onSave={handleSaveIdea}
          onTryAgain={handleSpin}
        />
      )}
    </div>
  );
};

export default DateWheel;
