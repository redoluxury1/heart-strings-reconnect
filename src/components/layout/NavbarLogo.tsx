
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const NavbarLogo = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Preload the logo with highest priority since it's critical
    const img = new Image();
    img.fetchPriority = "high";
    img.src = "/lovable-uploads/8c8b4b4e-6eaf-4c82-a30c-b2969459af89.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null; // Clean up
    };
  }, []);

  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        {!imageLoaded && (
          <Skeleton className="h-16 w-32" />
        )}
        <img 
          src="/lovable-uploads/8c8b4b4e-6eaf-4c82-a30c-b2969459af89.png" 
          alt="Bridge For Couples" 
          className={`h-16 w-auto transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager" 
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
        />
        <span className="sr-only">Bridge For Couples</span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
