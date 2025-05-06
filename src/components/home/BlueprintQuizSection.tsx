
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
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            {/* Left side - Image */}
            <div className="order-2 md:order-1">
              <img 
                src="/lovable-uploads/86c8a669-0424-42ca-99d0-0e43d050e6ae.png" 
                alt="Couple looking at personality blueprint" 
                className="w-full h-auto rounded-lg mx-auto"
              />
            </div>
            
            {/* Right side - Content */}
            <div className="order-1 md:order-2 flex flex-col items-center md:items-start">
              <div className="mb-6 md:mb-8 text-center md:text-left">
                <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3c3543]">
                  DISCOVER YOUR
                </h2>
                <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3c3543]">
                  PERSONALITY
                </h2>
                <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#3c3543]">
                  BLUEPRINT
                </h2>
              </div>
              
              <p className="text-lg md:text-xl mb-4 text-[#3c3543]/80">
                Uncover your personality type.
              </p>
              <p className="text-lg md:text-xl mb-8 text-[#3c3543]/80">
                Deepen your connection.
              </p>
              
              <Link to="/personality-quiz">
                <Button 
                  className="bg-[#a87b6d] hover:bg-[#96695d] text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-full h-auto"
                >
                  DISCOVER YOUR BLUEPRINT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default BlueprintQuizSection;
