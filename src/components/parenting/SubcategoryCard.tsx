
import React from 'react';
import { ReactNode } from 'react';

interface SubcategoryCardProps {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  onClick: (subcategoryId: string) => void;
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({
  id,
  name,
  icon,
  color,
  bgColor,
  onClick
}) => {
  return (
    <button
      className="flex flex-col items-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
      onClick={() => onClick(id)}
    >
      <div className={`flex items-center justify-center rounded-full p-3 ${bgColor} ${color} mb-2`}>
        {icon}
      </div>
      <span className="font-cormorant font-medium text-base text-midnight-indigo text-center">
        {name}
      </span>
    </button>
  );
};

export default SubcategoryCard;
