
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon: boolean;
  alwaysVisible: boolean;
  microtext?: string;
  customTitle?: boolean;
}

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  toggleFeature: (featureId: string) => void;
  customContent?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, isSelected, toggleFeature, customContent }) => {
  return (
    <Collapsible 
      open={isSelected} 
      onOpenChange={() => !feature.comingSoon && toggleFeature(feature.id)}
    >
      <Card 
        className={`border border-white shadow-md hover:shadow-lg transition-all duration-300 ${
          feature.comingSoon ? 'bg-white/70' : 'bg-white'
        } ${isSelected ? 'ring-2 ring-lavender-blue' : ''}`}
      >
        <CardHeader className="pb-2">
          {feature.customTitle ? (
            // Custom title styling for What's Really Going On? feature - adjusted for mobile
            <div className="relative font-cormorant text-center my-4">
              <div className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight relative z-10">
                <span className="text-lavender-blue">What's</span>
                <span className="mx-1 md:mx-2 text-mauve-rose">Really</span>
                <span className="text-lavender-blue">Going On?</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-full h-[30%] bg-gradient-to-r from-lavender-blue/10 via-mauve-rose/10 to-lavender-blue/10 blur-md rounded-full"></div>
              </div>
            </div>
          ) : (
            // Normal title with icon for other features
            <div className="flex items-center space-x-3">
              {feature.icon && (
                <div className="p-2 rounded-full bg-soft-blush">
                  {feature.icon}
                </div>
              )}
              <div>
                <CardTitle className="text-xl font-cormorant font-medium text-midnight-indigo">
                  {feature.title}
                </CardTitle>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <CardDescription className="text-midnight-indigo/80 mb-5">
            {feature.description}
          </CardDescription>
          
          {feature.microtext && (
            <p className="text-xs text-midnight-indigo/60 italic text-center mb-2">
              {feature.microtext}
            </p>
          )}
          
          <CollapsibleTrigger asChild disabled={feature.comingSoon}>
            <Button
              variant={feature.comingSoon ? "outline" : "default"}
              className={`w-full ${
                feature.comingSoon
                  ? "border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10"
                  : "bg-lavender-blue hover:bg-lavender-blue/90 text-white"
              }`}
              disabled={feature.comingSoon}
            >
              {isSelected ? "Close Tool" : feature.comingSoon ? "Become a Founding Expert" : "Open Tool"}
            </Button>
          </CollapsibleTrigger>
        </CardContent>
      </Card>
      
      {/* Tool content */}
      <CollapsibleContent className="mt-4 bg-white rounded-lg shadow-md p-6 border border-lavender-blue/20 overflow-hidden animate-accordion-down">
        {customContent || (
          <div className="text-center text-midnight-indigo/80">
            Tool content for {feature.title} will appear here.
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FeatureCard;
