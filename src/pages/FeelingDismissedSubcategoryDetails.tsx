
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import { Button } from '@/components/ui/button';
import Card from '@/components/common/Card';
import useFeelingDismissedPrompts from '@/hooks/useFeelingDismissedPrompts';

const FeelingDismissedSubcategoryDetails: React.FC = () => {
  const navigate = useNavigate();
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const { subcategory, openEndedPrompts, yesNoPrompts } = useFeelingDismissedPrompts();

  if (!subcategory) {
    return (
      <div className="min-h-screen flex flex-col bg-soft-cream">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-midnight-indigo">Subcategory not found</h2>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/bridge-the-gap/categories/feeling-dismissed')}
            >
              Back to Feeling Dismissed
            </Button>
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
        <div className="bg-soft-cream py-8">
          <ContentContainer maxWidth="lg">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={() => navigate('/bridge-the-gap/categories/feeling-dismissed')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Feeling Dismissed
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-5xl font-semibold text-[#162137] mb-4">
                {subcategory.name}
              </h1>
              <p className="text-midnight-indigo/70 text-lg max-w-2xl mx-auto">
                Try these prompts to help bridge the gap in understanding.
              </p>
            </div>
          </ContentContainer>
        </div>
        
        <ContentContainer maxWidth="lg" className="py-8">
          {openEndedPrompts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-cormorant font-semibold text-midnight-indigo mb-6">
                Open-Ended Questions
              </h2>
              <div className="space-y-4">
                {openEndedPrompts.map((prompt, index) => (
                  <Card key={index} className="p-6 border shadow-sm">
                    <p className="text-lg text-midnight-indigo">{prompt.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {yesNoPrompts.length > 0 && (
            <div>
              <h2 className="text-2xl font-cormorant font-semibold text-midnight-indigo mb-6">
                Yes / No / Sometimes
              </h2>
              <div className="space-y-4">
                {yesNoPrompts.map((prompt, index) => (
                  <Card key={index} className="p-6 border shadow-sm">
                    <p className="text-lg text-midnight-indigo">{prompt.text}</p>
                    <div className="mt-4 flex gap-3">
                      <Button variant="outline" className="bg-white text-midnight-indigo border-midnight-indigo/30">Yes</Button>
                      <Button variant="outline" className="bg-white text-midnight-indigo border-midnight-indigo/30">No</Button>
                      <Button variant="outline" className="bg-white text-midnight-indigo border-midnight-indigo/30">Sometimes</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </ContentContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeelingDismissedSubcategoryDetails;
