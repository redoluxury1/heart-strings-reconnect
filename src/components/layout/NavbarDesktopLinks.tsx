
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { User } from '@supabase/supabase-js';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavbarDesktopLinksProps {
  user: User | null;
}

const NavbarDesktopLinks: React.FC<NavbarDesktopLinksProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/during-conflict" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              Mid-Fight
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/post-conflict" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              Post-Fight
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/reconnect" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              Reconnecting
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/archive" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              <Book className="h-4 w-4 mr-1 inline" />
              Reflection
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarDesktopLinks;
