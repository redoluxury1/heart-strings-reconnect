
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartnerData } from '../types/partner-data';
import EmotionBadges from './EmotionBadges';

interface SideBySideViewProps {
  partner1: PartnerData;
  partner2: PartnerData;
}

const SideBySideView: React.FC<SideBySideViewProps> = ({ partner1, partner2 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Your Perspective */}
      <Card className="border-[#D3876A]">
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
      
      {/* Partner's Perspective */}
      <Card className="border-[#5D3A5A]">
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
    </div>
  );
};

export default SideBySideView;
