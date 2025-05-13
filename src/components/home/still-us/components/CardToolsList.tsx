
import React from 'react';

interface CardToolsListProps {
  tools: string[];
  comingSoonTools?: string[];
  bulletColor: string;
  textColorMuted: string;
  isDesktop?: boolean;
}

const CardToolsList: React.FC<CardToolsListProps> = ({ 
  tools, 
  comingSoonTools, 
  bulletColor, 
  textColorMuted, 
  isDesktop = false
}) => {
  // Use a fixed navy color for post-fight bullet points if bulletColor contains "2f3975"
  const actualBulletColor = bulletColor.includes('2f3975') 
    ? 'bg-[#2f3975]' // Ensure navy bullets are visible
    : bulletColor;
    
  return (
    <div className={isDesktop ? "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5" : "text-sm space-y-1.5"}>
      {tools.map((tool, idx) => (
        <div key={idx} className="flex items-center">
          <span className={`h-2 w-2 rounded-full ${actualBulletColor} mr-2`}></span>
          <span className={textColorMuted}>{tool}</span>
        </div>
      ))}
      {comingSoonTools?.map((tool, idx) => (
        <div key={idx} className="flex items-center">
          <span className={`h-2 w-2 rounded-full ${actualBulletColor} mr-2`}></span>
          <span className={textColorMuted}>
            {tool} <span className="text-xs text-[#3A3A3A]/70">(Coming Soon)</span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CardToolsList;
