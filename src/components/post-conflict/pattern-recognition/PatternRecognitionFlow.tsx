
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '../context/SessionContext';
import { reconnectionTips } from '@/data/reconnection-tips';

const commonPatterns = [
  {
    id: 1,
    name: "Criticism-Defensiveness Cycle",
    description: "One partner criticizes, the other becomes defensive, leading to escalation.",
    examples: ["You always...", "You never...", "Why can't you just..."],
    breakingTips: [
      "Try using 'I' statements instead of 'you' statements",
      "Take a break when you notice this pattern starting",
      "Ask clarifying questions instead of defending immediately"
    ]
  },
  {
    id: 2,
    name: "Stonewalling-Pursuit Cycle",
    description: "One partner withdraws, the other pursues, creating a distance-closeness struggle.",
    examples: ["Silent treatment", "Walking away mid-conversation", "Constant checking in"],
    breakingTips: [
      "Agree on a specific time to return to the conversation",
      "Practice self-soothing during breaks",
      "Use gentle startups when re-engaging"
    ]
  },
  {
    id: 3,
    name: "Contempt-Contempt Cycle",
    description: "Partners exchange hostile humor, sarcasm, name-calling, or disrespectful body language.",
    examples: ["Eye-rolling", "Mockery", "Hostile humor"],
    breakingTips: [
      "Build a culture of appreciation",
      "Express needs directly without contempt",
      "Focus on the underlying feelings beneath contempt"
    ]
  }
];

const PatternRecognitionFlow: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [isShowingTips, setIsShowingTips] = useState(false);
  const { sessionData } = useSession();
  const { toast } = useToast();
  
  const handlePatternSelect = (patternId: number) => {
    setSelectedPattern(patternId);
    
    // In a real app, this would save the pattern to the user's data
    toast({
      title: "Pattern identified",
      description: "We've noted this pattern in your relationship."
    });
  };
  
  const handleShowReconnectionTips = () => {
    setIsShowingTips(true);
  };
  
  const handleGoBack = () => {
    if (isShowingTips) {
      setIsShowingTips(false);
    } else if (selectedPattern !== null) {
      setSelectedPattern(null);
    }
  };

  // Get a few random reconnection tips to suggest
  const getRandomTips = () => {
    return reconnectionTips
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  };
  
  const selectedPatternData = selectedPattern !== null 
    ? commonPatterns.find(p => p.id === selectedPattern)
    : null;
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        {(selectedPattern !== null || isShowingTips) && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        {isShowingTips ? (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
              Reconnection Tips
            </h2>
            
            <p className="text-gray-700 mb-6">
              Try one of these activities together to help rebuild connection:
            </p>
            
            <ul className="space-y-4 mb-6">
              {getRandomTips().map(tip => (
                <li key={tip.id} className="bg-soft-cream/20 p-4 rounded-lg">
                  <p className="text-gray-800">{tip.text}</p>
                  <p className="text-sm text-gray-500 mt-1 capitalize">
                    {tip.category} connection
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : selectedPattern !== null && selectedPatternData ? (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
              {selectedPatternData.name}
            </h2>
            
            <p className="text-gray-700 mb-6">
              {selectedPatternData.description}
            </p>
            
            <div className="mb-6">
              <h3 className="font-medium text-mauve-rose mb-2">Common Examples:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {selectedPatternData.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium text-mauve-rose mb-2">Breaking the Pattern:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {selectedPatternData.breakingTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <Button
              className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white w-full"
              onClick={handleShowReconnectionTips}
            >
              Show me reconnection activities
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6 text-center">
              Identify Your Pattern
            </h2>
            
            <p className="text-gray-700 mb-8 text-center">
              Which of these patterns feels most familiar in your relationship? 
              Identifying your pattern is the first step to breaking it.
            </p>
            
            <div className="space-y-4">
              {commonPatterns.map(pattern => (
                <button
                  key={pattern.id}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-soft-cream/20 transition-colors"
                  onClick={() => handlePatternSelect(pattern.id)}
                >
                  <h3 className="font-medium text-mauve-rose">{pattern.name}</h3>
                  <p className="text-gray-600 mt-1">{pattern.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternRecognitionFlow;
