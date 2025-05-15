
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

  // Function to scroll to top when logo is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="pt-8 pb-10 relative z-10">
      {/* Updated Footer Content with more horizontal layout */}
      <div className="bg-[#fce9e7] max-w-6xl mx-auto px-6 py-12 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-20">
          {/* Logo - Now wrapped in a Link with an onClick handler */}
          <div className="mb-8 md:mb-0 flex justify-center md:justify-start">
            <Link to="/" onClick={scrollToTop}>
              <img 
                src="/lovable-uploads/43d77678-108c-4565-978c-3afdead85010.png" 
                alt="Bridge For Couples" 
                className="h-20 md:h-24 w-auto"
              />
            </Link>
          </div>
          
          {/* Tagline */}
          <div className="flex-1 text-center md:text-right">
            <p className="text-[#3c3543] text-xl md:text-2xl lg:text-3xl font-cormorant mb-4">
              Keep building your bridge—one conversation at a time.
            </p>
            
            {/* Copyright */}
            <p className="text-[#3c3543] text-sm md:text-base font-cormorant">
              ©{currentYear} Bridge For Couples
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
