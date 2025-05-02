
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
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
  );
};

export default NavbarLogo;
