
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
  return (
    <div className="hidden lg:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Features link - available to everyone */}
          <NavigationMenuItem>
            <Link to="/features" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              Features
            </Link>
          </NavigationMenuItem>
          
          {user ? (
            <>
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
            <Link to="/archive" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              Reflection
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/communication-analysis" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2 whitespace-nowrap">
              Communication Tools
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/settings" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
              Settings
            </Link>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              <NavigationMenuItem>
                <Link to="/auth?tab=signup" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
                  Get Started
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/auth?tab=signup" className="text-sm font-medium text-white hover:text-soft-cream transition-colors px-3 py-2">
                  Sign Up
                </Link>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarDesktopLinks;
