
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
        <div className={`h-8 w-8 flex items-center justify-center ${
          isSelected ? 'text-[#c06b6b]' : 'text-[#c06b6b]'
        }`}>
          {flagType.id === 'reconnect' ? (
            <IconComponent size={20} fill="#c06b6b" stroke="#c06b6b" />
          ) : (
            <IconComponent size={20} stroke="#c06b6b" />
          )}
        </div>
        
        <div>
          <h3 className="text-base font-medium text-[#1A1F2C] mb-0.5">{flagType.title}</h3>
          <p className="text-xs text-[#1A1F2C]/80">{flagType.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FlagTypeCard;
