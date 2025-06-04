
import React, { useState } from 'react';
import { MessageCircle, Lightbulb, Handshake, Flag, Heart, Calendar, Plus } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';
import SubmitSmallWinDialog from './SubmitSmallWinDialog';

const smallWinsData = [
  {
    id: 1,
    icon: MessageCircle,
    text: "Talked it out instead of walking out",
    iconBgColor: "bg-[#2e4059]", // Navy
    iconColor: "text-white"
  },
  {
    id: 2,
    icon: Lightbulb,
    text: "Learned something new about my partner",
    iconBgColor: "bg-[#D36B4B]", // Terracotta
    iconColor: "text-white"
  },
  {
    id: 3,
    icon: Handshake,
    text: "Apologized and meant it",
    iconBgColor: "bg-[#8B9DC3]", // Lavender Blue
    iconColor: "text-white"
  },
  {
    id: 4,
    icon: Flag,
    text: "Paused mid-fight using the White Flag",
    iconBgColor: "bg-[#C7747F]", // Rosewood
    iconColor: "text-white"
  },
  {
    id: 5,
    icon: Heart,
    text: "Said \"I love you\" after a tough conversation",
    iconBgColor: "bg-[#2e4059]", // Navy
    iconColor: "text-white"
  },
  {
    id: 6,
    icon: Calendar,
    text: "Scheduled a check-in, not just a date night",
    iconBgColor: "bg-[#D36B4B]", // Terracotta
    iconColor: "text-white"
  }
];

const SmallWinsSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddYoursClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <BrandSection className="py-10 sm:py-12 lg:py-16" showLogo={false}>
      <ContentContainer>
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
          <h2 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2e4059] mb-2 sm:mb-4">
            Small Wins.
          </h2>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-2 sm:-ml-3 lg:-ml-4">
              {smallWinsData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <CarouselItem key={item.id} className="pl-2 sm:pl-3 lg:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="bg-[#f1eae8] rounded-xl p-4 sm:p-6 lg:p-8 h-full border border-[#e5c7c1] hover:shadow-md transition-shadow duration-200">
                      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full ${item.iconBgColor} flex items-center justify-center`}>
                          <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${item.iconColor}`} />
                        </div>
                        <p className="text-[#2e4059] text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
              
              {/* Add Yours Button */}
              <CarouselItem className="pl-2 sm:pl-3 lg:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <button
                  onClick={handleAddYoursClick}
                  className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 h-full border-2 border-dashed border-[#e5c7c1] hover:border-[#2e4059]/40 hover:shadow-md transition-all duration-200 group w-full touch-manipulation"
                >
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#e5c7c1] group-hover:bg-[#2e4059] flex items-center justify-center transition-colors duration-200">
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#2e4059] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <p className="text-[#2e4059]/70 group-hover:text-[#2e4059] text-xs sm:text-sm lg:text-base leading-relaxed font-medium transition-colors duration-200">
                      + Add Yours
                    </p>
                  </div>
                </button>
              </CarouselItem>
            </CarouselContent>
            
            <CarouselPrevious className="hidden lg:flex -left-12 border-[#e5c7c1] hover:bg-[#f1eae8] hover:border-[#2e4059]/40" />
            <CarouselNext className="hidden lg:flex -right-12 border-[#e5c7c1] hover:bg-[#f1eae8] hover:border-[#2e4059]/40" />
          </Carousel>
          
          {/* Scroll indicator dots */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2 lg:hidden">
            <div className="w-2 h-2 rounded-full bg-[#2e4059]/30"></div>
            <div className="w-2 h-2 rounded-full bg-[#2e4059]/60"></div>
            <div className="w-2 h-2 rounded-full bg-[#2e4059]/30"></div>
          </div>
          
          {/* Swipe hint for mobile */}
          <p className="text-center text-xs text-[#2e4059]/50 mt-2 sm:mt-3 lg:hidden">
            Swipe to see more
          </p>
        </div>
      </ContentContainer>
      
      <SubmitSmallWinDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </BrandSection>
  );
};

export default SmallWinsSection;
