
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
      <nav className="relative z-50 bg-soft-cream border-b border-soft-blush/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <NavbarLogo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavbarDesktopLinks user={user} />
            </div>
            
            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <NavbarNotificationIcon 
                hasNewLoveNote={false} 
                onLoveNoteClick={handleLoveNoteClick}
              />
              
              {/* Partner Presence Indicator - only show if connected */}
              {user && relationship?.status === 'connected' && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200">
                  <span className="text-sm text-gray-600">Partner:</span>
                  <PartnerPresenceIndicator showText />
                </div>
              )}
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 text-midnight-indigo hover:bg-soft-blush/50 hover:text-midnight-indigo focus:outline-none focus:ring-2 focus:ring-inset focus:ring-midnight-indigo rounded-md"
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
              
              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-midnight-indigo font-medium">
                      {user.user_metadata?.name || user.email}
                    </span>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      size="sm"
                      className="border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo hover:text-white"
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
                      className="text-midnight-indigo hover:bg-midnight-indigo/10"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => navigate('/intro')}
                      size="sm"
                      className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
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
