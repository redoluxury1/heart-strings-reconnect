
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopLinks from './NavbarDesktopLinks';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarNotificationIcon from './NavbarNotificationIcon';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  hasNewLoveNote?: boolean;
  onViewLoveNote?: () => void;
}

const Navbar = ({ hasNewLoveNote = false, onViewLoveNote }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoveNoteClick = () => {
    if (onViewLoveNote) {
      onViewLoveNote();
    }
    navigate('/love-notes');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 pt-safe-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 pt-4 sm:pt-6 md:pt-2">
          <NavbarLogo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavbarDesktopLinks user={user} />
            
            <NavbarNotificationIcon 
              hasNewLoveNote={hasNewLoveNote}
              onLoveNoteClick={handleLoveNoteClick}
            />
            
            {user ? (
              <Button 
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="text-[#1E2A38] border-[#1E2A38] hover:bg-[#1E2A38]/10 px-4 py-2"
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm"
                  className="bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white px-4 py-2"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <NavbarNotificationIcon 
              hasNewLoveNote={hasNewLoveNote}
              onLoveNoteClick={handleLoveNoteClick}
            />
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-3 touch-manipulation"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <NavbarMobileMenu 
        isOpen={isMenuOpen}
        user={user}
        onSignOut={handleSignOut}
        isDevelopment={false}
      />
    </nav>
  );
};

export default Navbar;
