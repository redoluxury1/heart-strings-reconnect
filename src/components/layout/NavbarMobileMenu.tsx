
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import PartnerPresenceIndicator from '@/components/partner/PartnerPresenceIndicator';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  user: User | null;
  onSignOut: () => void;
  onClose: () => void;
}

const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({ 
  isOpen, 
  user, 
  onSignOut, 
  onClose 
}) => {
  const { relationship } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy-800">
        {user ? (
          <>
            {/* Navigation Links */}
            <Link
              to="/during-conflict"
              className="text-white hover:bg-white/10 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={onClose}
            >
              Mid-Fight
            </Link>
            <Link
              to="/post-conflict"
              className="text-white hover:bg-white/10 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={onClose}
            >
              Post-Fight
            </Link>
            <Link
              to="/reconnect"
              className="text-white hover:bg-white/10 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={onClose}
            >
              Reconnecting
            </Link>
            <Link
              to="/archive"
              className="text-white hover:bg-white/10 hover:text-white flex items-center px-3 py-2 rounded-md text-base font-medium"
              onClick={onClose}
            >
              <Book className="h-4 w-4 mr-2" />
              Reflection
            </Link>
            <Link
              to="/settings"
              className="text-white hover:bg-white/10 hover:text-white flex items-center px-3 py-2 rounded-md text-base font-medium"
              onClick={onClose}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
            
            {/* Partner Status - show in mobile if connected */}
            {relationship?.status === 'connected' && (
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-md mx-3 my-2">
                <span className="text-sm text-white/80">Partner:</span>
                <PartnerPresenceIndicator showText />
              </div>
            )}
            
            {/* User Info and Sign Out */}
            <div className="pt-4 pb-3 border-t border-white/20">
              <div className="px-3 mb-3">
                <div className="text-base font-medium text-white">
                  {user.user_metadata?.name || user.email}
                </div>
              </div>
              <div className="px-3">
                <Button
                  onClick={() => {
                    onSignOut();
                    onClose();
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-white/30 bg-white text-navy-800 hover:bg-white/90 hover:text-navy-800 hover:border-white/50"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-2 p-3">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
            >
              Sign In
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              className="w-full bg-white hover:bg-white/90 text-navy-800 hover:text-navy-800"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
