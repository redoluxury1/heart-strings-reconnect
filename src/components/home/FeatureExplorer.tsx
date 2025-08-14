import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, BookOpen, Heart, Timer, MessageSquare, Sparkles } from 'lucide-react';
import ContentContainer from '@/components/common/ContentContainer';

const FeatureExplorer = () => {
  const features = [
    {
      id: 'mid-fight',
      title: 'Mid-Fight Tools',
      icon: <MessageCircle className="w-5 h-5" />,
      description: 'De-escalate conflicts in real-time with proven techniques',
      tools: [
        'Code Word Timer - Pause arguments safely with customizable timeouts',
        'Let\'s Try That Again - Rephrase heated words into loving communication',
        'What\'s Really Going On? - Decode emotions and uncover real issues',
        'Color Healing Method - Visual techniques to calm and center yourself'
      ]
    },
    {
      id: 'post-conflict',
      title: 'Post-Conflict Reflection',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Process and heal after disagreements with guided reflection',
      tools: [
        'Guided Reflection Questions - Understand what happened and why',
        'Emotion Processing Tools - Work through feelings in a healthy way',
        'Pattern Recognition - Identify recurring conflict triggers',
        'Healing Exercises - Rebuild trust and connection after arguments'
      ]
    },
    {
      id: 'reconnect',
      title: 'Reconnection Tools',
      icon: <Heart className="w-5 h-5" />,
      description: 'Rebuild intimacy and strengthen your bond',
      tools: [
        'Connection Activities - Fun exercises to bring you closer',
        'Appreciation Practices - Daily ways to show love and gratitude',
        'Intimacy Builders - Emotional and physical reconnection tools',
        'Love Language Exercises - Speak each other\'s love language better'
      ]
    }
  ];

  return (
    <section className="py-12 bg-soft-cream/30">
      <ContentContainer maxWidth="2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Explore All Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the comprehensive toolkit designed to strengthen your relationship at every stage
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-elegant border border-border/20 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {features.map((feature, index) => (
              <AccordionItem 
                key={feature.id} 
                value={feature.id}
                className={`border-b border-border/10 ${index === features.length - 1 ? 'border-b-0' : ''}`}
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="ml-14 space-y-3">
                    <p className="text-muted-foreground mb-4">
                      This section includes:
                    </p>
                    <div className="grid gap-3">
                      {feature.tools.map((tool, toolIndex) => (
                        <div 
                          key={toolIndex}
                          className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-foreground">{tool}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        Premium Feature
                      </div>
                      <p className="text-xs text-primary/80 mt-1">
                        Unlock this toolkit with Bridge For Couples Premium
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Ready to strengthen your relationship?
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg">
            Start Your Free Trial
          </button>
        </div>
      </ContentContainer>
    </section>
  );
};

export default FeatureExplorer;