
import React from 'react';

interface CardToolsListProps {
  tools: string[];
  comingSoonTools?: string[];
  bulletColor: string;
  textColorMuted: string;
  isPostFight: boolean;
  isDesktop?: boolean;
}

const CardToolsList: React.FC<CardToolsListProps> = ({ 
  tools, 
  comingSoonTools, 
  bulletColor, 
  textColorMuted, 
  isPostFight,
  isDesktop = false
}) => {
  return (
    <div className={isDesktop ? "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5" : "text-sm space-y-1.5"}>
      {tools.map((tool, idx) => (
        <div key={idx} className="flex items-center">
          <span className={`h-1.5 w-1.5 rounded-full ${bulletColor} mr-2`}></span>
          <span className={textColorMuted}>{tool}</span>
        </div>
      ))}
      {comingSoonTools?.map((tool, idx) => (
        <div key={idx} className="flex items-center">
          <span className={`h-1.5 w-1.5 rounded-full ${bulletColor} mr-2`}></span>
          <span className={textColorMuted}>
            {tool} <span className={`text-xs ${isPostFight ? "text-white/70" : "text-[#07183D]/70"}`}>(Coming Soon)</span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CardToolsList;
