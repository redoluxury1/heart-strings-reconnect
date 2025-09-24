
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
  buttonStyles: string;
  renderIcon: () => React.ReactNode;
}

const DesktopCardContent: React.FC<DesktopCardContentProps> = ({
  card,
  textColor,
  textColorMuted,
  bulletColor,
  buttonStyles,
  renderIcon
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-3">
        <div className="mr-3">
          {renderIcon()}
        </div>
        <h3 className={`text-2xl md:text-3xl font-cormorant font-semibold ${textColor}`}>
          {card.title}
        </h3>
      </div>
      
      <p className={`${textColorMuted} text-base mb-4 leading-relaxed`}>
        {card.description}
      </p>
      
      <div className="mb-5 flex-grow">
        <p className={`font-semibold text-sm ${textColor} mb-2`}>{card.sectionHeader}</p>
        <CardToolsList 
          tools={card.tools} 
          bulletColor={bulletColor} 
          textColorMuted={textColorMuted}
          isDesktop={true}
        />
      </div>
      
      <Link to={card.link} className="block">
        <Button 
          className={`w-full ${buttonStyles} py-3 px-5 rounded-lg transition-colors`}
        >
          {card.buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default DesktopCardContent;
