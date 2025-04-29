
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-slate-200">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/27d2c13d-bb89-4f27-a4d5-8756ef834fea.png" 
            alt="Bridge For Couples" 
            className="h-12 w-auto" 
          />
          <span className="sr-only">Bridge For Couples</span>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-sm font-medium hover:text-mauve-rose transition-colors">
          Home
        </Link>
        <Link to="/during-conflict" className="text-sm font-medium hover:text-mauve-rose transition-colors">
          During Conflict
        </Link>
        <Link to="/post-conflict" className="text-sm font-medium hover:text-mauve-rose transition-colors">
          Post Conflict
        </Link>
        <Link to="/reconnect" className="text-sm font-medium hover:text-mauve-rose transition-colors">
          Reconnect
        </Link>
      </div>
      
      <div>
        <Button variant="outline" className="text-midnight-indigo border-midnight-indigo hover:bg-soft-blush rounded-full">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
