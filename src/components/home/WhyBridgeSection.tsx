
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const WhyBridgeSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-[#f8f5ef]">
      <ContentContainer>
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-4xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} px-4`}
        >
          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-medium text-navy-800 mb-6 leading-tight">
            Why Bridge for Couples?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-navy-800/80 leading-relaxed font-inter">
            You could Google "what to say in a fight" — but then what? Bridge for Couples was built in the middle of a moment just like this and now gives you the exact words, at the exact moment, for your exact situation.
          </p>
        </div>
      </ContentContainer>
    </section>
  );
};

export default WhyBridgeSection;
