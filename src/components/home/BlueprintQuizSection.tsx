
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../common/InterfaceProvider';

const BlueprintQuizSection = () => {
  const { isEmotional } = useInterface();
  
  return (
    <section className={`py-12 md:py-16 ${
      isEmotional 
        ? "bg-soft-cream" 
        : "bg-[#f8f7f3]"
    }`}>
      <ContentContainer>
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title - Styled like Love Code section */}
          <div className="mb-4 md:mb-6 text-center">
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3c3543]">
              Discover Your
            </h2>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3c3543]">
              PERSONALITY BLUEPRINT
            </h2>
          </div>
          
          {/* Quiz Preview Card - Updated with the new illustration */}
          <div className="mt-6 md:mt-8 mb-6 md:mb-8 relative flex justify-center">
            <div className="w-full max-w-[500px]">
              <img 
                src="/lovable-uploads/2a32ba00-539b-4d2d-a892-b4b84db7e48f.png"
                alt="Couple looking at personality blueprint" 
                className="w-full h-auto rounded-xl"
              />
            </div>
            
            {/* Decorative Stars */}
            <div className="absolute -left-6 top-10 text-[#e6d8dc] text-xl hidden md:block">✧</div>
            <div className="absolute -right-6 bottom-10 text-[#e6d8dc] text-xl hidden md:block">✧</div>
          </div>
          
          {/* Tagline */}
          <h3 className="font-cormorant text-xl md:text-2xl lg:text-4xl font-medium mb-4 md:mb-8 text-[#3c3543]">
            UNCOVER YOUR PERSONALITY,<br />
            DEEPEN YOUR CONNECTION
          </h3>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Link to="/personality-quiz">
              <Button 
                className="bg-[#a87b6d] hover:bg-[#96695d] text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-full h-auto"
              >
                DISCOVER YOUR BLUEPRINT
              </Button>
            </Link>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default BlueprintQuizSection;
