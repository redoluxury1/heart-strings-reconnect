
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import BrandSection from '@/components/common/BrandSection';
import BoundariesSubcategoriesHeader from '@/components/boundaries/BoundariesSubcategoriesHeader';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';
import boundariesSubcategories from '@/data/boundaries-subcategories';

const BoundariesSubcategories: React.FC = () => {
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/boundaries/${subcategoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <ContentContainer maxWidth="xl">
            <BoundariesSubcategoriesHeader />
            
            <SubcategoriesGrid 
              subcategories={boundariesSubcategories}
              onSubcategoryClick={handleSubcategoryClick}
            />
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default BoundariesSubcategories;
