
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import BrandSection from '@/components/common/BrandSection';
import { Button } from '@/components/ui/button';

const ParentingSubcategoryDetails: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  
  // Function to get subcategory name from ID
  const getSubcategoryName = (id: string): string => {
    switch(id) {
      case 'discipline-styles': return 'Discipline Styles';
      case 'nighttime-duties': return 'Nighttime Duties';
      case 'feeling-unsupported': return 'Feeling Unsupported';
      case 'division-of-labor': return 'Division of Labor';
      case 'overwhelm': return 'Overwhelm';
      case 'different-parenting-approaches': return 'Different Parenting Approaches';
      default: return 'Subcategory';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16">
          <ContentContainer maxWidth="lg">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={() => navigate('/bridge-the-gap/categories/parenting')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to parenting topics
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-4">
                {getSubcategoryName(subcategoryId || '')}
              </h1>
              <p className="text-midnight-indigo/70 text-lg max-w-2xl mx-auto">
                Coming soon: Targeted prompts and exercises for {getSubcategoryName(subcategoryId || '').toLowerCase()}.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 max-w-3xl mx-auto">
              <div className="text-center py-12">
                <h2 className="text-2xl font-medium text-midnight-indigo mb-4">
                  We're developing this content
                </h2>
                <p className="text-midnight-indigo/70 mb-6">
                  Our team is creating specialized exercises for this topic. Check back soon for helpful guidance.
                </p>
                <Button 
                  variant="outline" 
                  className="border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/5"
                  onClick={() => navigate('/bridge-the-gap/categories/parenting')}
                >
                  Try another topic
                </Button>
              </div>
            </div>
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParentingSubcategoryDetails;
