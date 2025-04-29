
import React from 'react';
import { cn } from "@/lib/utils";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

const ContentContainer = ({ 
  children, 
  className, 
  maxWidth = "xl", 
  padding = true 
}: ContentContainerProps) => {
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-7xl",
  };

  return (
    <div className={cn(
      "mx-auto",
      maxWidthClasses[maxWidth],
      padding && "px-4 sm:px-6 lg:px-8",
      className
    )}>
      {children}
    </div>
  );
};

export default ContentContainer;
