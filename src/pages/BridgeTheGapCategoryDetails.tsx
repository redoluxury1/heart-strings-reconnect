
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import BrandSection from '@/components/common/BrandSection';
import { Button } from '@/components/ui/button';

const BridgeTheGapCategoryDetails: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  // Check if this is the parenting category, which has its own subcategories page
  React.useEffect(() => {
    if (categoryId === 'parenting') {
      navigate('/bridge-the-gap/categories/parenting');
    }
  }, [categoryId, navigate]);

  // Function to get category name from ID
  const getCategoryName = (id: string): string => {
    switch(id) {
      case 'parenting': return 'Parenting';
      case 'intimacy': return 'Intimacy';
      case 'communication': return 'Communication';
      case 'household-duties': return 'Household Duties';
      case 'money': return 'Money';
      case 'feeling-dismissed': return 'Feeling Dismissed';
      case 'in-laws': return 'In-Laws';
      case 'boundaries': return 'Boundaries';
      case 'feeling-unseen': return 'Feeling Unseen';
      default: return 'Category';
    }
  };

  // If this is the parenting category, we'll redirect, so we don't need to render anything
  if (categoryId === 'parenting') return null;

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16">
          <ContentContainer maxWidth="lg">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={() => navigate('/bridge-the-gap/categories')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to categories
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-5xl font-semibold text-[#162137] mb-4">
                {getCategoryName(categoryId || '')}
              </h1>
              <p className="text-midnight-indigo/70 text-lg max-w-2xl mx-auto">
                Coming soon: Targeted prompts and exercises to help bridge the gap in your {getCategoryName(categoryId || '').toLowerCase()} discussions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 max-w-3xl mx-auto">
              <div className="text-center py-12">
                <h2 className="text-2xl font-medium text-midnight-indigo mb-4">
                  We're working on this feature
                </h2>
                <p className="text-midnight-indigo/70 mb-6">
                  Our team is developing targeted exercises for this category. Check back soon for helpful prompts.
                </p>
                <Button 
                  variant="outline" 
                  className="border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/5"
                  onClick={() => navigate('/bridge-the-gap/categories')}
                >
                  Try another category
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

export default BridgeTheGapCategoryDetails;
