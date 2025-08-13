import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { healingPhrases, healingPhrasesByCategory, positiveInteractions } from '@/data/communication/healing-phrases';
import { Heart, Shield, HandHeart, Smile, Pause, User, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categoryIcons = {
  'de-escalation': <Shield className="h-4 w-4" />,
  'validation': <Heart className="h-4 w-4" />,
  'responsibility': <User className="h-4 w-4" />,
  'affection': <HandHeart className="h-4 w-4" />,
  'humor': <Smile className="h-4 w-4" />,
  'break': <Pause className="h-4 w-4" />
};

const categoryDescriptions = {
  'de-escalation': 'Calm down heated conversations',
  'validation': 'Show understanding and empathy',
  'responsibility': 'Take ownership of your part',
  'affection': 'Reconnect emotionally',
  'humor': 'Lighten the mood appropriately',
  'break': 'Pause when overwhelmed'
};

export const HealingPhrasesLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('de-escalation');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast({
        title: "Copied to clipboard",
        description: "Repair phrase copied successfully"
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Could not copy",
        description: "Please copy the text manually"
      });
    }
  };

  const toneColors = {
    gentle: 'secondary',
    sincere: 'default', 
    warm: 'outline',
    light: 'secondary'
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Healing Phrases Library</h2>
        <p className="text-muted-foreground">
          Research-backed phrases to repair and strengthen your relationship (5:1 positive ratio)
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto p-1 mb-8">
          {Object.keys(categoryIcons).map((category) => (
            <TabsTrigger key={category} value={category} className="flex items-center justify-center space-x-1 h-12 px-3 py-2 text-sm">
              {categoryIcons[category as keyof typeof categoryIcons]}
              <span className="hidden sm:inline capitalize text-xs">{category.replace('-', ' ')}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(healingPhrasesByCategory).map(([category, phrases]) => (
          <TabsContent key={category} value={category}>
            <Card className="p-6">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                  <h3 className="text-lg font-semibold text-foreground capitalize">
                    {category.replace('-', ' ')} Phrases
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                </p>
              </div>

                <div className="grid gap-4">
                  {phrases.map((phrase) => (
                    <Card key={phrase.id} className="p-4 hover:bg-accent transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-foreground font-medium mb-2">
                              "{phrase.phrase}"
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Best for: {phrase.situation}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(phrase.phrase, phrase.id)}
                            className="ml-2"
                          >
                            {copiedId === phrase.id ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant={toneColors[phrase.tone] as any}>
                            {phrase.tone} tone
                          </Badge>
                          {phrase.researchBacked && (
                            <Badge variant="outline">
                              Research-backed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Positive Interactions Section */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Daily Positive Interactions</span>
          </h3>
          <p className="text-muted-foreground mt-1">
            Build your 5:1 positive-to-negative ratio with these appreciation starters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {positiveInteractions.map((interaction, index) => (
            <Card 
              key={index} 
              className="p-3 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => copyToClipboard(interaction, `positive-${index}`)}
            >
              <div className="flex items-center justify-between">
                <p className="text-foreground">"{interaction}"</p>
                {copiedId === `positive-${index}` ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};