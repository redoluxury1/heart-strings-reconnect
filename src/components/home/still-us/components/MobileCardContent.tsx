
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import CardToolsList from './CardToolsList';
import { CardContent } from '../types';

interface MobileCardContentProps {
  card: CardContent;
  textColor: string;
  textColorMuted: string;
  bulletColor: string;
  isPostFight: boolean;
  buttonStyles: string;
  renderIcon: () => React.ReactNode;
}

const MobileCardContent: React.FC<MobileCardContentProps> = ({
  card,
  textColor,
  textColorMuted,
  bulletColor,
  isPostFight,
  buttonStyles,
  renderIcon
}) => {
  return (
    <>
      <div className="mb-5 flex items-center">
        {renderIcon()}
        <h3 className={`ml-3 text-2xl md:text-3xl font-cormorant font-semibold ${textColor}`}>
          {card.title}
        </h3>
      </div>
      
      <p className={`${textColorMuted} text-sm md:text-base mb-5`}>
        {card.description}
      </p>
      
      <div className="mb-6">
        <p className={`font-semibold text-sm ${textColor} mb-2`}>{card.sectionHeader}</p>
        <CardToolsList 
          tools={card.tools} 
          comingSoonTools={card.comingSoonTools} 
          bulletColor={bulletColor} 
          textColorMuted={textColorMuted} 
          isPostFight={isPostFight}
        />
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
  );
};

export default MobileCardContent;
