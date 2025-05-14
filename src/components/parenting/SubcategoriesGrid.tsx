
import React from 'react';
import { SubcategoryData } from '@/data/parenting-subcategories';
import SubcategoryCard from './SubcategoryCard';
import ContentContainer from '@/components/common/ContentContainer';

interface SubcategoriesGridProps {
  subcategories: SubcategoryData[];
  onSubcategoryClick: (subcategoryId: string) => void;
}

const SubcategoriesGrid: React.FC<SubcategoriesGridProps> = ({
  subcategories,
  onSubcategoryClick
}) => {
  return (
    <ContentContainer maxWidth="lg">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {subcategories.map((subcategory) => (
          <SubcategoryCard
            key={subcategory.id}
            id={subcategory.id}
            name={subcategory.name}
            icon={subcategory.icon || <></>}
            color={subcategory.color || ''}
            bgColor={subcategory.bgColor || ''}
            onClick={onSubcategoryClick}
          />
        ))}
      </div>
    </ContentContainer>
  );
};

export default SubcategoriesGrid;
