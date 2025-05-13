
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
  
  // Check if this is the Post-Fight card to apply white text
  const isPostFight = card.title === "Post-Fight";
  const isReconnecting = card.title === "Reconnecting";
  const isMidFight = card.title === "Mid-Fight";
  
  // Updated text colors based on card type
  const textColor = isPostFight ? "text-white" : "text-[#07183D]";
  const textColorMuted = isPostFight ? "text-white/90" : "text-[#07183D]";
  const bulletColor = isPostFight ? "bg-white" : "bg-[#07183D]";
  
  // Button styles based on card type
  const defaultButtonStyles = "border-2 border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/10 font-medium";
  const reconnectingButtonStyles = "border-2 border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10 font-medium";
  const midFightButtonStyles = "border-2 border-peachy-terracotta text-peachy-terracotta hover:bg-peachy-terracotta/10 font-medium";
  
  let buttonStyles = defaultButtonStyles;
  if (isReconnecting) buttonStyles = reconnectingButtonStyles;
  if (isMidFight) buttonStyles = midFightButtonStyles;

  // Safely render the icon
  const renderIcon = () => {
    if (React.isValidElement(card.icon)) {
      let iconColor = "text-[#6A4A74]";
      if (isPostFight) iconColor = "text-white";
      if (isReconnecting) iconColor = "text-mauve-rose";
      if (isMidFight) iconColor = "text-peachy-terracotta";
      
      return React.cloneElement(card.icon as React.ReactElement, { 
        className: iconColor
      });
    }
    return card.icon;
  };
  
  // Generate decorative elements based on visualEffect
  const renderDecorativeElements = () => {
    switch(card.visualEffect) {
      case 'starry-navy':
        return Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.7
            }}
          />
        ));
      
      case 'playful-dots':
        return Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-bounce-soft"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.7
            }}
          />
        ));
      
      case 'terracotta-plum-blend':
        return Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float bg-opacity-30"
            style={{
              width: `${Math.random() * 25 + 15}px`,
              height: `${Math.random() * 25 + 15}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#c97c5d' : '#8a6f8e',
              opacity: 0.15,
              animationDelay: `${Math.random() * 3}s`,
              filter: 'blur(8px)'
            }}
          />
        ));
        
      default:
        return null;
    }
  };

  return (
    <div className="transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
      <div className={`relative overflow-hidden h-full rounded-xl shadow-md p-6 md:p-7 ${card.gradientClass} border-2 ${
        isPostFight ? 'border-[#22254a]/30' : 
        isReconnecting ? 'border-mauve-rose/30' : 
        isMidFight ? 'border-peachy-terracotta/30' : 
        'border-[#6A4A74]/30'
      }`}>
        {/* Visual effects decorative elements */}
        {renderDecorativeElements()}
        
        {/* Add vignette effect for Post-Fight card */}
        {isPostFight && (
          <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t from-[#161929]/40 via-transparent to-transparent" />
        )}
        
        {/* Content with proper z-index to appear above decorations */}
        <div className="relative z-10">
          {isMobile ? (
            // Mobile layout (vertical)
            <>
              <div className="mb-5 flex items-center">
                <div className={`p-3 rounded-full ${
                  isPostFight ? 'bg-white/20' : 
                  isReconnecting ? 'bg-mauve-rose/20' : 
                  isMidFight ? 'bg-peachy-terracotta/20' : 
                  'bg-[#6A4A74]/20'
                }`}>
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
                      <span className={textColorMuted}>{tool} <span className={`text-xs ${isPostFight ? "text-white/70" : "text-[#07183D]/70"}`}>(Coming Soon)</span></span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link to={card.link} className="block mt-auto">
                <Button 
                  variant="outline" 
                  className={`w-full ${isPostFight ? "border-white text-white hover:bg-white/10" : buttonStyles} transition-colors`}
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
                  isPostFight ? 'bg-white/20' : 
                  isReconnecting ? 'bg-mauve-rose/20' : 
                  isMidFight ? 'bg-peachy-terracotta/20' : 
                  'bg-[#6A4A74]/20'
                } mr-2`}>
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
                      <span className={textColorMuted}>{tool} <span className={`text-xs ${isPostFight ? "text-white/70" : "text-[#07183D]/70"}`}>(Coming Soon)</span></span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Button at the bottom */}
              <Link to={card.link} className="block">
                <Button 
                  variant="outline" 
                  className={`w-full ${isPostFight ? "border-white text-white hover:bg-white/10" : buttonStyles} transition-colors`}
                >
                  {card.buttonText}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
