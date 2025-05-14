
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface EmotionBadgesProps {
  emotions: string[];
}

const EmotionBadges: React.FC<EmotionBadgesProps> = ({ emotions }) => {
  if (!emotions || emotions.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {emotions.map((emotion, index) => (
        <Badge 
          key={index}
          className="bg-[#F3DFD7] text-[#A05A45] hover:bg-[#F3DFD7]"
        >
          {emotion}
        </Badge>
      ))}
    </div>
  );
};

export default EmotionBadges;
