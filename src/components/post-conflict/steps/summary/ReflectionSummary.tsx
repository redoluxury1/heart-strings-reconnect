
import React, { useState } from 'react';
import { HeartHandshake, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { Badge } from '@/components/ui/badge';
import { useReflectionAnalysis } from '@/hooks/useReflectionAnalysis';

const ReflectionSummary: React.FC = () => {
  const navigate = useNavigate();
  const { sessionData } = useSession();
  const [activeTab, setActiveTab] = useState<string>("side-by-side");
  const { matchedReflections } = useReflectionAnalysis(sessionData);
  
  // Extract the relevant data for display
  const partner1 = {
    tone: sessionData.partner1.responses.complete?.intent || "Unknown",
    perspective: sessionData.partner1.responses.complete?.perspective || "No perspective shared",
    wish: sessionData.partner1.responses.complete?.understanding || "No wishes shared",
    need: sessionData.partner1.responses.complete?.needs || "No needs shared",
    emotions: sessionData.partner1.responses.emotions || []
  };
  
  const partner2 = {
    tone: sessionData.partner2.responses.complete?.intent || "Unknown",
    perspective: sessionData.partner2.responses.complete?.perspective || "No perspective shared",
    wish: sessionData.partner2.responses.complete?.understanding || "No wishes shared",
    need: sessionData.partner2.responses.complete?.needs || "No needs shared",
    emotions: sessionData.partner2.responses.emotions || []
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
  
  const handleTalkTogether = () => {
    navigate('/reconnect');
  };
  
  const handleWriteLoveNote = () => {
    navigate('/love-notes');
  };
  
  const handlePlayGame = () => {
    navigate('/games');
  };
  
  const handleRetry = () => {
    // Navigate back to the beginning of the flow
    navigate('/post-conflict');
  };
  
  const renderEmotionBadges = (emotions: string[]) => {
    if (!emotions || emotions.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {emotions.map((emotion, index) => (
          <Badge 
            key={index}
            className="bg-[#F3DFD7] text-[#A05A45] hover:bg-[#F3DFD7]"
          >
            {emotion}
          </Badge>
        ))}
      </div>
    );
  };

  // Render a reflection card
  const renderReflectionCard = (reflection: any) => (
    <Card className="mb-4 bg-[#F8F5F3] border-[#D9B9AF]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#2C2C2C]">{reflection.insight}</CardTitle>
        <CardDescription className="text-[#65595D] italic">Relationship Insight</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[#3A3A3A] leading-relaxed">{reflection.reflection}</p>
        <div className="pt-2 border-t border-[#E8DAD3]">
          <h4 className="font-medium text-[#2C2C2C] mb-1">Try this:</h4>
          <p className="text-[#3A3A3A]">{reflection.recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <HeartHandshake className="h-8 w-8 text-[#D3876A]" strokeWidth={1.5} />
        </div>
        
        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-2 text-center">
          You both showed up.
        </h2>
        
        {/* Subheader */}
        <p className="text-center text-[#3A3A3A] mb-8 max-w-xl">
          Here's a side-by-side look at how each of you experienced the moment—and how to move forward.
        </p>
        
        {/* Main Content */}
        <div className="w-full mb-8">
          <Tabs
            defaultValue="side-by-side"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              <TabsTrigger value="tabbed">Partner Tabs</TabsTrigger>
            </TabsList>
            
            {/* Side-by-Side View */}
            <TabsContent value="side-by-side" className="w-full">
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
                    
                    {renderEmotionBadges(partner1.emotions)}
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
                    
                    {renderEmotionBadges(partner2.emotions)}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Tabbed View */}
            <TabsContent value="tabbed" className="w-full">
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
                      
                      {renderEmotionBadges(partner1.emotions)}
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
                      
                      {renderEmotionBadges(partner2.emotions)}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Shared Insight Section */}
        <Card className="w-full mb-6 bg-[#F8F5F3] border-[#D9B9AF]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#2C2C2C]">Shared Insight</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#3A3A3A]">{sharedInsight}</p>
          </CardContent>
        </Card>
        
        {/* Therapist Reflection Cards - NEW SECTION */}
        {matchedReflections.length > 0 && (
          <div className="w-full mb-8">
            <h3 className="font-medium text-[#2C2C2C] mb-4">Relationship Insights</h3>
            {matchedReflections.map((reflection, index) => (
              renderReflectionCard(reflection)
            ))}
          </div>
        )}
        
        {/* CTA Section */}
        <div className="w-full">
          <h3 className="font-medium text-[#2C2C2C] text-center mb-4">Next Steps</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleTalkTogether}
              className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full flex items-center"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Talk This Through Together
            </Button>
            
            <Button
              onClick={handleWriteLoveNote}
              className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white rounded-full flex items-center"
            >
              <Heart className="mr-2 h-4 w-4" />
              Write a Love Note
            </Button>
            
            <Button
              variant="outline"
              onClick={handlePlayGame}
              className="border-[#5D3A5A] text-[#5D3A5A] hover:bg-[#5D3A5A]/10 bg-transparent rounded-full"
            >
              Play Would You Rather
            </Button>
            
            <Button
              variant="outline"
              onClick={handleRetry}
              className="border-[#D3876A] text-[#D3876A] hover:bg-[#D3876A]/10 bg-transparent rounded-full flex items-center"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Let's Try That Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionSummary;
