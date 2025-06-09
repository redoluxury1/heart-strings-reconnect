
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLoveNoteClick = () => {
    if (onViewLoveNote) {
      onViewLoveNote();
    }
    navigate('/love-notes');
  };

  return (
    <nav className="bg-navy-800 safe-area-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 navbar-content">
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
                className="text-soft-cream border-soft-cream hover:bg-soft-cream/10 px-4 py-2"
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm"
                  className="bg-soft-cream hover:bg-soft-cream/90 text-navy-800 px-4 py-2"
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
              className="text-soft-cream hover:text-soft-cream/80 focus:outline-none focus:text-soft-cream p-3 touch-manipulation"
              aria-label="Toggle menu"
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
        onClose={closeMenu}
        isDevelopment={false}
      />
    </nav>
  );
};

export default Navbar;
