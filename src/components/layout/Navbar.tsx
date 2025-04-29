
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-slate-200">
      <div className="flex items-center space-x-2">
        <Heart className="h-6 w-6 text-rose-500" />
        <Link to="/" className="text-xl font-semibold">HeartStrings</Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-sm font-medium hover:text-rose-500 transition-colors">
          Home
        </Link>
        <Link to="/during-conflict" className="text-sm font-medium hover:text-rose-500 transition-colors">
          During Conflict
        </Link>
        <Link to="/post-conflict" className="text-sm font-medium hover:text-rose-500 transition-colors">
          Post Conflict
        </Link>
        <Link to="/reconnect" className="text-sm font-medium hover:text-rose-500 transition-colors">
          Reconnect
        </Link>
      </div>
      
      <div>
        <Button variant="outline" className="text-rose-500 border-rose-500 hover:bg-rose-50">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
