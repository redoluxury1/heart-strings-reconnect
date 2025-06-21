
import React, { useState } from 'react';
import { ChevronDown, Gamepad2, Compass, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import WouldYouRatherGame from '@/components/games/would-you-rather/WouldYouRatherGame';
import DateWheel from '@/components/games/date-wheel/DateWheel';
import LetsTalkAboutUs from '@/components/games/lets-talk-about-us/LetsTalkAboutUs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Reconnect = () => {
  const [currentTab, setCurrentTab] = useState<string>("would-you-rather");
  
  // Activity options with icons and labels
  const activities = {
    'would-you-rather': {
      label: 'Would You Rather Game',
      icon: <Gamepad2 className="h-4 w-4" />,
      description: 'Have fun discovering each other\'s preferences and see how well you know one another.'
    },
    'date-wheel': {
      label: 'Date Night Wheel',
      icon: <Compass className="h-4 w-4" />,
      description: 'Spin the wheel to discover your next adventure together.'
    },
    'lets-talk-about-us': {
      label: 'Let\'s Talk About Us',
      icon: <MessageSquare className="h-4 w-4" />,
      description: 'Meaningful conversation starters to deepen your connection.'
    }
  };

  const currentActivity = activities[currentTab];
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-12">
        <ContentContainer maxWidth="full">
          <h1 className="text-4xl md:text-5xl font-cormorant font-medium text-midnight-indigo text-center mb-3">
            Reconnect & Have Fun
          </h1>
          
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Grow closer with these playful activities designed to help you learn about each other and create new memories.
          </p>
          
          {/* Activity Selector Dropdown */}
          <div className="flex justify-center mb-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 border border-midnight-indigo/30 bg-soft-cream hover:bg-soft-cream/80 text-midnight-indigo shadow-sm min-w-[280px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    {currentActivity.icon}
                    <span>{currentActivity.label}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-soft-cream border border-midnight-indigo/20 shadow-lg z-50 p-1">
                {Object.entries(activities).map(([key, activity]) => (
                  <DropdownMenuItem 
                    key={key}
                    className={`flex items-start gap-3 py-4 px-3 cursor-pointer transition-colors rounded-md ${
                      currentTab === key 
                        ? 'bg-midnight-indigo text-soft-cream' 
                        : 'text-midnight-indigo hover:bg-terracotta/10 hover:text-midnight-indigo focus:bg-terracotta/10 focus:text-midnight-indigo'
                    }`}
                    onClick={() => setCurrentTab(key)}
                  >
                    <div className="mt-1">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">{activity.label}</div>
                      <div className={`text-xs ${
                        currentTab === key ? 'text-soft-cream/80' : 'text-gray-600'
                      }`}>
                        {activity.description}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Activity Content */}
          <div className="w-full max-w-4xl mx-auto">
            {currentTab === "would-you-rather" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-midnight-indigo text-center mb-4">
                  Would You Rather: Couples Edition
                </h2>
                
                <p className="text-center text-gray-600 mb-8">
                  Have fun discovering each other's preferences and see how well you know one another.
                </p>
                
                <WouldYouRatherGame />
              </div>
            )}
            
            {currentTab === "date-wheel" && <DateWheel />}
            
            {currentTab === "lets-talk-about-us" && <LetsTalkAboutUs />}
          </div>
        </ContentContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reconnect;
