
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { CardContent } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useInterface } from '@/components/common/InterfaceProvider';

interface FeatureCardProps {
  card: CardContent;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ card }) => {
  const isMobile = useIsMobile();
  const { isEmotional, colors } = useInterface();
  
  // Determine text color based on card type and interface
  const getTextColor = () => {
    if (!isEmotional) {
      if (card.gradientClass.includes("#543544") || card.gradientClass.includes("#15283f")) {
        return "text-[#221F26]"; // Dark charcoal color for Mid-Fight and Post-Fight in solution-focused mode
      } else {
        return "text-[#2C3E50]"; // Dark blue for solution-focused reconnecting card
      }
    } else {
      return "text-[#6A4A74]"; // Plum color for emotional interface
    }
  };

  const textColor = getTextColor();
  const textColorMuted = isEmotional 
    ? "text-midnight-indigo/80" 
    : "text-[#2C3E50]/80";
  
  const bulletColor = isEmotional 
    ? "bg-[#6A4A74]/70" 
    : "bg-[#543544]/70"; // Using crimson color for solution-focused

  // Button styling based on card type and interface
  const getButtonStyles = () => {
    if (!isEmotional) {
      if (card.gradientClass.includes("#543544") || card.gradientClass.includes("#15283f")) {
        return "border-[#543544] text-[#543544] hover:bg-[#543544]/10"; // Crimson for solution-focused
      } else {
        return "border-[#4f6572] text-[#4f6572] hover:bg-[#4f6572]/10"; // Slate blue for solution-focused
      }
    } else {
      return "border-2 border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/10 font-medium"; // For emotional
    }
  };

  const buttonStyles = getButtonStyles();

  // Safely render the icon
  const renderIcon = () => {
    if (React.isValidElement(card.icon)) {
      return React.cloneElement(card.icon as React.ReactElement, { 
        className: isEmotional ? "text-[#6A4A74]" : "text-[#543544]" 
      });
    }
    return card.icon;
  };

  return (
    <div className="transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
      <div className={`h-full rounded-xl shadow-md p-6 md:p-7 bg-gradient-to-b ${card.gradientClass} ${
        isEmotional ? "border-2 border-[#6A4A74]/30" : "border border-[#543544]/20"
      }`}>
        {isMobile ? (
          // Mobile layout (vertical)
          <>
            <div className="mb-5 flex items-center">
              <div className={`p-3 rounded-full ${
                isEmotional ? "bg-[#6A4A74]/20" : "bg-[#543544]/20"
              }`}>
                {renderIcon()}
              </div>
              <h3 className={`ml-3 text-xl font-cormorant font-semibold ${textColor}`}>
                {card.title}
              </h3>
            </div>
            
            <p className={`${textColorMuted} text-sm md:text-base mb-5`}>
              {card.description}
            </p>
            
            <div className="mb-6">
              <p className={`font-semibold text-sm ${textColor} mb-2`}>{card.sectionHeader}</p>
              <ul className="text-sm space-y-1.5">
                {card.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${bulletColor} mr-2`}></span>
                    <span className={textColorMuted}>{tool}</span>
                  </li>
                ))}
                {card.comingSoonTools?.map((tool, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${bulletColor} mr-2`}></span>
                    <span className={textColorMuted}>{tool} <span className={`text-xs ${textColorMuted}`}>(Coming Soon)</span></span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link to={card.link} className="block mt-auto">
              <Button 
                variant="outline" 
                className={`w-full ${buttonStyles} transition-colors`}
              >
                {card.buttonText}
              </Button>
            </Link>
          </>
        ) : (
          // Desktop layout (horizontal) - reorganized
          <div className="flex flex-col">
            {/* Header with icon and title together */}
            <div className="flex items-center mb-2">
              <div className={`p-3 rounded-full ${
                isEmotional ? "bg-[#6A4A74]/20" : "bg-[#543544]/20"
              } mr-2`}>
                {renderIcon()}
              </div>
              <h3 className={`text-xl font-cormorant font-semibold ${textColor}`}>
                {card.title}
              </h3>
            </div>
            
            {/* Description */}
            <p className={`${textColorMuted} text-sm md:text-base mb-4`}>
              {card.description}
            </p>
            
            {/* Tools list */}
            <div className="mb-5 flex-grow">
              <p className={`font-semibold text-sm ${textColor} mb-2`}>{card.sectionHeader}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                {card.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${bulletColor} mr-2`}></span>
                    <span className={textColorMuted}>{tool}</span>
                  </div>
                ))}
                {card.comingSoonTools?.map((tool, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${bulletColor} mr-2`}></span>
                    <span className={textColorMuted}>{tool} <span className={`text-xs ${textColorMuted}`}>(Coming Soon)</span></span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Button at the bottom */}
            <Link to={card.link} className="block">
              <Button 
                variant="outline" 
                className={`w-full ${buttonStyles} transition-colors`}
              >
                {card.buttonText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
