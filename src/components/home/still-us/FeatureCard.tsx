
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { CardContent } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useInterface } from '@/hooks/useInterfaceContext';

interface FeatureCardProps {
  card: CardContent;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ card }) => {
  const isMobile = useIsMobile();
  const { colors } = useInterface();
  
  // Text colors for the emotional interface - using dark indigo blue for better readability
  const textColor = "text-midnight-indigo"; // Changed from plum to midnight-indigo
  const textColorMuted = "text-midnight-indigo"; // Changed from midnight-indigo/80 to full color
  const bulletColor = "bg-midnight-indigo"; // Changed from plum to midnight-indigo
  const buttonStyles = "border-2 border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/10 font-medium";

  // Safely render the icon
  const renderIcon = () => {
    if (React.isValidElement(card.icon)) {
      return React.cloneElement(card.icon as React.ReactElement, { 
        className: "text-[#6A4A74]"
      });
    }
    return card.icon;
  };

  return (
    <div className="transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
      <div className={`h-full rounded-xl shadow-md p-6 md:p-7 bg-gradient-to-b ${card.gradientClass} border-2 border-[#6A4A74]/30`}>
        {isMobile ? (
          // Mobile layout (vertical)
          <>
            <div className="mb-5 flex items-center">
              <div className="p-3 rounded-full bg-[#6A4A74]/20">
                {renderIcon()}
              </div>
              <h3 className={`ml-3 text-2xl md:text-3xl font-cormorant font-semibold ${textColor}`}>
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
                    <span className={textColorMuted}>{tool} <span className={`text-xs text-midnight-indigo/70`}>(Coming Soon)</span></span>
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
              <div className="p-3 rounded-full bg-[#6A4A74]/20 mr-2">
                {renderIcon()}
              </div>
              <h3 className={`text-2xl md:text-3xl font-cormorant font-semibold ${textColor}`}>
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
                    <span className={textColorMuted}>{tool} <span className={`text-xs text-midnight-indigo/70`}>(Coming Soon)</span></span>
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
