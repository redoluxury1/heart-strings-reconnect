import React from "react";
import { Heart } from "lucide-react";
import ContentContainer from "./ContentContainer";

interface LoadingScreenProps {
  message?: string;
  showFloatingBubbles?: boolean;
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading Bridge For Couples…",
  showFloatingBubbles = true,
  className = ""
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-background to-background/80 relative overflow-hidden ${className}`}>
      {/* Floating background bubbles */}
      {showFloatingBubbles && (
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-secondary/10 rounded-full animate-pulse animation-delay-300"></div>
          <div className="absolute bottom-32 left-32 w-24 h-24 bg-accent/10 rounded-full animate-pulse animation-delay-700"></div>
          <div className="absolute bottom-20 right-16 w-16 h-16 bg-primary/10 rounded-full animate-pulse animation-delay-500"></div>
        </div>
      )}
      
      {/* Main loading content */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <ContentContainer className="max-w-xl">
          <div className="rounded-xl p-8 bg-card/95 backdrop-blur-sm shadow-elegant border border-border/20 text-center">
            {/* Animated heart logo */}
            <div className="relative mb-6">
              <div className="animate-pulse">
                <Heart 
                  className="w-16 h-16 mx-auto text-primary fill-primary/20" 
                  strokeWidth={1.5}
                />
              </div>
              
              {/* Spinning ring around heart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin">
                  <div className="w-20 h-20 rounded-full border-2 border-transparent border-t-primary/30 border-r-primary/30"></div>
                </div>
              </div>
            </div>
            
            {/* Loading text */}
            <div className="space-y-2">
              <p className="text-foreground text-lg font-medium">
                {message}
              </p>
              
              {/* Animated dots */}
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};

export default LoadingScreen;