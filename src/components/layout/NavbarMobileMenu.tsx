
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Gamepad } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navRef: React.RefObject<HTMLDivElement>;
}

const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({ 
  isOpen,
  onClose,
  navRef
}) => {
  if (!isOpen) return null;
  
  return (
    <div ref={navRef} className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
      <div className="flex flex-col p-4 space-y-3">
        <Link 
          to="/" 
          className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
          onClick={onClose}
        >
          Home
        </Link>
        <Link 
          to="/during-conflict" 
          className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
          onClick={onClose}
        >
          Mid-Fight
        </Link>
        <Link 
          to="/post-conflict" 
          className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
          onClick={onClose}
        >
          Post-Fight
        </Link>
        <Link 
          to="/reconnect" 
          className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
          onClick={onClose}
        >
          Reconnecting
        </Link>
        <Link 
          to="/games" 
          className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded flex items-center"
          onClick={onClose}
        >
          <Gamepad className="h-4 w-4 mr-2" />
          Games
        </Link>
        <Link 
          to="/archive" 
          className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded flex items-center"
          onClick={onClose}
        >
          <Book className="h-4 w-4 mr-2" />
          Archive
        </Link>
        <Button 
          variant="outline" 
          className="text-midnight-indigo border-midnight-indigo hover:bg-soft-blush rounded-full w-full"
          onClick={onClose}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
