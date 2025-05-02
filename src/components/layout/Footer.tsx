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
    <footer className={`${
      isEmotional 
        ? "bg-midnight-indigo" 
        : "bg-gradient-to-b from-[#e8edf3] via-[#6a8cb3]/70 to-[#543544]"
    } pt-9 pb-12 md:pb-16 relative z-10`}>
      {/* Using a solid background color with no transparency */}
      <div className={`absolute inset-0 ${
        isEmotional ? "bg-midnight-indigo" : "bg-transparent"
      } z-0`}></div>
      <ContentContainer>
        <div className="flex flex-col items-center relative z-20">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/258c4a04-63bc-4f6b-a3eb-312b251ac758.png" 
              alt="Bridge For Couples" 
              className="h-14 md:h-16 w-auto" 
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
