
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  user: User | null;
  onSignOut: () => void;
  onClose: () => void;
  isDevelopment?: boolean;
}

const NavbarMobileMenu = ({ isOpen, user, onSignOut, onClose, isDevelopment }: NavbarMobileMenuProps) => {
  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy-800 border-t border-soft-cream/20">
        {user ? (
          <>
            <Link
              to="/during-conflict"
              className="block px-3 py-2 text-soft-cream hover:text-soft-cream/80 hover:bg-soft-cream/10 rounded-md text-base font-medium"
              onClick={handleLinkClick}
            >
              Mid-Fight
            </Link>
            <Link
              to="/post-conflict"
              className="block px-3 py-2 text-soft-cream hover:text-soft-cream/80 hover:bg-soft-cream/10 rounded-md text-base font-medium"
              onClick={handleLinkClick}
            >
              Post-Fight
            </Link>
            <Link
              to="/reconnect"
              className="block px-3 py-2 text-soft-cream hover:text-soft-cream/80 hover:bg-soft-cream/10 rounded-md text-base font-medium"
              onClick={handleLinkClick}
            >
              Reconnecting
            </Link>
            <Link
              to="/archive"
              className="block px-3 py-2 text-soft-cream hover:text-soft-cream/80 hover:bg-soft-cream/10 rounded-md text-base font-medium"
              onClick={handleLinkClick}
            >
              Reflection
            </Link>
            
            {isDevelopment && (
              <Link
                to="/dev-testing"
                className="block px-3 py-2 text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 rounded-md text-base font-medium border border-orange-300/30"
                onClick={handleLinkClick}
              >
                Dev Testing
              </Link>
            )}
            
            <div className="pt-2">
              <Button 
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                variant="outline"
                className="w-full text-navy-800 border-soft-cream bg-soft-cream hover:bg-soft-cream/90 hover:text-navy-800"
              >
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          <>
            {isDevelopment && (
              <Link
                to="/dev-testing"
                className="block px-3 py-2 text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 rounded-md text-base font-medium border border-orange-300/30"
                onClick={handleLinkClick}
              >
                Dev Testing
              </Link>
            )}
            
            <div className="pt-2">
              <Link to="/auth" onClick={handleLinkClick}>
                <Button 
                  className="w-full bg-soft-cream hover:bg-soft-cream/90 text-navy-800"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
