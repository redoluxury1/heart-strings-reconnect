
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PartnerData } from '../types/partner-data';
import EmotionBadges from './EmotionBadges';

interface TabbedViewProps {
  partner1: PartnerData;
  partner2: PartnerData;
}

const TabbedView: React.FC<TabbedViewProps> = ({ partner1, partner2 }) => {
  return (
    <Tabs defaultValue="you" className="w-full">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="you" className="flex-1">You</TabsTrigger>
        <TabsTrigger value="partner" className="flex-1">Partner</TabsTrigger>
      </TabsList>
      
      {/* Your Tab */}
      <TabsContent value="you">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#2C2C2C]">Your Perspective</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-[#3A3A3A]">Your tone:</h4>
              <p className="text-[#5D5D5D]">{partner1.tone}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-[#3A3A3A]">From your perspective:</h4>
              <p className="text-[#5D5D5D]">{partner1.perspective}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-[#3A3A3A]">What you wish was understood:</h4>
              <p className="text-[#5D5D5D]">{partner1.wish}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-[#3A3A3A]">What you need to move forward:</h4>
              <p className="text-[#5D5D5D]">{partner1.need}</p>
            </div>
            
            <EmotionBadges emotions={partner1.emotions} />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Partner Tab */}
      <TabsContent value="partner">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#2C2C2C]">Your Partner's Perspective</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-[#3A3A3A]">Their tone:</h4>
              <p className="text-[#5D5D5D]">{partner2.tone}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-[#3A3A3A]">From their perspective:</h4>
              <p className="text-[#5D5D5D]">{partner2.perspective}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-[#3A3A3A]">What they wish was understood:</h4>
              <p className="text-[#5D5D5D]">{partner2.wish}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-[#3A3A3A]">What they need to move forward:</h4>
              <p className="text-[#5D5D5D]">{partner2.need}</p>
            </div>
            
            <EmotionBadges emotions={partner2.emotions} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabbedView;
