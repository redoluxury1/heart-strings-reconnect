
import React from 'react';
import { ReactNode } from 'react';
import { GenericSubcategoryData } from './SubcategoriesGrid';

interface SubcategoryCardProps {
  subcategory: GenericSubcategoryData;
  index: number;
  onClick: (subcategoryId: string) => void;
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({
  subcategory,
  index,
  onClick
}) => {
  const { id, name, icon, color = '', bgColor = '' } = subcategory;

  return (
    <button
      className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 w-full"
      onClick={() => onClick(id)}
    >
      {icon && (
        <div className={`flex items-center justify-center rounded-full p-2 ${bgColor} ${color} mr-3`}>
          {icon}
        </div>
      )}
      <span className="font-cormorant text-sm font-medium text-midnight-indigo text-left">
        {name}
      </span>
    </button>
  );
};

export default SubcategoryCard;
