
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../common/InterfaceProvider';
import Card from '../common/Card';
import { Heart } from 'lucide-react';

const LoveCodeQuizSection = () => {
  const { isEmotional } = useInterface();
  
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
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-md border border-[#e6d8dc] p-6 relative z-10">
              {/* Question Counter */}
              <div className="text-sm text-[#3c3543] mb-2">
                Question 1 of 5
              </div>
              
              {/* Question Text */}
              <h3 className="text-xl font-medium text-[#3c3543] mb-5 text-center">
                What makes you feel most loved in a relationship?
              </h3>
              
              {/* Answer Options */}
              <div className="space-y-3">
                <div className="p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543]">
                  A. A heartfelt "I love you"
                </div>
                <div className="p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543]">
                  B. When they do something helpful without me asking
                </div>
                <div className="p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543]">
                  C. When we spend uninterrupted time together
                </div>
                <div className="p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543]">
                  D. A surprise gift or thoughtful gesture
                </div>
                <div className="p-3 bg-[#f3e9ea] rounded-lg text-left text-[#3c3543]">
                  E. A long hug or kiss
                </div>
              </div>
            </div>
            
            {/* Illustrated Characters */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-10 md:ml-0 md:-left-32 lg:-left-44 hidden md:block">
              <img 
                src="/lovable-uploads/7a2b8328-e169-495c-a5c9-c91fe30f2fda.png" 
                alt="Man illustration" 
                className="w-32 lg:w-40"
              />
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-10 md:mr-0 md:-right-32 lg:-right-44 hidden md:block">
              <img 
                src="/lovable-uploads/7a2b8328-e169-495c-a5c9-c91fe30f2fda.png" 
                alt="Woman illustration" 
                className="w-32 lg:w-40 transform scale-x-[-1]"
              />
            </div>
            
            {/* Decorative Stars */}
            <div className="absolute -left-6 top-10 text-[#e6d8dc] text-xl hidden md:block">✧</div>
            <div className="absolute -right-6 bottom-10 text-[#e6d8dc] text-xl hidden md:block">✧</div>
          </div>
          
          {/* Tagline */}
          <h3 className="font-cormorant text-2xl md:text-3xl lg:text-4xl font-medium mb-12 text-[#3c3543]">
            LEARN YOUR LOVE CODE,<br />
            GROW TOGETHER
          </h3>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Link to="/love-code-quiz">
              <Button 
                className="bg-[#b08d97] hover:bg-[#9a7a84] text-white px-8 py-6 text-lg rounded-full h-auto"
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
