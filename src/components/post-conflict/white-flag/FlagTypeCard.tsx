
import React from 'react';
import { FlagType } from '@/data/white-flag-data';

interface FlagTypeCardProps {
  flagType: FlagType;
  isSelected: boolean;
  onClick: () => void;
}

const FlagTypeCard = ({ flagType, isSelected, onClick }: FlagTypeCardProps) => {
  const IconComponent = flagType.icon;
  
  return (
    <div 
      className={`border rounded-xl p-3 mb-2 cursor-pointer transition-all ${
        isSelected ? 'border-[#c06b6b] bg-[#fce6d4]/30' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {/* Removed the background div that was creating a circle effect */}
        {flagType.id === 'reconnect' ? (
          <IconComponent size={20} fill="white" stroke="white" />
        ) : (
          <IconComponent size={20} stroke="white" />
        )}
        
        <div>
          <h3 className="text-base font-medium text-[#1A1F2C] mb-0.5">{flagType.title}</h3>
          <p className="text-xs text-[#1A1F2C]/80">{flagType.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FlagTypeCard;
