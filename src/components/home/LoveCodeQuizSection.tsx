
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../common/InterfaceProvider';
import { Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const LoveCodeQuizSection = () => {
  const { isEmotional } = useInterface();
  const isMobile = useIsMobile();
  
  return (
    <section className={`py-20 ${
      isEmotional 
        ? "bg-soft-blush"
        : "bg-[#f8f0ee]"
    }`}>
      <ContentContainer>
        <div className="max-w-4xl mx-auto text-center">
          {/* Heart Icon */}
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-[#b08d97]" fill="#b08d97" />
          </div>
          
          {/* Main Title */}
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium mb-4 text-[#3c3543]">
            DISCOVER YOUR LOVE CODE™
          </h2>
          
          {/* Quiz Preview Card - Replaced with new single image */}
          <div className="mt-12 mb-14 relative flex justify-center">
            <div className="w-full max-w-[500px]">
              <img 
                src="/lovable-uploads/61b0bacb-5042-4c09-8dd2-53a193e5d7b5.png"
                alt="Love Code Quiz preview with couple"
                className="w-full h-auto rounded-xl"
              />
            </div>
            
            {/* Decorative Stars */}
            <div className="absolute -left-6 top-10 text-[#e6d8dc] text-xl hidden md:block">✧</div>
            <div className="absolute -right-6 bottom-10 text-[#e6d8dc] text-xl hidden md:block">✧</div>
          </div>
          
          {/* Tagline */}
          <h3 className="font-cormorant text-xl md:text-2xl lg:text-4xl font-medium mb-8 md:mb-12 text-[#3c3543]">
            LEARN YOUR LOVE CODE,<br />
            GROW TOGETHER
          </h3>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Link to="/love-code-quiz">
              <Button 
                className="bg-[#b08d97] hover:bg-[#9a7a84] text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-full h-auto"
              >
                DISCOVER YOUR LOVE CODE
              </Button>
            </Link>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default LoveCodeQuizSection;
