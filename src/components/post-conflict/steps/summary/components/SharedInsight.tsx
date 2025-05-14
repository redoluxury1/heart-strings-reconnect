
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SessionData } from '@/components/post-conflict/context/SessionContext';

interface SharedInsightProps {
  sessionData: SessionData;
}

const SharedInsight: React.FC<SharedInsightProps> = ({ sessionData }) => {
  // Extract the relevant data for display
  const partner1 = {
    emotions: sessionData.partner1.responses.emotions || [],
    tone: sessionData.partner1.responses.complete?.intent || "Unknown",
    need: sessionData.partner1.responses.complete?.needs || ""
  };
  
  const partner2 = {
    emotions: sessionData.partner2.responses.emotions || [],
    tone: sessionData.partner2.responses.complete?.intent || "Unknown",
    need: sessionData.partner2.responses.complete?.needs || ""
  };
  
  // Generate the shared insight based on the data
  const generateSharedInsight = () => {
    // Check for shared emotions
    const partner1Emotions = partner1.emotions || [];
    const partner2Emotions = partner2.emotions || [];
    const sharedEmotions = partner1Emotions.filter(emotion => 
      partner2Emotions.includes(emotion)
    );
    
    if (sharedEmotions.length > 0) {
      return `You both felt ${sharedEmotions[0]} during this. Naming it is a step toward clarity.`;
    }
    
    // Check for shared tone
    if (partner1.tone === partner2.tone) {
      return "You both approached this with the same intention. That's a great foundation for moving forward.";
    }
    
    // Check for similarities in needs
    if (partner1.need.toLowerCase().includes("listen") && 
        partner2.need.toLowerCase().includes("listen")) {
      return "You both expressed a need to be listened to. Creating space for each other is key.";
    }
    
    // Default insight
    return "You each had different emotional needs in this moment—that's common. What matters now is listening with care.";
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
