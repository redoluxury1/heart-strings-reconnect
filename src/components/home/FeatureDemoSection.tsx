
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ContentContainer from '../common/ContentContainer';
import PhoneMockup from './PhoneMockup';
import FeatureDemoAnimation from './FeatureDemoAnimation';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { setPostOnboardingRedirect } from '@/utils/redirectStorage';

const FeatureDemoSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const navigate = useNavigate();

  const handleTryItYourself = () => {
    setPostOnboardingRedirect('/during-conflict');
    navigate('/intro');
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8f5ef] to-white overflow-hidden">
      <ContentContainer>
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-medium text-navy-800 mb-4 leading-tight">
                See how Bridge helps in real moments
              </h2>
              
              <p className="text-base sm:text-lg text-navy-800/70 mb-6 leading-relaxed">
                When emotions run high, finding the right words is hard. Bridge gives you thoughtful phrases 
                that express what you're really feeling — without escalating the conflict.
              </p>
              
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">1</span>
                  <span className="text-navy-800/80 text-sm sm:text-base">Choose what you want to express</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">2</span>
                  <span className="text-navy-800/80 text-sm sm:text-base">Pick from thoughtful, pre-written phrases</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">3</span>
                  <span className="text-navy-800/80 text-sm sm:text-base">Share with your partner in a calmer way</span>
                </li>
              </ul>
              
              <button 
                onClick={handleTryItYourself}
                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta hover:bg-terracotta/90 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg group"
              >
                Try it yourself
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Phone mockup with animation */}
            <div className="order-1 lg:order-2 flex justify-center">
              <PhoneMockup>
                <FeatureDemoAnimation />
              </PhoneMockup>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default FeatureDemoSection;
