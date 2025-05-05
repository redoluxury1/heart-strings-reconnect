
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import NavbarLogo from './NavbarLogo';
import NavbarDesktopLinks from './NavbarDesktopLinks';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarNotificationIcon from './NavbarNotificationIcon';

interface NavbarProps {
  hasNewLoveNote?: boolean;
  onViewLoveNote?: () => void;
}

const Navbar = ({ hasNewLoveNote = false, onViewLoveNote }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleViewLoveNote = () => {
    if (onViewLoveNote) {
      onViewLoveNote();
    }
    navigate('/love-notes');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="w-full py-2 px-6 md:px-12 flex items-center justify-between border-b border-slate-200">
      <NavbarLogo />
      
      {/* Desktop navigation */}
      <NavbarDesktopLinks
        hasNewLoveNote={hasNewLoveNote}
        onViewLoveNote={handleViewLoveNote}
      />
      
      {/* Mobile notification and menu */}
      <div className="md:hidden flex items-center">
        {/* Mobile notification icon */}
        <div className="mr-4">
          <NavbarNotificationIcon
            hasNewLoveNote={hasNewLoveNote}
            onClick={handleViewLoveNote}
          />
        </div>
        
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile navigation menu */}
      <NavbarMobileMenu 
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        navRef={navRef}
      />
    </nav>
  );
};

export default Navbar;
