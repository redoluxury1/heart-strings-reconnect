
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, Book, Gamepad, Mail } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useInterface } from '../common/InterfaceProvider';

interface NavbarProps {
  hasNewLoveNote?: boolean;
  onViewLoveNote?: () => void;
}

const Navbar = ({ hasNewLoveNote = false, onViewLoveNote }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isEmotional } = useInterface();

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

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-slate-200">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/80619689-94c4-43be-b585-6e9079eace63.png" 
            alt="Bridge For Couples" 
            className="h-28 w-auto"
          />
          <span className="sr-only">Bridge For Couples</span>
        </Link>
      </div>
      
      {/* Desktop navigation */}
      <div className="hidden md:flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/during-conflict" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
                Mid-Fight
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/post-conflict" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
                Post-Fight
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/reconnect" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
                Reconnecting
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/games" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
                <Gamepad className="h-4 w-4 mr-1 inline" />
                Games
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/archive" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
                <Book className="h-4 w-4 mr-1 inline" />
                Archive
              </Link>
            </NavigationMenuItem>
            
            {/* Notification envelope icon */}
            {hasNewLoveNote && (
              <NavigationMenuItem>
                <button 
                  onClick={handleViewLoveNote}
                  className="relative mr-2 flex items-center justify-center"
                  aria-label="View new love note"
                >
                  <Mail 
                    className={`h-5 w-5 ${
                      isEmotional 
                        ? "text-mauve-rose animate-pulse" 
                        : "text-[#E51D2C] animate-pulse"
                    }`} 
                  />
                  <span className={`absolute -top-1 -right-1 flex h-2 w-2 rounded-full ${
                    isEmotional ? "bg-mauve-rose" : "bg-[#E51D2C]"
                  }`}></span>
                </button>
              </NavigationMenuItem>
            )}
            
            <NavigationMenuItem>
              <Button variant="outline" className="text-midnight-indigo border-midnight-indigo hover:bg-soft-blush rounded-full">
                Get Started
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      {/* Mobile notification and menu */}
      <div className="md:hidden flex items-center">
        {/* Mobile notification icon */}
        {hasNewLoveNote && (
          <button 
            onClick={handleViewLoveNote}
            className="relative mr-4 flex items-center justify-center"
            aria-label="View new love note"
          >
            <Mail 
              className={`h-5 w-5 ${
                isEmotional 
                  ? "text-mauve-rose animate-pulse" 
                  : "text-[#E51D2C] animate-pulse"
              }`} 
            />
            <span className={`absolute -top-1 -right-1 flex h-2 w-2 rounded-full ${
              isEmotional ? "bg-mauve-rose" : "bg-[#E51D2C]"
            }`}></span>
          </button>
        )}
        
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
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div ref={navRef} className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
          <div className="flex flex-col p-4 space-y-3">
            <Link 
              to="/" 
              className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/during-conflict" 
              className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mid-Fight
            </Link>
            <Link 
              to="/post-conflict" 
              className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Post-Fight
            </Link>
            <Link 
              to="/reconnect" 
              className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reconnecting
            </Link>
            <Link 
              to="/games" 
              className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Gamepad className="h-4 w-4 mr-2" />
              Games
            </Link>
            <Link 
              to="/archive" 
              className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Book className="h-4 w-4 mr-2" />
              Archive
            </Link>
            <Button 
              variant="outline" 
              className="text-midnight-indigo border-midnight-indigo hover:bg-soft-blush rounded-full w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
