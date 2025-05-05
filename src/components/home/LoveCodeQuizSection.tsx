
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
              <div className="flex-shrink-0 mr-2 md:mr-4">
                <img 
                  src="/lovable-uploads/7a2b8328-e169-495c-a5c9-c91fe30f2fda.png" 
                  alt="Man illustration" 
                  className={`${isMobile ? 'w-20 md:w-24' : 'w-32 lg:w-40'}`}
                />
              </div>
              
              {/* Quiz Card */}
              <div className={`${isMobile ? 'max-w-[220px]' : 'max-w-xs md:max-w-md'} bg-white rounded-3xl shadow-md border border-[#e6d8dc] p-4 md:p-6 relative z-10`}>
                {/* Question Counter */}
                <div className="text-xs md:text-sm text-[#3c3543] mb-1 md:mb-2">
                  Question 1 of 5
                </div>
                
                {/* Question Text */}
                <h3 className="text-lg md:text-xl font-medium text-[#3c3543] mb-3 md:mb-5 text-center">
                  What makes you feel most loved in a relationship?
                </h3>
                
                {/* Answer Options */}
                <div className="space-y-2 md:space-y-3">
                  <div className="p-2 md:p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543] text-sm md:text-base">
                    A. A heartfelt "I love you"
                  </div>
                  <div className="p-2 md:p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543] text-sm md:text-base">
                    B. When they help without me asking
                  </div>
                  <div className="p-2 md:p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543] text-sm md:text-base">
                    C. Quality time together
                  </div>
                  <div className="p-2 md:p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543] text-sm md:text-base">
                    D. A thoughtful gift or gesture
                  </div>
                  <div className="p-2 md:p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543] text-sm md:text-base">
                    E. Physical touch and affection
                  </div>
                </div>
              </div>
              
              {/* Right Person - Updated with the new illustration */}
              <div className="flex-shrink-0 ml-2 md:ml-4">
                <img 
                  src="/lovable-uploads/711046fd-39e9-4eb8-865e-1ba9e75aa336.png" 
                  alt="Woman illustration" 
                  className={`${isMobile ? 'w-28 md:w-32' : 'w-36 lg:w-40'}`}
                />
              </div>
            </div>
            
            {/* Decorative Stars */}
            <div className="absolute -left-6 top-10 text-[#e6d8dc] text-xl">✧</div>
            <div className="absolute -right-6 bottom-10 text-[#e6d8dc] text-xl">✧</div>
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
