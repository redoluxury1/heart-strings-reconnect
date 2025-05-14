
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandSection from '@/components/common/BrandSection';
import FeelingUnseenSubcategoriesHeader from '@/components/feeling-unseen/FeelingUnseenSubcategoriesHeader';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';
import { feelingUnseenSubcategories } from '@/data/feeling-unseen-subcategories';

const FeelingUnseenSubcategories: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/feeling-unseen/${subcategoryId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <FeelingUnseenSubcategoriesHeader />
          
          <SubcategoriesGrid 
            subcategories={feelingUnseenSubcategories.map(sub => ({
              id: sub.id,
              name: sub.name,
              icon: sub.icon,
              color: sub.color,
              bgColor: sub.bgColor
            }))}
            onSubcategoryClick={handleSubcategoryClick}
          />
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeelingUnseenSubcategories;
