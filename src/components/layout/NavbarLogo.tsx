
import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';

const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <OptimizedImage 
          src="/lovable-uploads/3a1869fe-bcbd-4a78-afa7-e6b39e5c9a74.png" 
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
