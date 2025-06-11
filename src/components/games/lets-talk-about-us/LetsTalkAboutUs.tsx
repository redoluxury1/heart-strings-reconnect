
import React, { useState } from 'react';
import { talkAboutUsCategories } from '@/data/lets-talk-about-us';
import CategoryCard from './CategoryCard';
import QuestionFlow from './QuestionFlow';

const LetsTalkAboutUs: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  const selectedCategory = talkAboutUsCategories.find(
    cat => cat.id === selectedCategoryId
  );
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };
  
  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
  };
  
  if (selectedCategory) {
    return (
      <QuestionFlow 
        category={selectedCategory} 
        onBack={handleBackToCategories}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="font-cormorant text-3xl md:text-4xl font-medium text-midnight-indigo">
          Let's Talk About Us
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sometimes the best way to reconnect is to ask a new question. Rediscover each other through thoughtful conversations that go beyond daily logistics.
        </p>
      </div>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talkAboutUsCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelect={handleCategorySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default LetsTalkAboutUs;
