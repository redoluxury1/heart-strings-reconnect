
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const StillUsImage: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div className="py-4 md:py-8">
      <ContentContainer>
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`flex justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src="/lovable-uploads/ff773bf1-651a-49f4-8ba0-476bb21ffeec.png"
            alt="We're still us"
            className="h-auto w-4/5 sm:w-3/5 md:w-2/5 max-w-md"
          />
        </div>
      </ContentContainer>
    </div>
  );
};

export default StillUsImage;
