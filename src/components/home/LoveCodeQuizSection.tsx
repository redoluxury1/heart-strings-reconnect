
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
          
          {/* Quiz Preview Card */}
          <div className="mt-12 mb-14 relative">
            <div className="flex items-center justify-center">
              {/* Left Person */}
              <div className="flex-shrink-0 relative z-0">
                <img 
                  src="/lovable-uploads/aabdc349-360e-4d7c-9ed4-108241323c99.png" 
                  alt="Man illustration" 
                  className={`${isMobile ? 'w-16 md:w-24' : 'w-32 lg:w-40'}`}
                />
              </div>
              
              {/* Quiz Card */}
              <div className="bg-white rounded-2xl shadow-md border border-[#e6d8dc] p-3 md:p-4 relative z-10 mx-1">
                <div className={`${isMobile ? 'w-[130px] h-[130px]' : 'w-[280px] h-[280px]'} flex flex-col justify-center`}>
                  {/* Question Text */}
                  <h3 className="text-xs md:text-base font-medium text-[#3c3543] mb-3 md:mb-6 text-center">
                    What makes you feel most loved?
                  </h3>
                  
                  {/* Answer Options */}
                  <div className="space-y-2 md:space-y-4">
                    <div className="p-1.5 md:p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543] text-xs md:text-sm">
                      A. A heartfelt "I love you"
                    </div>
                    <div className="p-1.5 md:p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543] text-xs md:text-sm">
                      B. When they help without asking
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Person */}
              <div className="flex-shrink-0 relative z-0">
                <img 
                  src="/lovable-uploads/711046fd-39e9-4eb8-865e-1ba9e75aa336.png" 
                  alt="Woman illustration" 
                  className={`${isMobile ? 'w-14 md:w-20' : 'w-28 lg:w-32'}`}
                />
              </div>
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
