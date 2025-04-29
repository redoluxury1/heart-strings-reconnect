
import React from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from '../common/ContentContainer';

interface FooterProps {
  showCTA?: boolean;
}

const Footer = ({ showCTA = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight-indigo pt-9 pb-12 md:pb-16">
      <ContentContainer>
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/258c4a04-63bc-4f6b-a3eb-312b251ac758.png" 
              alt="Bridge For Couples" 
              className="h-7 md:h-9 w-auto" 
            />
          </div>
          
          <p className="text-soft-blush text-xs md:text-sm font-cormorant">
            © {currentYear} Bridge For Couples. All rights reserved.
          </p>
        </div>
      </ContentContainer>
    </footer>
  );
};

export default Footer;
