
import React from 'react';
import { Mail } from 'lucide-react';
import { useInterface } from '../common/InterfaceProvider';

interface NavbarNotificationIconProps {
  hasNewLoveNote: boolean;
  onClick: () => void;
}

const NavbarNotificationIcon: React.FC<NavbarNotificationIconProps> = ({ 
  hasNewLoveNote,
  onClick
}) => {
  const { isEmotional } = useInterface();
  
  if (!hasNewLoveNote) return null;

  return (
    <button 
      onClick={onClick}
      className="relative flex items-center justify-center"
      aria-label="View new love note"
    >
      <Mail 
        className={`h-5 w-5 ${
          isEmotional 
            ? "text-mauve-rose animate-pulse" 
            : "text-[#543544] animate-pulse"
        }`} 
      />
      <span className={`absolute -top-1 -right-1 flex h-2 w-2 rounded-full ${
        isEmotional ? "bg-mauve-rose" : "bg-[#543544]"
      }`}></span>
    </button>
  );
};

export default NavbarNotificationIcon;
