
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';
import DiscussionPromptCard from '@/components/parenting/DiscussionPromptCard';
import MultiChoicePromptCard from '@/components/parenting/MultiChoicePromptCard';
import { SUBCATEGORY_DATA } from '@/data/household-duties-subcategories';
import { useHouseholdPrompts } from '@/hooks/useHouseholdPrompts';

const HouseholdSubcategoryDetails: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  
  // Find the current subcategory based on the ID from the URL
  const subcategory = SUBCATEGORY_DATA.find(sub => sub.id === subcategoryId);
  
  // Use the household prompts hook
  const { 
    responses, 
    openEndedPrompts, 
    yesNoPrompts, 
    handleOpenResponseChange, 
    handleMultiChoiceSelect, 
    handleSendResponse 
  } = useHouseholdPrompts(subcategoryId || '', subcategory);

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <ContentContainer maxWidth="lg">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={() => navigate('/bridge-the-gap/categories/household-duties')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to household duties
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
                {subcategory?.name || 'Subcategory'}
              </h1>
              <h2 className="font-inter text-base md:text-lg text-midnight-indigo/70">
                Take time to answer these questions, then share when you're ready.
              </h2>
            </div>
            
            <div className="grid gap-6 mb-12">
              <h3 className="text-xl font-medium text-[#162137] mt-4 mb-2">
                Discussion Questions
              </h3>
              
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
              
              <h3 className="text-xl font-medium text-[#162137] mt-6 mb-2">
                Quick Check-in
              </h3>
              
              {yesNoPrompts.map((prompt, index) => (
                <MultiChoicePromptCard
                  key={`yesno-${openEndedPrompts.length + index}`}
                  text={prompt.text}
                  selectedValue={responses[`${subcategoryId}-${openEndedPrompts.length + index}`]?.response}
                  onSelect={(value) => handleMultiChoiceSelect(openEndedPrompts.length + index, value)}
                />
              ))}
            </div>
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default HouseholdSubcategoryDetails;
