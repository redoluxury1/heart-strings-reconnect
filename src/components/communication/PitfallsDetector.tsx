import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { communicationPitfalls, pitfallPatterns, type CommunicationPitfall } from '@/data/communication/pitfalls';
import { AlertTriangle, Shield, Lightbulb, Heart } from 'lucide-react';

export const PitfallsDetector: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [detectedPitfalls, setDetectedPitfalls] = useState<CommunicationPitfall[]>([]);
  const [selectedPitfall, setSelectedPitfall] = useState<CommunicationPitfall | null>(null);

  const detectPitfalls = () => {
    const detected: CommunicationPitfall[] = [];
    const text = inputText.toLowerCase();

    communicationPitfalls.forEach(pitfall => {
      const patterns = pitfallPatterns[pitfall.id];
      const isDetected = patterns.some(pattern => pattern.test(text));
      if (isDetected) {
        detected.push(pitfall);
      }
    });

    setDetectedPitfalls(detected);
    if (detected.length > 0) {
      setSelectedPitfall(detected[0]);
    }
  };

  const pitfallIcons = {
    criticism: <AlertTriangle className="h-5 w-5" />,
    contempt: <AlertTriangle className="h-5 w-5" />,
    defensiveness: <Shield className="h-5 w-5" />,
    stonewalling: <Heart className="h-5 w-5" />
  };

  const pitfallColors = {
    criticism: 'destructive',
    contempt: 'destructive', 
    defensiveness: 'warning',
    stonewalling: 'secondary'
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Communication Pitfalls Detector</h2>
        <p className="text-muted-foreground">
          Identify destructive communication patterns that can harm relationships
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
          
          <Button onClick={detectPitfalls} disabled={!inputText.trim()}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Analyze Text
          </Button>
        </div>

        {detectedPitfalls.length > 0 && (
          <div className="mt-6 space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Detected {detectedPitfalls.length} communication pattern(s) that may harm your relationship.
              </AlertDescription>
            </Alert>

            <div className="grid gap-3">
              {detectedPitfalls.map((pitfall) => (
                <Card 
                  key={pitfall.id} 
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setSelectedPitfall(pitfall)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {pitfallIcons[pitfall.id]}
                      <div>
                        <h3 className="font-semibold text-foreground">{pitfall.name}</h3>
                        <p className="text-sm text-muted-foreground">{pitfall.description}</p>
                      </div>
                    </div>
                    <Badge variant={pitfallColors[pitfall.id] as any}>
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
          {communicationPitfalls.map((pitfall) => (
            <Button
              key={pitfall.id}
              variant="outline"
              className="h-auto p-3 justify-start text-left min-h-[140px] w-full"
              onClick={() => setSelectedPitfall(pitfall)}
            >
              <div className="flex items-start space-x-2 w-full max-w-full">
                <div className="flex-shrink-0 mt-0.5">
                  {pitfallIcons[pitfall.id]}
                </div>
                <div className="flex-1 min-w-0 max-w-full">
                  <div className="font-medium text-sm mb-2">{pitfall.name}</div>
                  <p className="text-xs text-muted-foreground leading-4 whitespace-normal word-wrap break-words overflow-wrap-anywhere">
                    {pitfall.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Pitfall Details */}
      {selectedPitfall && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {pitfallIcons[selectedPitfall.id]}
              <h3 className="text-xl font-semibold text-foreground">
                {selectedPitfall.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Description:</h4>
                <p className="text-muted-foreground">{selectedPitfall.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Common Examples:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedPitfall.examples.map((example, index) => (
                    <li key={index} className="text-muted-foreground">{example}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Warning Signs:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedPitfall.warningSigns.map((sign, index) => (
                    <li key={index} className="text-muted-foreground">{sign}</li>
                  ))}
                </ul>
              </div>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Antidote:</strong> {selectedPitfall.antidote}
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-medium text-foreground mb-2">Try These Repair Phrases:</h4>
                <div className="grid gap-2">
                  {selectedPitfall.repairPhrases.map((phrase, index) => (
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