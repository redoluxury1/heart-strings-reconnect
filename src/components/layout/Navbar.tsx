
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-slate-200">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/80619689-94c4-43be-b585-6e9079eace63.png" 
            alt="Bridge For Couples" 
            className="h-20 w-auto" // Increased from h-12 to h-20
          />
          <span className="sr-only">Bridge For Couples</span>
        </Link>
      </div>
      
      {/* Desktop navigation */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="text-sm font-medium hover:text-mauve-rose transition-colors px-3 py-2">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-midnight-indigo hover:text-mauve-rose bg-transparent hover:bg-soft-blush">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/during-conflict" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-soft-blush hover:text-midnight-indigo focus:bg-soft-blush focus:text-midnight-indigo">
                        <div className="text-sm font-medium leading-none">During Conflict</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Tools and techniques to handle active disagreements
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/post-conflict" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-soft-blush hover:text-midnight-indigo focus:bg-soft-blush focus:text-midnight-indigo">
                        <div className="text-sm font-medium leading-none">Post Conflict</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Healing and reflection after disagreements
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/reconnect" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-soft-blush hover:text-midnight-indigo focus:bg-soft-blush focus:text-midnight-indigo">
                        <div className="text-sm font-medium leading-none">Reconnect</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Activities to strengthen your relationship
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="outline" className="text-midnight-indigo border-midnight-indigo hover:bg-soft-blush rounded-full">
                Get Started
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
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
              During Conflict
            </Link>
            <Link 
              to="/post-conflict" 
              className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Post Conflict
            </Link>
            <Link 
              to="/reconnect" 
              className="text-midnight-indigo hover:text-mauve-rose px-4 py-2 hover:bg-soft-blush rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reconnect
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
