
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';
import { Button } from '@/components/ui/button';
import { SUBCATEGORY_DATA } from '@/data/money-subcategories';
import DiscussionPromptCard from '@/components/parenting/DiscussionPromptCard';
import MultiChoicePromptCard from '@/components/parenting/MultiChoicePromptCard';
import { useMoneyPrompts } from '@/hooks/useMoneyPrompts';

const MoneySubcategoryDetails: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  
  // Find the subcategory data based on the ID from URL
  const subcategory = SUBCATEGORY_DATA.find(item => item.id === subcategoryId);
  
  const {
    responses,
    openEndedPrompts,
    yesNoPrompts,
    handleOpenResponseChange,
    handleMultiChoiceSelect,
    handleSendResponse
  } = useMoneyPrompts(subcategoryId || '', subcategory);

  // Handle back navigation
  const handleBackClick = () => {
    navigate('/bridge-the-gap/categories/money');
  };
  
  if (!subcategory) {
    return (
      <div className="min-h-screen flex flex-col bg-soft-cream">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <h2 className="text-2xl font-medium text-midnight-indigo mb-4">Subcategory not found</h2>
            <Button onClick={handleBackClick}>Back to Money Categories</Button>
          </div>
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
          <ContentContainer maxWidth="lg">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={handleBackClick}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Money categories
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-4">
                {subcategory.name}
              </h1>
              <div className={`flex items-center justify-center rounded-full p-3 ${subcategory.bgColor} ${subcategory.color} mb-4 mx-auto w-16 h-16`}>
                {subcategory.icon}
              </div>
              <p className="text-midnight-indigo/70 text-lg max-w-2xl mx-auto">
                Here are some prompts to help you and your partner talk about this topic.
              </p>
            </div>

            {/* Open-ended prompts section */}
            {openEndedPrompts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-medium text-midnight-indigo mb-4">Discussion Prompts</h2>
                <div className="space-y-4">
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
            
            {/* Yes/No prompts section */}
            {yesNoPrompts.length > 0 && (
              <div>
                <h2 className="text-xl font-medium text-midnight-indigo mb-4">Quick Check-ins</h2>
                <div className="space-y-4">
                  {yesNoPrompts.map((prompt, index) => {
                    // Calculate proper index in the combined prompts array
                    const promptIndex = openEndedPrompts.length + index;
                    
                    return (
                      <MultiChoicePromptCard
                        key={`yn-${index}`}
                        text={prompt.text}
                        selectedValue={responses[`${subcategoryId}-${promptIndex}`]?.response}
                        onSelect={(value) => handleMultiChoiceSelect(promptIndex, value)}
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

export default MoneySubcategoryDetails;
