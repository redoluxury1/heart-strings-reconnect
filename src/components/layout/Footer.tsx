
import React from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../../hooks/useInterfaceContext';

interface FooterProps {
  showCTA?: boolean;
}

const Footer = ({ showCTA = false }: FooterProps) => {
  const { isEmotional } = useInterface();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-10 relative z-10">
      {/* Separator dots */}
      <div className="flex justify-center items-center gap-4 mb-16">
        <div className="h-2 w-2 rounded-full bg-[#9a9a9a]/60"></div>
        <div className="h-2 w-2 rounded-full bg-[#9a9a9a]/60"></div>
        <div className="h-2 w-2 rounded-full bg-[#9a9a9a]/60"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="bg-[#fce9e7] rounded-3xl max-w-4xl mx-auto px-6 py-16 md:px-12">
        <div className="flex flex-col items-center relative z-20">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src="/lovable-uploads/258c4a04-63bc-4f6b-a3eb-312b251ac758.png" 
              alt="Bridge For Couples" 
              className="h-20 md:h-24 w-auto" 
            />
          </div>
          
          {/* Tagline */}
          <p className="text-[#3c3543] text-center text-xl md:text-3xl lg:text-4xl font-cormorant mb-16">
            Keep building your bridge—one<br />
            conversation at a time.
          </p>
          
          {/* Copyright */}
          <p className="text-[#3c3543] text-sm md:text-base font-cormorant">
            ©{currentYear} Bridge For Couples
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
