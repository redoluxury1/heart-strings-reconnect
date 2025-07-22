
import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className="hidden lg:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/during-conflict" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2 whitespace-nowrap">
              Mid-Fight
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/post-conflict" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2 whitespace-nowrap">
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
              Reflection
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/gottman-method" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2 whitespace-nowrap">
              Gottman Method
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/settings" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              Settings
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarDesktopLinks;
