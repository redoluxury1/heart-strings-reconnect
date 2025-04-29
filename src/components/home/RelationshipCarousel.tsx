
import React from 'react';
import { Heart, MessageCircle, Handshake, CalendarHeart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ContentContainer from '../common/ContentContainer';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SkillCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SkillCard = ({ title, description, icon }: SkillCardProps) => {
  return (
    <div className="bg-white/80 p-6 md:p-8 rounded-xl shadow-md h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-soft-blush flex items-center justify-center text-midnight-indigo">
          {icon}
        </div>
        <h3 className="ml-3 text-xl font-cormorant font-medium text-midnight-indigo">
          {title}
        </h3>
      </div>
      <p className="text-midnight-indigo/80 text-base">
        {description}
      </p>
    </div>
  );
};

const RelationshipCarousel = () => {
  const isMobile = useIsMobile();
  
  const skills = [
    {
      title: "Emotional Intelligence",
      description: "Learn to recognize and manage emotions during conflict to avoid escalation.",
      icon: <Heart className="h-5 w-5" />
    },
    {
      title: "Better Communication",
      description: "Develop skills to express your needs clearly and listen effectively — even when tensions are high.",
      icon: <MessageCircle className="h-5 w-5" />
    },
    {
      title: "Stronger Connection",
      description: "Turn conflict into an opportunity to grow closer and deepen emotional intimacy.",
      icon: <Handshake className="h-5 w-5" />
    },
    {
      title: "Preventative Tools",
      description: "Build rituals, routines, and check-ins that reduce future conflict and keep you feeling like a team.",
      icon: <CalendarHeart className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-20 bg-soft-cream">
      <ContentContainer>
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-midnight-indigo mb-4">
            Building a Healthier Relationship
          </h2>
          <p className="text-center text-midnight-indigo font-inter font-light max-w-2xl mx-auto">
            Bridge For Couples helps you grow the emotional skills, communication tools, and daily habits 
            that strengthen your connection — not just during conflict, but for the long run.
          </p>
        </div>

        <div className="mt-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {skills.map((skill, index) => (
                <CarouselItem key={index} className={cn(
                  "pl-4",
                  isMobile ? "basis-full" : "basis-1/2 md:basis-1/3"
                )}>
                  <SkillCard
                    title={skill.title}
                    description={skill.description}
                    icon={skill.icon}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 h-10 w-10" />
              <CarouselNext className="static translate-y-0 h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </ContentContainer>
    </section>
  );
};

export default RelationshipCarousel;
