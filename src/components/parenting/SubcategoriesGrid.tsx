
import React from 'react';
import SubcategoryCard from './SubcategoryCard';
import ContentContainer from '@/components/common/ContentContainer';
import { ReactNode } from 'react';

// Generic interface that can work with all our subcategory types
export interface GenericSubcategoryData {
  id: string;
  name: string;
  icon?: ReactNode; // Make icon optional with the ? symbol
  color: string;
  bgColor: string;
  prompts?: any; // Make prompts optional and accept any type
}

interface SubcategoriesGridProps {
  subcategories: GenericSubcategoryData[];
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
