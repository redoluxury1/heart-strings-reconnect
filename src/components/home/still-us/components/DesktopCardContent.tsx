
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import CardToolsList from './CardToolsList';
import { CardContent } from '../types';

interface DesktopCardContentProps {
  card: CardContent;
  textColor: string;
  textColorMuted: string;
  bulletColor: string;
  isPostFight: boolean;
  buttonStyles: string;
  renderIcon: () => React.ReactNode;
}

const DesktopCardContent: React.FC<DesktopCardContentProps> = ({
  card,
  textColor,
  textColorMuted,
  bulletColor,
  isPostFight,
  buttonStyles,
  renderIcon
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        {renderIcon()}
        <h3 className={`ml-2 text-2xl md:text-3xl font-cormorant font-semibold ${textColor}`}>
          {card.title}
        </h3>
      </div>
      
      <p className={`${textColorMuted} text-sm md:text-base mb-4`}>
        {card.description}
      </p>
      
      <div className="mb-5 flex-grow">
        <p className={`font-semibold text-sm ${textColor} mb-2`}>{card.sectionHeader}</p>
        <CardToolsList 
          tools={card.tools} 
          comingSoonTools={card.comingSoonTools} 
          bulletColor={bulletColor} 
          textColorMuted={textColorMuted} 
          isPostFight={isPostFight}
          isDesktop={true}
        />
      </div>
      
      <Link to={card.link} className="block">
        <Button 
          variant="outline" 
          className={`w-full ${isPostFight ? "border-white text-white hover:bg-white/10" : buttonStyles} transition-colors`}
        >
          {card.buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default DesktopCardContent;
