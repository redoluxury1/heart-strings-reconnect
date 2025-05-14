
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandSection from '@/components/common/BrandSection';
import HouseholdSubcategoriesHeader from '@/components/household/HouseholdSubcategoriesHeader';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';
import { SUBCATEGORY_DATA } from '@/data/household-duties-subcategories';

const HouseholdSubcategories: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/household-duties/${subcategoryId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <HouseholdSubcategoriesHeader />
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

export default HouseholdSubcategories;
