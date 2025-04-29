
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import { Button } from "@/components/ui/button";
import { Flame, HeartCrack, Heart, MessageCircle, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

// Card content type definition
type CardContent = {
  title: string;
  description: string;
  icon: React.ReactNode;
  tools: string[];
  comingSoonTools?: string[];
  link: string;
  gradientClass: string;
  iconBgClass: string;
  buttonText: string;
};

const StillUsSection = () => {
  const isMobile = useIsMobile();
  
  const cards: CardContent[] = [
    {
      title: "Mid-Fight",
      description: "Emotions are high? That's okay. Here's where you can pause, breathe, and calm things down before saying more.",
      icon: <Flame className="h-6 w-6" />,
      tools: ["Time Out Timer", "Mood Check-In", "Pause & Phrase Toolkit", "Say This Instead"],
      comingSoonTools: ["Build a Bridge"],
      link: "/during-conflict",
      gradientClass: "from-lavender-blue/20 to-lavender-blue/5",
      iconBgClass: "bg-lavender-blue/20",
      buttonText: "Let's Slow Down",
    },
    {
      title: "Post-Fight",
      description: "That was a lot. This space helps you process what just happened, understand what you need, and find clarity before reconnecting.",
      icon: <HeartCrack className="h-6 w-6" />,
      tools: ["Talk It Out Prompt Library", "Build a Bridge"],
      comingSoonTools: [],
      link: "/post-conflict",
      gradientClass: "from-soft-cream/40 to-soft-cream/10",
      iconBgClass: "bg-soft-cream/40",
      buttonText: "Let's Reflect",
    },
    {
      title: "Reconnecting",
      description: "Not fighting? Beautiful. Come here for small ways to feel closer, learn more about each other, and have fun.",
      icon: <Puzzle className="h-6 w-6" />,
      tools: ["Would You Rather: Couples Game", "Love Code Quiz", "Blueprint Personality Quiz"],
      comingSoonTools: ["Mini Missions or Connection Challenges"],
      link: "/reconnect",
      gradientClass: "from-mauve-rose/20 to-mauve-rose/5",
      iconBgClass: "bg-mauve-rose/20",
      buttonText: "Let's Grow Closer",
    },
  ];

  return (
    <section className="py-20 bg-soft-blush">
      <ContentContainer>
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium italic text-midnight-indigo mb-4">
            We're still US
          </h2>
          <p className="text-center text-midnight-indigo font-inter font-light max-w-2xl mx-auto">
            For the hard moments, the quiet pauses, and the choice to reconnect — this space meets you wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
              <div className={`h-full rounded-xl shadow-md p-6 md:p-7 bg-gradient-to-b ${card.gradientClass} border border-white/20`}>
                {isMobile ? (
                  // Mobile layout (vertical)
                  <>
                    <div className="mb-5 flex items-center">
                      <div className={`p-3 rounded-full ${card.iconBgClass}`}>
                        {card.icon}
                      </div>
                      <h3 className="ml-3 text-xl font-cormorant font-medium text-midnight-indigo">
                        {card.title}
                      </h3>
                    </div>
                    
                    <p className="text-midnight-indigo/80 text-sm md:text-base mb-5">
                      {card.description}
                    </p>
                    
                    <div className="mb-6">
                      <p className="font-medium text-sm text-midnight-indigo mb-2">Includes Tools:</p>
                      <ul className="text-sm space-y-1.5">
                        {card.tools.map((tool, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-midnight-indigo/50 mr-2"></span>
                            <span className="text-midnight-indigo/80">{tool}</span>
                          </li>
                        ))}
                        {card.comingSoonTools?.map((tool, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-midnight-indigo/50 mr-2"></span>
                            <span className="text-midnight-indigo/80 italic">{tool} <span className="text-xs text-midnight-indigo/60">(Coming Soon)</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link to={card.link} className="block mt-auto">
                      <Button 
                        variant="outline" 
                        className="w-full border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10 transition-colors"
                      >
                        {card.buttonText}
                      </Button>
                    </Link>
                  </>
                ) : (
                  // Desktop layout (horizontal) - reorganized
                  <div className="flex flex-col">
                    {/* Header with icon and title together */}
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-full ${card.iconBgClass} mr-2`}>
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-cormorant font-medium text-midnight-indigo">
                        {card.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-midnight-indigo/80 text-sm md:text-base mb-4">
                      {card.description}
                    </p>
                    
                    {/* Tools list */}
                    <div className="mb-5 flex-grow">
                      <p className="font-medium text-sm text-midnight-indigo mb-2">Includes Tools:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                        {card.tools.map((tool, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-midnight-indigo/50 mr-2"></span>
                            <span className="text-midnight-indigo/80">{tool}</span>
                          </div>
                        ))}
                        {card.comingSoonTools?.map((tool, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-midnight-indigo/50 mr-2"></span>
                            <span className="text-midnight-indigo/80 italic">{tool} <span className="text-xs text-midnight-indigo/60">(Coming Soon)</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Button at the bottom */}
                    <Link to={card.link} className="block">
                      <Button 
                        variant="outline" 
                        className="w-full border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10 transition-colors"
                      >
                        {card.buttonText}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default StillUsSection;
