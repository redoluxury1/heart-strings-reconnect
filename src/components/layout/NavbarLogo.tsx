
import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';

const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <OptimizedImage 
          src="/lovable-uploads/ae88d713-8b7c-4ecb-8e9b-24a41360f211.png" 
          alt="Bridge For Couples" 
          className="h-12 w-auto"
          priority={true}
        />
        <span className="sr-only">Bridge For Couples</span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
