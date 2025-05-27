
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  user: User | null;
  onSignOut: () => void;
  isDevelopment?: boolean;
}

const NavbarMobileMenu = ({ isOpen, user, onSignOut, isDevelopment }: NavbarMobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
        {user ? (
          <>
            <Link
              to="/during-conflict"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
            >
              Mid-Fight
            </Link>
            <Link
              to="/post-conflict"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
            >
              Post-Fight
            </Link>
            <Link
              to="/reconnect"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
            >
              Reconnecting
            </Link>
            <Link
              to="/archive"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
            >
              Reflection
            </Link>
            
            {isDevelopment && (
              <Link
                to="/dev-testing"
                className="block px-3 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md text-base font-medium border border-orange-200"
              >
                Dev Testing
              </Link>
            )}
            
            <div className="pt-2">
              <Button 
                onClick={onSignOut}
                variant="outline"
                className="w-full text-[#1E2A38] border-[#1E2A38] hover:bg-[#1E2A38]/10"
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
                className="block px-3 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md text-base font-medium border border-orange-200"
              >
                Dev Testing
              </Link>
            )}
            
            <div className="pt-2">
              <Link to="/auth">
                <Button 
                  className="w-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white"
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
