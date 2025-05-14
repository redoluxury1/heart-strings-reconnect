
import React from 'react';
import { ReactNode } from 'react';
import SubcategoryCard from './SubcategoryCard';
import { motion } from 'framer-motion';

// Generic interface to accommodate all subcategory types
export interface GenericSubcategoryData {
  id: string;
  name: string;
  icon?: ReactNode; // Icon is optional
  color?: string; // Color is optional
  bgColor?: string; // Background color is optional
  prompts?: any; // Prompts is optional and can be any type
}

interface SubcategoriesGridProps {
  subcategories: GenericSubcategoryData[];
  onSubcategoryClick: (id: string) => void;
}

const SubcategoriesGrid: React.FC<SubcategoriesGridProps> = ({ 
  subcategories, 
  onSubcategoryClick 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6"
    >
      {subcategories.map((subcategory, index) => (
        <SubcategoryCard
          key={subcategory.id}
          subcategory={subcategory}
          index={index}
          onClick={() => onSubcategoryClick(subcategory.id)}
        />
      ))}
    </motion.div>
  );
};

export default SubcategoriesGrid;
