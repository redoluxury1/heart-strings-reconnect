import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FourHorsemenDetector } from './FourHorsemenDetector';
import { RepairAttemptsLibrary } from './RepairAttemptsLibrary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Shield, Heart, Info } from 'lucide-react';

export const GottmanMethodHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Research-Based Relationship Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Research-backed tools to strengthen your relationship communication
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center space-x-1 px-2">
            <Info className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="detector" className="flex items-center space-x-1 px-2">
            <Shield className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Detector</span>
          </TabsTrigger>
          <TabsTrigger value="repair" className="flex items-center space-x-1 px-2">
            <Heart className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Repair Library</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <Alert>
              <BookOpen className="h-4 w-4" />
              <AlertDescription>
                These tools are based on Dr. John Gottman's 40+ years of relationship research, 
                with over 94% accuracy in predicting relationship success.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Four Horsemen Detector</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Identify and address the four communication patterns that predict relationship failure:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                  <li>Criticism - attacking character vs. behavior</li>
                  <li>Contempt - superiority and disrespect</li>
                  <li>Defensiveness - playing victim</li>
                  <li>Stonewalling - emotional withdrawal</li>
                </ul>
                <Button onClick={() => setActiveTab('detector')}>
                  Start Detector
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Repair Attempts Library</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Access research-backed phrases to repair conversations and maintain the critical 5:1 positive-to-negative ratio.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                  <li>De-escalation phrases</li>
                  <li>Validation techniques</li>
                  <li>Responsibility statements</li>
                  <li>Affection & connection builders</li>
                </ul>
                <Button onClick={() => setActiveTab('repair')}>
                  Browse Library
                </Button>
              </Card>
            </div>

            <Card className="p-6 bg-accent">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Key Research Findings:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Magic Ratio</h4>
                  <p className="text-muted-foreground">
                    Successful couples maintain a 5:1 ratio of positive to negative interactions, 
                    even during conflict.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Repair Attempts</h4>
                  <p className="text-muted-foreground">
                    Successful couples use repair attempts - any statement or action that prevents 
                    negativity from escalating.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Emotional Flooding</h4>
                  <p className="text-muted-foreground">
                    When heart rate exceeds 100 bpm during conflict, take a 20+ minute break 
                    to self-soothe and return regulated.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Antidotes Work</h4>
                  <p className="text-muted-foreground">
                    Each of the Four Horsemen has a specific antidote that can reverse 
                    the harmful pattern when consistently applied.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detector">
          <FourHorsemenDetector />
        </TabsContent>

        <TabsContent value="repair">
          <RepairAttemptsLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
};