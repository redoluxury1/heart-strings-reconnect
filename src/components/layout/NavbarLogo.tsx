
import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';

const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <OptimizedImage 
          src="/lovable-uploads/8c8b4b4e-6eaf-4c82-a30c-b2969459af89.png" 
          alt="Bridge For Couples" 
          className="h-16 w-auto"
          priority={true}
        />
        <span className="sr-only">Bridge For Couples</span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
