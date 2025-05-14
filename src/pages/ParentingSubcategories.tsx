
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandSection from '@/components/common/BrandSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SUBCATEGORY_DATA } from '@/data/parenting-subcategories';
import ParentingSubcategoriesHeader from '@/components/parenting/ParentingSubcategoriesHeader';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';

const ParentingSubcategories: React.FC = () => {
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/parenting/${subcategoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16">
          <ParentingSubcategoriesHeader />
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

export default ParentingSubcategories;
