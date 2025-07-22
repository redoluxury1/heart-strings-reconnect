import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { fourHorsemen, horsemanPatterns, type FourHorseman } from '@/data/gottman/four-horsemen';
import { AlertTriangle, Shield, Lightbulb, Heart } from 'lucide-react';

export const FourHorsemenDetector: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [detectedHorsemen, setDetectedHorsemen] = useState<FourHorseman[]>([]);
  const [selectedHorseman, setSelectedHorseman] = useState<FourHorseman | null>(null);

  const detectHorsemen = () => {
    const detected: FourHorseman[] = [];
    const lowerText = inputText.toLowerCase();

    fourHorsemen.forEach(horseman => {
      const patterns = horsemanPatterns[horseman.id];
      if (patterns.some(pattern => pattern.test(lowerText))) {
        detected.push(horseman);
      }
    });

    setDetectedHorsemen(detected);
  };

  const horsemanIcons = {
    criticism: <AlertTriangle className="h-5 w-5" />,
    contempt: <AlertTriangle className="h-5 w-5" />,
    defensiveness: <Shield className="h-5 w-5" />,
    stonewalling: <Heart className="h-5 w-5" />
  };

  const horsemanColors = {
    criticism: 'destructive',
    contempt: 'destructive', 
    defensiveness: 'warning',
    stonewalling: 'secondary'
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Four Horsemen Detector</h2>
        <p className="text-muted-foreground">
          Based on Dr. John Gottman's research on relationship communication patterns
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Enter your conversation or message:
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type what you said or heard during the conflict..."
              className="min-h-24"
            />
          </div>
          
          <Button onClick={detectHorsemen} disabled={!inputText.trim()}>
            <Lightbulb className="h-4 w-4 mr-2" />
            Analyze Communication Pattern
          </Button>
        </div>

        {detectedHorsemen.length > 0 && (
          <div className="mt-6 space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Detected {detectedHorsemen.length} communication pattern(s) that may harm your relationship.
              </AlertDescription>
            </Alert>

            <div className="grid gap-3">
              {detectedHorsemen.map((horseman) => (
                <Card 
                  key={horseman.id} 
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setSelectedHorseman(horseman)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {horsemanIcons[horseman.id]}
                      <div>
                        <h3 className="font-semibold text-foreground">{horseman.name}</h3>
                        <p className="text-sm text-muted-foreground">{horseman.description}</p>
                      </div>
                    </div>
                    <Badge variant={horsemanColors[horseman.id] as any}>
                      Detected
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Manual Selection */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Or select what you're experiencing:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fourHorsemen.map((horseman) => (
            <Button
              key={horseman.id}
              variant="outline"
              className="h-auto p-4 justify-start text-left min-h-[100px]"
              onClick={() => setSelectedHorseman(horseman)}
            >
              <div className="flex items-start space-x-3 w-full">
                {horsemanIcons[horseman.id]}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">{horseman.name}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed break-words">
                    {horseman.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Horseman Details */}
      {selectedHorseman && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {horsemanIcons[selectedHorseman.id]}
              <h3 className="text-xl font-semibold text-foreground">
                {selectedHorseman.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Description:</h4>
                <p className="text-muted-foreground">{selectedHorseman.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Common Examples:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedHorseman.examples.map((example, index) => (
                    <li key={index} className="text-muted-foreground">{example}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Warning Signs:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedHorseman.warningSigns.map((sign, index) => (
                    <li key={index} className="text-muted-foreground">{sign}</li>
                  ))}
                </ul>
              </div>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Antidote:</strong> {selectedHorseman.antidote}
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-medium text-foreground mb-2">Try These Repair Phrases:</h4>
                <div className="grid gap-2">
                  {selectedHorseman.repairPhrases.map((phrase, index) => (
                    <Card key={index} className="p-3">
                      <p className="text-foreground">"{phrase}"</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};