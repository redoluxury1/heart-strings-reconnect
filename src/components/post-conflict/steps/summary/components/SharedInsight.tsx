
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SessionData } from '@/components/post-conflict/context/SessionContext';

interface SharedInsightProps {
  sessionData: SessionData;
}

const SharedInsight: React.FC<SharedInsightProps> = ({ sessionData }) => {
  // Extract the relevant data for display
  const partner1 = useMemo(() => ({
    emotions: sessionData.partner1.responses.emotions || [],
    tone: sessionData.partner1.responses.complete?.intent || "Unknown",
    need: sessionData.partner1.responses.complete?.needs || "",
    perspective: sessionData.partner1.responses.complete?.perspective || ""
  }), [sessionData.partner1]);
  
  const partner2 = useMemo(() => ({ 
    emotions: sessionData.partner2.responses.emotions || [],
    tone: sessionData.partner2.responses.complete?.intent || "Unknown",
    need: sessionData.partner2.responses.complete?.needs || "",
    perspective: sessionData.partner2.responses.complete?.perspective || ""
  }), [sessionData.partner2]);
  
  // Generate more intelligent shared insights
  const generateSharedInsight = () => {
    const allText = `${partner1.perspective} ${partner1.need} ${partner1.tone} ${partner2.perspective} ${partner2.need} ${partner2.tone}`.toLowerCase();
    
    // Check for shared emotions first
    const partner1Emotions = partner1.emotions || [];
    const partner2Emotions = partner2.emotions || [];
    const sharedEmotions = partner1Emotions.filter(emotion => 
      partner2Emotions.includes(emotion)
    );
    
    if (sharedEmotions.length > 0) {
      return `You both felt ${sharedEmotions.join(' and ')} during this conversation. Recognizing these shared emotions creates a foundation for understanding and moving forward together.`;
    }
    
    // Check for trust-related themes
    if (allText.includes('trust') || allText.includes('believe') || allText.includes('promise')) {
      return "Trust seems to be at the heart of this conversation. Both of your perspectives matter when rebuilding that foundation together.";
    }
    
    // Check for listening/hearing themes
    if (allText.includes('listen') || allText.includes('hear') || allText.includes('understand')) {
      return "You both expressed wanting to be heard and understood. That shared need for connection is something you can build on.";
    }
    
    // Check for effort/help themes
    if (allText.includes('help') || allText.includes('effort') || allText.includes('support')) {
      return "Both of you seem to care about supporting each other, even if you're not aligned on how that looks. That care is worth celebrating.";
    }
    
    // Check for space/overwhelm themes
    if (allText.includes('space') || allText.includes('overwhelm') || allText.includes('too much')) {
      return "You both seem to need different things right now—and that's okay. Creating space for those different needs is part of loving each other well.";
    }
    
    // Check for respect themes
    if (allText.includes('respect') || allText.includes('value') || allText.includes('important')) {
      return "Feeling respected and valued matters to both of you. That shared priority can guide how you move forward from here.";
    }
    
    // Default insight that acknowledges showing up
    return "You each came to this conversation with your own emotional experience—that's completely normal. What matters most is that you both showed up to work through it together.";
  };
  
  const sharedInsight = generateSharedInsight();

  return (
    <Card className="w-full mb-6 bg-[#F8F5F3] border-[#D9B9AF]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#2C2C2C]">What You Share</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[#3A3A3A]">{sharedInsight}</p>
      </CardContent>
    </Card>
  );
};

export default SharedInsight;
