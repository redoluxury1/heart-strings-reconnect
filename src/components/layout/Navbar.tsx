
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopLinks from './NavbarDesktopLinks';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarNotificationIcon from './NavbarNotificationIcon';
import PartnerPresenceIndicator from '@/components/partner/PartnerPresenceIndicator';
import RealTimeNotifications from '@/components/partner/RealTimeNotifications';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut, relationship } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/intro');
  };

  const handleLoveNoteClick = () => {
    // Handle love note click - navigate to notifications or show modal
    console.log('Love note clicked');
  };

  return (
    <>
      <nav className="safe-area-navbar relative z-50 bg-navy-800 border-b border-navy-800/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <NavbarLogo />
            
            {/* Desktop Navigation - only show on large screens */}
            <div className="hidden lg:block">
              <NavbarDesktopLinks user={user} />
            </div>
            
            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <NavbarNotificationIcon 
                hasNewLoveNote={false} 
                onLoveNoteClick={handleLoveNoteClick}
              />
              
              {/* Partner Presence Indicator - only show if connected and on large screens */}
              {user && relationship?.status === 'connected' && (
                <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                  <span className="text-sm text-white/80">Partner:</span>
                  <PartnerPresenceIndicator showText />
                </div>
              )}
              
              {/* Mobile menu button - show on md and below (iPad and mobile) */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 text-white hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-md"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
              
              {/* Desktop Auth Buttons - only show on large screens */}
              <div className="hidden lg:flex items-center space-x-2">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-medium">
                      {user.user_metadata?.name || user.email}
                    </span>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      size="sm"
                      className="border-white/30 bg-white text-navy-800 hover:bg-white/90 hover:text-navy-800 hover:border-white/50"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => navigate('/intro')}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 hover:text-white"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => navigate('/intro')}
                      size="sm"
                      className="bg-white hover:bg-white/90 text-navy-800 hover:text-navy-800"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu - now shows on iPad too */}
        <NavbarMobileMenu 
          isOpen={isOpen} 
          user={user}
          onSignOut={handleSignOut}
          onClose={() => setIsOpen(false)} 
        />
      </nav>
      
      {/* Real-time notifications component */}
      <RealTimeNotifications />
    </>
  );
};

export default Navbar;
