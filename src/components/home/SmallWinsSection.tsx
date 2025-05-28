
import React from 'react';
import { MessageCircle, Lightbulb, Handshake, Flag, Heart, Calendar, Plus } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';

const smallWinsData = [
  {
    id: 1,
    icon: MessageCircle,
    text: "Talked it out instead of walking out"
  },
  {
    id: 2,
    icon: Lightbulb,
    text: "Learned something new about my partner"
  },
  {
    id: 3,
    icon: Handshake,
    text: "Apologized and meant it"
  },
  {
    id: 4,
    icon: Flag,
    text: "Paused mid-fight using the White Flag"
  },
  {
    id: 5,
    icon: Heart,
    text: "Said \"I love you\" after a tough conversation"
  },
  {
    id: 6,
    icon: Calendar,
    text: "Scheduled a check-in, not just a date night"
  }
];

const SmallWinsSection = () => {
  return (
    <BrandSection className="py-12 md:py-16" showLogo={false}>
      <ContentContainer>
        <div className="text-center mb-8">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-[#2e4059] mb-4">
            Small Wins. Big Difference.
          </h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {smallWinsData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="bg-[#f1eae8] rounded-xl p-6 h-full border border-[#e5c7c1] hover:shadow-md transition-shadow duration-200">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[#2e4059] flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-[#2e4059] text-sm leading-relaxed font-medium">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
              
              {/* Add Yours Button */}
              <CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-xl p-6 h-full border-2 border-dashed border-[#e5c7c1] hover:border-[#2e4059]/40 hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#e5c7c1] group-hover:bg-[#2e4059] flex items-center justify-center transition-colors duration-200">
                      <Plus className="w-6 h-6 text-[#2e4059] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <p className="text-[#2e4059]/70 group-hover:text-[#2e4059] text-sm leading-relaxed font-medium transition-colors duration-200">
                      + Add Yours
                    </p>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex -left-12 border-[#e5c7c1] hover:bg-[#f1eae8] hover:border-[#2e4059]/40" />
            <CarouselNext className="hidden md:flex -right-12 border-[#e5c7c1] hover:bg-[#f1eae8] hover:border-[#2e4059]/40" />
          </Carousel>
        </div>
      </ContentContainer>
    </BrandSection>
  );
};

export default SmallWinsSection;
