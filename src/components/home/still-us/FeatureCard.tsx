
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
  
  // Check if this is the Post-Fight card to apply white text
  const isPostFight = card.title === "Post-Fight";
  const isReconnecting = card.title === "Reconnecting";
  const isMidFight = card.title === "Mid-Fight";
  
  // Updated text colors based on card type
  const textColor = isPostFight ? "text-white" : "text-[#07183D]";
  const textColorMuted = isPostFight ? "text-white/90" : "text-[#07183D]/90";
  const bulletColor = isPostFight ? "bg-white" : "bg-[#07183D]";
  
  // Button styles based on card type
  const defaultButtonStyles = "border-2 border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/10 font-medium";
  const reconnectingButtonStyles = "border-2 border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10 font-medium";
  const midFightButtonStyles = "border-2 border-[#b25a44] text-[#b25a44] hover:bg-[#b25a44]/10 font-medium";
  
  let buttonStyles = defaultButtonStyles;
  if (isReconnecting) buttonStyles = reconnectingButtonStyles;
  if (isMidFight) buttonStyles = midFightButtonStyles;

  // Safely render the icon
  const renderIcon = () => {
    if (React.isValidElement(card.icon)) {
      return card.icon;
    }
    return card.icon;
  };

  return (
    <div className="transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
      <div className={`relative overflow-hidden h-full rounded-xl shadow-md p-6 md:p-7 ${card.gradientClass} border-2 ${
        isPostFight ? 'border-[#22254a]/30' : 
        isReconnecting ? 'border-mauve-rose/30' : 
        isMidFight ? 'border-[#b25a44]/30' : 
        'border-[#6A4A74]/30'
      }`}>
        {/* Visual effects decorative elements */}
        <DecorativeElements visualEffect={card.visualEffect} />
        
        {/* Add vignette effect for Post-Fight card */}
        {isPostFight && (
          <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t from-[#161929]/40 via-transparent to-transparent" />
        )}
        
        {/* Content with proper z-index to appear above decorations */}
        <div className="relative z-10">
          {isMobile ? (
            <MobileCardContent
              card={card}
              textColor={textColor}
              textColorMuted={textColorMuted}
              bulletColor={bulletColor}
              isPostFight={isPostFight}
              buttonStyles={buttonStyles}
              renderIcon={renderIcon}
            />
          ) : (
            <DesktopCardContent
              card={card}
              textColor={textColor}
              textColorMuted={textColorMuted}
              bulletColor={bulletColor}
              isPostFight={isPostFight}
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
