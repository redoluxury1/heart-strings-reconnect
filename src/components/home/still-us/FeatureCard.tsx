
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
  const { isEmotional } = useInterface();
  
  // Determine text color based on card type
  const getTextColor = () => {
    if (card.gradientClass.includes("#543544")) {
      return "text-white";
    } else if (card.gradientClass.includes("#15283f")) {
      return "text-white";
    } else {
      return "text-midnight-indigo";
    }
  };

  const textColor = getTextColor();
  const textColorMuted = textColor === "text-white" ? "text-white/80" : "text-midnight-indigo/80";
  const bulletColor = textColor === "text-white" ? "bg-white/50" : "bg-midnight-indigo/50";

  return (
    <div className="transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
      <div className={`h-full rounded-xl shadow-md p-6 md:p-7 bg-gradient-to-b ${card.gradientClass} border border-white/20`}>
        {isMobile ? (
          // Mobile layout (vertical)
          <>
            <div className="mb-5 flex items-center">
              <div className={`p-3 rounded-full ${card.iconBgClass}`}>
                {card.icon}
              </div>
              <h3 className={`ml-3 text-xl font-cormorant font-medium ${textColor}`}>
                {card.title}
              </h3>
            </div>
            
            <p className={`${textColorMuted} text-sm md:text-base mb-5`}>
              {card.description}
            </p>
            
            <div className="mb-6">
              <p className={`font-medium text-sm ${textColor} mb-2`}>{card.sectionHeader}</p>
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
                className={`w-full ${
                  textColor === "text-white" 
                    ? "border-white text-white hover:bg-white/10" 
                    : "border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10"
                } transition-colors`}
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
              <div className={`p-2 rounded-full ${card.iconBgClass} mr-2`}>
                {card.icon}
              </div>
              <h3 className={`text-xl font-cormorant font-medium ${textColor}`}>
                {card.title}
              </h3>
            </div>
            
            {/* Description */}
            <p className={`${textColorMuted} text-sm md:text-base mb-4`}>
              {card.description}
            </p>
            
            {/* Tools list */}
            <div className="mb-5 flex-grow">
              <p className={`font-medium text-sm ${textColor} mb-2`}>{card.sectionHeader}</p>
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
                className={`w-full ${
                  textColor === "text-white" 
                    ? "border-white text-white hover:bg-white/10" 
                    : "border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10"
                } transition-colors`}
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
