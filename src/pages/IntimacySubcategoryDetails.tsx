
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import BrandSection from '@/components/common/BrandSection';
import { Button } from '@/components/ui/button';
import { SUBCATEGORY_DATA } from '@/data/intimacy-subcategories';
import DiscussionPromptCard from '@/components/parenting/DiscussionPromptCard';
import MultiChoicePromptCard from '@/components/parenting/MultiChoicePromptCard';
import { useIntimacyPrompts } from '@/hooks/useIntimacyPrompts';

const IntimacySubcategoryDetails: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  
  // Find the subcategory data based on the ID
  const subcategory = SUBCATEGORY_DATA.find(item => item.id === subcategoryId);

  // If subcategory doesn't exist, provide default content
  const subcategoryName = subcategory?.name || 'Subcategory';
  
  const { 
    responses, 
    openEndedPrompts, 
    yesNoPrompts, 
    handleOpenResponseChange, 
    handleMultiChoiceSelect, 
    handleSendResponse 
  } = useIntimacyPrompts(subcategoryId || '', subcategory);

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <ContentContainer maxWidth="lg">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={() => navigate('/bridge-the-gap/categories/intimacy')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to intimacy topics
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
                {subcategoryName}
              </h1>
              <p className="text-midnight-indigo/70 text-lg">
                Pick a prompt to help you talk about it together.
              </p>
            </div>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              {/* Open-ended prompts */}
              <div className="space-y-6 mb-8">
                <h2 className="font-medium text-lg text-midnight-indigo">Discussion Questions</h2>
                {openEndedPrompts.map((prompt, index) => (
                  <DiscussionPromptCard 
                    key={index}
                    text={prompt.text}
                    response={responses[`${subcategoryId}-${index}`]?.response || ""}
                    sent={responses[`${subcategoryId}-${index}`]?.sent || false}
                    onChange={(value) => handleOpenResponseChange(index, value)}
                    onSend={() => handleSendResponse(index)}
                  />
                ))}
              </div>
              
              {/* Yes/No prompts */}
              <div className="space-y-6">
                <h2 className="font-medium text-lg text-midnight-indigo">Quick Response Questions</h2>
                {yesNoPrompts.map((prompt, index) => (
                  <MultiChoicePromptCard 
                    key={index + openEndedPrompts.length}
                    text={prompt.text}
                    selectedValue={responses[`${subcategoryId}-${index + openEndedPrompts.length}`]?.response}
                    onSelect={(value) => handleMultiChoiceSelect(index + openEndedPrompts.length, value)}
                  />
                ))}
              </div>
              
              {/* Show message if no subcategory is found */}
              {!subcategory && (
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-medium text-midnight-indigo mb-4">
                      Subcategory Not Found
                    </h2>
                    <p className="text-midnight-indigo/70 mb-6">
                      The subcategory you're looking for doesn't exist or may have been moved.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/5"
                      onClick={() => navigate('/bridge-the-gap/categories/intimacy')}
                    >
                      Try another topic
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default IntimacySubcategoryDetails;
