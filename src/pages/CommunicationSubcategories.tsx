
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandSection from '@/components/common/BrandSection';
import CommunicationSubcategoriesHeader from '@/components/communication/CommunicationSubcategoriesHeader';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';
import { communicationSubcategories } from '@/data/communication-subcategories';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CommunicationSubcategories: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/communication/${subcategoryId}`);
  };
  
  const handleGoBack = () => {
    navigate('/bridge-the-gap/categories');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <div className="mb-4">
            <Button 
              variant="ghost"
              onClick={handleGoBack}
              className="flex items-center gap-1 text-midnight-indigo"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Button>
          </div>
          
          <CommunicationSubcategoriesHeader />
          
          <SubcategoriesGrid 
            subcategories={communicationSubcategories}
            onSubcategoryClick={handleSubcategoryClick}
          />
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunicationSubcategories;
