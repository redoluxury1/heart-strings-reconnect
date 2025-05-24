
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

  // Check if we're in development mode (you can adjust this condition)
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname.includes('lovable');

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavbarLogo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavbarDesktopLinks user={user} />
            
            {/* Development Link */}
            {isDevelopment && (
              <Link 
                to="/dev-testing" 
                className="text-orange-600 hover:text-orange-700 px-3 py-2 text-sm font-medium border border-orange-200 rounded-md"
              >
                Dev Testing
              </Link>
            )}
            
            <NavbarNotificationIcon 
              hasNewLoveNote={hasNewLoveNote}
              onLoveNoteClick={handleLoveNoteClick}
            />
            
            {user ? (
              <Button 
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="text-[#1E2A38] border-[#1E2A38] hover:bg-[#1E2A38]/10"
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm"
                  className="bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <NavbarNotificationIcon 
              hasNewLoveNote={hasNewLoveNote}
              onLoveNoteClick={handleLoveNoteClick}
            />
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
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
        isDevelopment={isDevelopment}
      />
    </nav>
  );
};

export default Navbar;
