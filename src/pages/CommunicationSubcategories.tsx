
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BrandSection from '@/components/common/BrandSection';
import CommunicationSubcategoriesHeader from '@/components/communication/CommunicationSubcategoriesHeader';
import SubcategoriesGrid from '@/components/parenting/SubcategoriesGrid';
import { communicationSubcategories } from '@/data/communication-subcategories';

const CommunicationSubcategories: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/communication/${subcategoryId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <CommunicationSubcategoriesHeader />
          
          <SubcategoriesGrid 
            subcategories={communicationSubcategories.map(sub => ({
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

export default CommunicationSubcategories;
