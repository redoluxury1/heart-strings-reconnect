
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import BrandSection from '@/components/common/BrandSection';
import { Button } from '@/components/ui/button';
import boundariesSubcategories, { SubcategoryData } from '@/data/boundaries-subcategories';
import DiscussionPromptCard from '@/components/parenting/DiscussionPromptCard';
import MultiChoicePromptCard from '@/components/parenting/MultiChoicePromptCard';
import { useBoundariesPrompts } from '@/hooks/useBoundariesPrompts';

const BoundariesSubcategoryDetails: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  
  // Find the subcategory data
  const subcategory = boundariesSubcategories.find(item => item.id === subcategoryId);
  
  // Use the custom hook for prompt management
  const {
    responses,
    openEndedPrompts,
    yesNoPrompts,
    handleOpenResponseChange,
    handleMultiChoiceSelect,
    handleSendResponse
  } = useBoundariesPrompts(subcategoryId || '', subcategory);
  
  // If subcategory not found, show error
  if (!subcategory) {
    return (
      <div className="min-h-screen flex flex-col bg-soft-cream">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center">
          <ContentContainer maxWidth="sm">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
              <h2 className="text-xl font-semibold text-midnight-indigo mb-4">Subcategory not found</h2>
              <p className="text-midnight-indigo/70 mb-6">The subcategory you're looking for doesn't exist.</p>
              <Button 
                onClick={() => navigate('/bridge-the-gap/categories/boundaries')}
                className="bg-midnight-indigo text-white hover:bg-midnight-indigo/90"
              >
                Go back to Boundaries
              </Button>
            </div>
          </ContentContainer>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <ContentContainer maxWidth="xl">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={() => navigate('/bridge-the-gap/categories/boundaries')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to boundaries
            </Button>
            
            <div className="text-center mb-10">
              <div 
                className={`inline-flex items-center justify-center rounded-full p-4 ${subcategory?.bgColor} ${subcategory?.color} mb-4`}
              >
                {subcategory?.icon}
              </div>
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
                {subcategory?.name}
              </h1>
              <p className="text-midnight-indigo/70 text-lg max-w-2xl mx-auto">
                Use these prompts to guide your conversation about this topic.
              </p>
            </div>
            
            {/* Open-ended prompts */}
            {openEndedPrompts.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-6">
                  Discussion Starters
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {openEndedPrompts.map((prompt, index) => (
                    <DiscussionPromptCard
                      key={`open-${index}`}
                      text={prompt.text}
                      response={responses[`${subcategoryId}-${index}`]?.response || ''}
                      sent={responses[`${subcategoryId}-${index}`]?.sent || false}
                      onChange={(value) => handleOpenResponseChange(index, value)}
                      onSend={() => handleSendResponse(index)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Yes/No/Sometimes prompts */}
            {yesNoPrompts.length > 0 && (
              <div>
                <h2 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-6">
                  Quick Check-in
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {yesNoPrompts.map((prompt, index) => {
                    // Calculate proper index based on position in the original prompts array
                    const originalIndex = openEndedPrompts.length + index;
                    
                    return (
                      <MultiChoicePromptCard
                        key={`yn-${index}`}
                        text={prompt.text}
                        selectedValue={responses[`${subcategoryId}-${originalIndex}`]?.response}
                        onSelect={(value) => handleMultiChoiceSelect(originalIndex, value)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default BoundariesSubcategoryDetails;
