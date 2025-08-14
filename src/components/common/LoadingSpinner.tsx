import React from "react";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "heart" | "spinner" | "dots";
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  variant = "spinner",
  message,
  className
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const renderSpinner = () => {
    switch (variant) {
      case "heart":
        return (
          <div className="relative">
            <Heart 
              className={cn(sizeClasses[size], "text-primary fill-primary/20 animate-pulse")}
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin">
                <div className={cn(
                  "rounded-full border-2 border-transparent border-t-primary/30 border-r-primary/30",
                  size === "sm" ? "w-5 h-5" : size === "md" ? "w-7 h-7" : "w-9 h-9"
                )}></div>
              </div>
            </div>
          </div>
        );
      
      case "dots":
        return (
          <div className="flex space-x-1">
            <div className={cn(
              "bg-primary rounded-full animate-bounce",
              size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-3 h-3"
            )}></div>
            <div className={cn(
              "bg-primary rounded-full animate-bounce animation-delay-200",
              size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-3 h-3"
            )}></div>
            <div className={cn(
              "bg-primary rounded-full animate-bounce animation-delay-400",
              size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-3 h-3"
            )}></div>
          </div>
        );
      
      default:
        return (
          <Loader2 className={cn(sizeClasses[size], "animate-spin text-primary")} />
        );
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      {renderSpinner()}
      {message && (
        <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;