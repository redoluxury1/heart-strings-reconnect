
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';
import FeelingDismissedSubcategoriesHeader from '@/components/feeling-dismissed/FeelingDismissedSubcategoriesHeader';
import feelingDismissedSubcategories from '@/data/feeling-dismissed-subcategories';

const FeelingDismissedSubcategories: React.FC = () => {
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/feeling-dismissed/${subcategoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <FeelingDismissedSubcategoriesHeader />
        
        <div className="py-8 md:py-12">
          <SubcategoriesGrid 
            subcategories={feelingDismissedSubcategories}
            onSubcategoryClick={handleSubcategoryClick}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeelingDismissedSubcategories;
