
import React from 'react';
import { cn } from "@/lib/utils";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
  background?: "soft-cream" | "soft-blush" | "white" | "none";
}

const ContentContainer = ({ 
  children, 
  className, 
  maxWidth = "xl", 
  padding = true,
  background = "none"
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

  const backgroundClasses = {
    "soft-cream": "bg-soft-cream",
    "soft-blush": "bg-soft-blush",
    "white": "bg-white",
    "none": ""
  };

  return (
    <div className={cn(
      "mx-auto",
      maxWidthClasses[maxWidth],
      padding && "px-4 sm:px-6 lg:px-8",
      backgroundClasses[background],
      className
    )}>
      {children}
    </div>
  );
};

export default ContentContainer;
