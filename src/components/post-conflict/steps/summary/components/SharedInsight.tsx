
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SessionData } from '@/components/post-conflict/context/SessionContext';
import { PartnerData } from '../types/partner-data';

interface SharedInsightProps {
  sessionData: SessionData;
}

const SharedInsight: React.FC<SharedInsightProps> = ({ sessionData }) => {
  // Extract the relevant data for display
  const partner1 = useMemo(() => ({
    emotions: sessionData.partner1.responses.emotions || [],
    tone: sessionData.partner1.responses.complete?.intent || "Unknown",
    need: sessionData.partner1.responses.complete?.needs || ""
  }), [sessionData.partner1]);
  
  const partner2 = useMemo(() => ({ 
    emotions: sessionData.partner2.responses.emotions || [],
    tone: sessionData.partner2.responses.complete?.intent || "Unknown",
    need: sessionData.partner2.responses.complete?.needs || ""
  }), [sessionData.partner2]);
  
  // Generate the shared insight based on the data
  const generateSharedInsight = () => {
    // Check for shared emotions
    const partner1Emotions = partner1.emotions || [];
    const partner2Emotions = partner2.emotions || [];
    const sharedEmotions = partner1Emotions.filter(emotion => 
      partner2Emotions.includes(emotion)
    );
    
    if (sharedEmotions.length > 0) {
      return `You both felt ${sharedEmotions.join(' and ')} during this conversation. Naming these shared emotions creates a foundation for understanding.`;
    }
    
    // Check for similar intentions in tone
    const tone1 = partner1.tone.toLowerCase();
    const tone2 = partner2.tone.toLowerCase();
    
    if (tone1.includes('listen') && tone2.includes('listen')) {
      return "You both expressed a desire to listen to each other. This shared intention is a powerful starting point for connection.";
    }
    
    if ((tone1.includes('understand') || tone1.includes('perspective')) && 
        (tone2.includes('understand') || tone2.includes('perspective'))) {
      return "You both want to understand each other's perspectives. That openness to see things differently is key to moving forward together.";
    }
    
    // Check for similarities in needs
    const need1 = partner1.need.toLowerCase();
    const need2 = partner2.need.toLowerCase();
    
    if ((need1.includes('listen') || need1.includes('hear')) && 
        (need2.includes('listen') || need2.includes('hear'))) {
      return "You both expressed a need to be heard. Creating space for each other to speak and truly listen is essential for connection.";
    }
    
    if (need1.includes('respect') && need2.includes('respect')) {
      return "You both highlighted respect as important. Building on this shared value will strengthen your relationship.";
    }
    
    if (need1.includes('time') && need2.includes('time')) {
      return "You both mentioned needing time. Recognizing this shared need can help you create a healthy pace for working through challenges.";
    }
    
    // Default insight based on showing up
    return "You each came to this conversation with your own emotional needs—that's completely normal. What matters now is that you both showed up to work through it together.";
  };
  
  const sharedInsight = generateSharedInsight();

  return (
    <Card className="w-full mb-6 bg-[#F8F5F3] border-[#D9B9AF]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#2C2C2C]">Shared Insight</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[#3A3A3A]">{sharedInsight}</p>
      </CardContent>
    </Card>
  );
};

export default SharedInsight;
