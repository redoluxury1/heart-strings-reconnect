
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandSection from '@/components/common/BrandSection';
import MoneySubcategoriesHeader from '@/components/money/MoneySubcategoriesHeader';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';
import { SUBCATEGORY_DATA } from '@/data/money-subcategories';

const MoneySubcategories: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/money/${subcategoryId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <MoneySubcategoriesHeader />
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

export default MoneySubcategories;
