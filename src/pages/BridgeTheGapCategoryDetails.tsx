
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const BridgeTheGapCategoryDetails: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  // Format category name for display (convert slug to title case)
  const formatCategoryName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16">
          <ContentContainer maxWidth="xl">
            <Button 
              variant="ghost" 
              className="mb-6 text-midnight-indigo hover:text-midnight-indigo/80"
              onClick={() => navigate('/bridge-the-gap/categories')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to categories
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
                {categoryId ? formatCategoryName(categoryId) : 'Category'}
              </h1>
              <p className="font-inter text-lg text-midnight-indigo/70">
                This is a placeholder for subcategories related to {categoryId ? formatCategoryName(categoryId) : 'this category'}.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-center text-midnight-indigo/60">
                Future content for {categoryId} will be displayed here.
              </p>
            </div>
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default BridgeTheGapCategoryDetails;
