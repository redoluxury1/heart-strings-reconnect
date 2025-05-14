
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentContainer from '@/components/common/ContentContainer';
import { categoryData } from './bridge-data';

const BridgeTheGapCategoryScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCategorySelect = (categoryId: string) => {
    navigate(`/bridge-the-gap/subcategories/${categoryId}`);
  };
  
  return (
    <div className="min-h-screen bg-[#1A2641] py-12">
      <ContentContainer maxWidth="lg">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-cormorant font-medium text-[#E7D9C9] mb-4">
            What are you stuck on?
          </h1>
          <p className="text-lg text-[#E7D9C9]/90">
            Pick a category that fits your current challenge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryData.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="bg-[#FAF7F3] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 flex items-center justify-center text-[#1A2641] mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-medium text-[#1A2641]">
                {category.label}
              </h3>
            </div>
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export default BridgeTheGapCategoryScreen;
