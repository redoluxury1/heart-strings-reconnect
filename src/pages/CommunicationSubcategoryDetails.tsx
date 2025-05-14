
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import BrandSection from '@/components/common/BrandSection';
import { Button } from '@/components/ui/button';
import { useCommunicationPrompts } from '@/hooks/useCommunicationPrompts';
import DiscussionPromptCard from '@/components/parenting/DiscussionPromptCard';
import MultiChoicePromptCard from '@/components/parenting/MultiChoicePromptCard';

const CommunicationSubcategoryDetails: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  
  const {
    subcategory,
    openEndedPrompts,
    yesNoSometimesPrompts,
  } = useCommunicationPrompts(subcategoryId || '');
  
  // Track responses and sent state for each prompt
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [sentStates, setSentStates] = useState<Record<string, boolean>>({});
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  
  // Handle text response changes
  const handleResponseChange = (promptId: string, text: string) => {
    setResponses(prev => ({
      ...prev,
      [promptId]: text
    }));
  };
  
  // Handle sending a response
  const handleSendResponse = (promptId: string) => {
    setSentStates(prev => ({
      ...prev,
      [promptId]: true
    }));
  };
  
  // Handle selection for yes/no/sometimes questions
  const handleSelection = (prompt: string, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [prompt]: value
    }));
  };
  
  if (!subcategory) {
    return (
      <div className="min-h-screen flex flex-col bg-soft-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-4">Subcategory not found</h2>
            <Button variant="outline" onClick={() => navigate('/bridge-the-gap/categories/communication')}>
              Back to Communication Categories
            </Button>
          </div>
        </div>
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
              onClick={() => navigate('/bridge-the-gap/categories/communication')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Communication categories
            </Button>
            
            <div className="text-center mb-10">
              <div 
                className={`inline-flex items-center justify-center rounded-full p-4 ${subcategory.bgColor} ${subcategory.color} mb-4`}
              >
                {subcategory.icon}
              </div>
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
                {subcategory.name}
              </h1>
              <p className="text-midnight-indigo/70 text-lg max-w-2xl mx-auto">
                Use these prompts to guide your conversation about this topic.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Open-ended discussion prompts - now stacked instead of carousel */}
              <div className="space-y-6">
                <h2 className="font-cormorant text-2xl font-medium text-midnight-indigo mb-4">
                  Discussion Prompts
                </h2>
                
                {openEndedPrompts.map((prompt, index) => (
                  <DiscussionPromptCard
                    key={index}
                    text={prompt}
                    response={responses[prompt] || ''}
                    sent={sentStates[prompt] || false}
                    onChange={(text) => handleResponseChange(prompt, text)}
                    onSend={() => handleSendResponse(prompt)}
                  />
                ))}
              </div>
              
              {/* Yes/No/Sometimes prompts */}
              <div className="space-y-6">
                <h2 className="font-cormorant text-2xl font-medium text-midnight-indigo mb-4">
                  Quick Check-In
                </h2>
                
                {yesNoSometimesPrompts.map((prompt, index) => (
                  <MultiChoicePromptCard 
                    key={index} 
                    text={prompt}
                    selectedValue={selectedValues[prompt]}
                    onSelect={(value) => handleSelection(prompt, value)}
                  />
                ))}
              </div>
            </div>
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunicationSubcategoryDetails;
