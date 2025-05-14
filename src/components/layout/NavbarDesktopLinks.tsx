
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavbarNotificationIcon from './NavbarNotificationIcon';

interface NavbarDesktopLinksProps {
  hasNewLoveNote: boolean;
  onViewLoveNote: () => void;
}

const NavbarDesktopLinks: React.FC<NavbarDesktopLinksProps> = ({ 
  hasNewLoveNote,
  onViewLoveNote
}) => {
  return (
    <div className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/during-conflict" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
              Mid-Fight
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/post-conflict" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
              Post-Fight
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/reconnect" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
              Reconnecting
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/archive" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
              <Book className="h-4 w-4 mr-1 inline" />
              Journal
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <div className="mr-2">
              <NavbarNotificationIcon 
                hasNewLoveNote={hasNewLoveNote} 
                onClick={onViewLoveNote} 
              />
            </div>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Button variant="outline" className="text-midnight-indigo border-midnight-indigo hover:bg-soft-blush rounded-full">
              Get Started
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarDesktopLinks;
