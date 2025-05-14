
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandSection from '@/components/common/BrandSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SUBCATEGORY_DATA } from '@/data/intimacy-subcategories';
import IntimacySubcategoriesHeader from '@/components/intimacy/IntimacySubcategoriesHeader';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';

const IntimacySubcategories: React.FC = () => {
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/intimacy/${subcategoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <IntimacySubcategoriesHeader />
          <SubcategoriesGrid 
            subcategories={SUBCATEGORY_DATA} 
            onSubcategoryClick={handleSubcategoryClick} 
          />
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default IntimacySubcategories;
