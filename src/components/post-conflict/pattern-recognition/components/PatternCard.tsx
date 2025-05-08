
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface PatternCardProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: string;
  onClick?: () => void;
}

const PatternCard: React.FC<PatternCardProps> = ({ 
  children, 
  className, 
  icon,
  title,
  onClick
}) => {
  const cardClasses = cn(
    "w-full p-4 bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl flex items-center",
    "transition-colors duration-200 shadow-sm hover:shadow relative pr-12",
    onClick ? "cursor-pointer" : "",
    className
  );

  return (
    <div className={cardClasses} onClick={onClick}>
      {icon && (
        <div className="flex-shrink-0 mr-3 text-[#E9A875]">
          {icon}
        </div>
      )}
      <div className="flex-1">
        {title && (
          <h3 className="text-lg font-cormorant font-bold text-[#14213d] mb-1">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default PatternCard;
