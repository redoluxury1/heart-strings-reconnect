
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { CardContent } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

interface FeatureCardProps {
  card: CardContent;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ card }) => {
  const isMobile = useIsMobile();

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
              <h3 className="ml-3 text-xl font-cormorant font-medium text-midnight-indigo">
                {card.title}
              </h3>
            </div>
            
            <p className="text-midnight-indigo/80 text-sm md:text-base mb-5">
              {card.description}
            </p>
            
            <div className="mb-6">
              <p className="font-medium text-sm text-midnight-indigo mb-2">{card.sectionHeader}</p>
              <ul className="text-sm space-y-1.5">
                {card.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-midnight-indigo/50 mr-2"></span>
                    <span className="text-midnight-indigo/80">{tool}</span>
                  </li>
                ))}
                {card.comingSoonTools?.map((tool, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-midnight-indigo/50 mr-2"></span>
                    <span className="text-midnight-indigo/80">{tool} <span className="text-xs text-midnight-indigo/60">(Coming Soon)</span></span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link to={card.link} className="block mt-auto">
              <Button 
                variant="outline" 
                className="w-full border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10 transition-colors"
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
              <h3 className="text-xl font-cormorant font-medium text-midnight-indigo">
                {card.title}
              </h3>
            </div>
            
            {/* Description */}
            <p className="text-midnight-indigo/80 text-sm md:text-base mb-4">
              {card.description}
            </p>
            
            {/* Tools list */}
            <div className="mb-5 flex-grow">
              <p className="font-medium text-sm text-midnight-indigo mb-2">{card.sectionHeader}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                {card.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-midnight-indigo/50 mr-2"></span>
                    <span className="text-midnight-indigo/80">{tool}</span>
                  </div>
                ))}
                {card.comingSoonTools?.map((tool, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-midnight-indigo/50 mr-2"></span>
                    <span className="text-midnight-indigo/80">{tool} <span className="text-xs text-midnight-indigo/60">(Coming Soon)</span></span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Button at the bottom */}
            <Link to={card.link} className="block">
              <Button 
                variant="outline" 
                className="w-full border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10 transition-colors"
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
