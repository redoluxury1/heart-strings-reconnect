
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentContainer from '@/components/common/ContentContainer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { categoryData, subcategoriesData } from './bridge-data';

const BridgeTheGapSubCategoryScreen: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  // Find the selected category
  const selectedCategory = categoryData.find(category => category.id === categoryId);
  
  // Get subcategories for this category
  const subcategories = categoryId ? subcategoriesData[categoryId] || [] : [];
  
  const handleSubcategorySelect = (subcategoryId: string) => {
    // This will navigate to the prompts screen (to be implemented)
    navigate(`/bridge-the-gap/prompts/${categoryId}/${subcategoryId}`);
  };
  
  const handleGoBack = () => {
    navigate('/bridge-the-gap/categories');
  };
  
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-[#1A2641] py-12 text-[#E7D9C9]">
        <ContentContainer>
          <div className="text-center">
            <h1 className="text-2xl mb-4">Category not found</h1>
            <Button 
              onClick={handleGoBack}
              variant="outline" 
              className="border-[#E7D9C9] text-[#E7D9C9] hover:bg-[#E7D9C9]/10"
            >
              <ArrowLeft className="mr-2" /> Back to Categories
            </Button>
          </div>
        </ContentContainer>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#1A2641] py-12">
      <ContentContainer maxWidth="lg">
        <Button 
          onClick={handleGoBack}
          variant="outline" 
          className="mb-8 border-[#E7D9C9] text-[#E7D9C9] hover:bg-[#E7D9C9]/10"
        >
          <ArrowLeft className="mr-2" /> Back to Categories
        </Button>
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto flex items-center justify-center text-[#E7D9C9] mb-4">
            {selectedCategory.icon}
          </div>
          <h1 className="text-4xl font-cormorant font-medium text-[#E7D9C9] mb-4">
            {selectedCategory.label}
          </h1>
          <p className="text-lg text-[#E7D9C9]/90">
            Select a specific area to explore
          </p>
        </div>
        
        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                onClick={() => handleSubcategorySelect(subcategory.id)}
                className="bg-[#FAF7F3] rounded-lg p-6 text-center cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-medium text-[#1A2641]">
                  {subcategory.label}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#FAF7F3] rounded-lg p-8 text-center">
            <p className="text-[#1A2641]">Subcategories coming soon for this topic.</p>
          </div>
        )}
      </ContentContainer>
    </div>
  );
};

export default BridgeTheGapSubCategoryScreen;
