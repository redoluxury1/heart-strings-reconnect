
import React from 'react';
import { LucideIcon } from 'lucide-react';
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
}

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  toggleFeature: (featureId: string) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, isSelected, toggleFeature }) => {
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
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-soft-blush">
              {feature.icon}
            </div>
            <div>
              <CardTitle className="text-xl font-cormorant font-medium text-midnight-indigo">
                {feature.title}
                {feature.comingSoon && (
                  <span className="text-sm font-inter ml-2 text-mauve-rose/80">
                    (Coming Soon)
                  </span>
                )}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-midnight-indigo/80 mb-5">
            {feature.description}
          </CardDescription>
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
              {isSelected ? "Close Tool" : feature.comingSoon ? "Join Waitlist" : "Open Tool"}
            </Button>
          </CollapsibleTrigger>
        </CardContent>
      </Card>
      
      {/* Tool content */}
      <CollapsibleContent className="mt-4 bg-white rounded-lg shadow-md p-6 border border-lavender-blue/20 overflow-hidden animate-accordion-down">
        <div className="text-center text-midnight-indigo/80">
          Tool content for {feature.title} will appear here.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FeatureCard;
