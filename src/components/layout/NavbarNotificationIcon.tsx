
import React from 'react';
import { Mail } from 'lucide-react';

interface NavbarNotificationIconProps {
  hasNewLoveNote: boolean;
  onLoveNoteClick: () => void;
}

const NavbarNotificationIcon: React.FC<NavbarNotificationIconProps> = ({ 
  hasNewLoveNote,
  onLoveNoteClick
}) => {
  if (!hasNewLoveNote) return null;

  return (
    <button 
      onClick={onLoveNoteClick}
      className="relative flex items-center justify-center"
      aria-label="View new love note"
    >
      <Mail className="h-5 w-5 text-mauve-rose animate-pulse" />
      <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-mauve-rose"></span>
    </button>
  );
};

export default NavbarNotificationIcon;
