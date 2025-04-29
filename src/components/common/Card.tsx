
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  gradient?: boolean;
}

const Card = ({ children, className, icon, title, gradient = false }: CardProps) => {
  return (
    <div className={cn(
      "rounded-xl p-6 shadow-md", 
      gradient ? "bg-gradient-to-br from-rose-50 to-slate-50" : "bg-white",
      className
    )}>
      {(icon || title) && (
        <div className="flex items-center mb-4 gap-3">
          {icon && <div className="text-rose-500">{icon}</div>}
          {title && <h3 className="font-semibold text-lg">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
