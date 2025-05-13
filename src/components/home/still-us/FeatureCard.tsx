
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
  
  // Ensure bullet color is properly set for each card type
  let bulletColor = "bg-[#07183D]"; // Default
  if (card.title === "Post-Fight") {
    bulletColor = "bg-[#2f3975]"; // Navy for post-fight
  } else if (card.title === "Mid-Fight") {
    bulletColor = "bg-[#b25a44]"; // Red for mid-fight
  } else if (card.title === "Reconnecting") {
    bulletColor = "bg-mauve-rose"; // Pink for reconnecting
  }
  
  // Button styles changed to navy blue instead of dark gray/black
  const buttonStyles = "border-none bg-[#2f3975] text-white hover:bg-[#3f4985] font-medium";

  // Safely render the icon
  const renderIcon = () => {
    if (React.isValidElement(card.icon)) {
      return card.icon;
    }
    return card.icon;
  };

  return (
    <div className="transition-all duration-300 mb-5">
      <div className={`relative overflow-hidden h-full rounded-xl shadow-md hover:shadow-lg p-6 ${card.gradientClass} border ${card.borderColor || 'border-[#6A4A74]/30'}`}>
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
