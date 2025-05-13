
import React from 'react';
import { CardContent } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useInterface } from '@/hooks/useInterfaceContext';
import DecorativeElements from './components/DecorativeElements';
import MobileCardContent from './components/MobileCardContent';
import DesktopCardContent from './components/DesktopCardContent';

interface FeatureCardProps {
  card: CardContent;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ card }) => {
  const isMobile = useIsMobile();
  const { colors } = useInterface();
  
  // Text colors based on card
  const textColor = card.headerColor || "text-[#07183D]";
  const textColorMuted = "text-[#2E2E2E]";
  const bulletColor = card.headerColor?.replace('text-', 'bg-') || "bg-[#07183D]";
  
  // Button styles based on UI spec
  const buttonStyles = "border-none bg-[#1C1C28] text-white hover:bg-[#2d2d3d] font-medium";

  // Safely render the icon
  const renderIcon = () => {
    if (React.isValidElement(card.icon)) {
      return card.icon;
    }
    return card.icon;
  };

  return (
    <div className="transition-all duration-300 mb-5">
      <div className={`relative overflow-hidden h-full rounded-xl shadow-sm p-6 ${card.gradientClass} border ${card.borderColor || 'border-[#6A4A74]/30'}`}>
        {/* Visual effects decorative elements */}
        <DecorativeElements visualEffect={card.visualEffect} />
        
        {/* Content with proper z-index to appear above decorations */}
        <div className="relative z-10">
          {isMobile ? (
            <MobileCardContent
              card={card}
              textColor={textColor}
              textColorMuted={textColorMuted}
              bulletColor={bulletColor}
              buttonStyles={buttonStyles}
              renderIcon={renderIcon}
            />
          ) : (
            <DesktopCardContent
              card={card}
              textColor={textColor}
              textColorMuted={textColorMuted}
              bulletColor={bulletColor}
              buttonStyles={buttonStyles}
              renderIcon={renderIcon}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
