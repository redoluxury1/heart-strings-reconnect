
import React from 'react';
import ContentContainer from './ContentContainer';
import { cn } from "@/lib/utils";

interface BrandSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  darkBackground?: boolean;
}

const BrandSection = ({ 
  children, 
  className, 
  title, 
  subtitle, 
  showLogo = false, // Changed default to false
  darkBackground = false 
}: BrandSectionProps) => {
  return (
    <section className={cn("py-16", className)}>
      <ContentContainer>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {showLogo && (
              <div className="flex justify-center mb-4">
                <img 
                  src={darkBackground 
                    ? "/lovable-uploads/d5fb821b-b9d2-40c0-b55d-31fd2af60ac4.png" 
                    : "/lovable-uploads/4c43c832-fd35-4f81-8d27-f1fbfa7d6250.png"}
                  alt="Bridge For Couples" 
                  className="h-16 w-auto" 
                />
              </div>
            )}
            {title && (
              <h2 className={cn(
                "text-3xl font-bold mb-4",
                darkBackground ? "text-slate-100" : "text-slate-800"
              )}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn(
                "text-lg max-w-2xl mx-auto",
                darkBackground ? "text-slate-300" : "text-slate-600"
              )}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </ContentContainer>
    </section>
  );
};

export default BrandSection;
