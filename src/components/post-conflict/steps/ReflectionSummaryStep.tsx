
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell, 
  TableRow
} from '@/components/ui/table';

interface ReflectionSummaryStepProps {
  partner1Data: {
    perspective?: string;
    emotions?: string[];
    needs?: string;
    connection?: string;
  };
  partner2Data: {
    perspective?: string;
    emotions?: string[];
    needs?: string;
    connection?: string;
  };
  onContinue: () => void;
}

const ReflectionSummaryStep: React.FC<ReflectionSummaryStepProps> = ({ 
  partner1Data,
  partner2Data,
  onContinue
}) => {
  // Generate emotional insight based on the combined emotions
  const getEmotionalInsight = () => {
    const p1Emotions = partner1Data.emotions || [];
    const p2Emotions = partner2Data.emotions || [];
    
    // Check for specific emotion combinations
    if (p1Emotions.includes('rejected') && p2Emotions.includes('anxious')) {
      return "When one partner feels rejected and the other feels anxious, it can create a cycle of shutdown and misunderstanding. What you both need most might be clarity and emotional safety.";
    }
    
    if (p1Emotions.includes('hurt') && p2Emotions.includes('overwhelmed')) {
      return "When hurt meets overwhelm, it's often a sign that you both care deeply but are processing differently. Creating space for both experiences can help you reconnect.";
    }
    
    if (p1Emotions.includes('frustrated') && p2Emotions.includes('misunderstood')) {
      return "Frustration paired with feeling misunderstood often reveals a communication pattern where both of you want to connect but are missing each other's signals.";
    }
    
    if (p1Emotions.includes('anger') && p2Emotions.includes('fear')) {
      return "When anger meets fear in a relationship, it often signals different protective responses to feeling vulnerable. Beneath both emotions is usually a desire for safety.";
    }
    
    // Default insight if no specific combination matches
    return "Your emotions reflect how much you care about each other and this relationship. Different emotional responses don't mean incompatibility—they're opportunities to understand each other more deeply.";
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-4 text-center">
        Your Conversation Summary
      </h2>
      
      <p className="text-center text-gray-700 mb-8">
        Here's what you both shared during this conversation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Perspective Section */}
        <div className="bg-soft-blush/20 p-5 rounded-lg">
          <h3 className="font-medium mb-3 text-midnight-indigo">What happened (your perspective):</h3>
          <p className="text-gray-700">{partner1Data.perspective || "Not shared"}</p>
        </div>
        
        <div className="bg-soft-cream/30 p-5 rounded-lg">
          <h3 className="font-medium mb-3 text-midnight-indigo">What happened (their perspective):</h3>
          <p className="text-gray-700">{partner2Data.perspective || "Not shared"}</p>
        </div>
        
        {/* Emotions Section */}
        <div className="bg-soft-blush/20 p-5 rounded-lg">
          <h3 className="font-medium mb-3 text-midnight-indigo">Emotions you felt:</h3>
          <div className="flex flex-wrap gap-2">
            {partner1Data.emotions && partner1Data.emotions.length > 0 ? (
              partner1Data.emotions.map(emotion => (
                <span
                  key={emotion}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {emotion}
                </span>
              ))
            ) : (
              <span className="text-gray-700">Not shared</span>
            )}
          </div>
        </div>
        
        <div className="bg-soft-cream/30 p-5 rounded-lg">
          <h3 className="font-medium mb-3 text-midnight-indigo">Emotions they felt:</h3>
          <div className="flex flex-wrap gap-2">
            {partner2Data.emotions && partner2Data.emotions.length > 0 ? (
              partner2Data.emotions.map(emotion => (
                <span
                  key={emotion}
                  className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                >
                  {emotion}
                </span>
              ))
            ) : (
              <span className="text-gray-700">Not shared</span>
            )}
          </div>
        </div>
        
        {/* Needs Section */}
        <div className="bg-soft-blush/20 p-5 rounded-lg">
          <h3 className="font-medium mb-3 text-midnight-indigo">What you need:</h3>
          <p className="text-gray-700">{partner1Data.needs || "Not shared"}</p>
        </div>
        
        <div className="bg-soft-cream/30 p-5 rounded-lg">
          <h3 className="font-medium mb-3 text-midnight-indigo">What they need:</h3>
          <p className="text-gray-700">{partner2Data.needs || "Not shared"}</p>
        </div>
        
        {/* Appreciated Section */}
        <div className="bg-soft-blush/20 p-5 rounded-lg">
          <h3 className="font-medium mb-3 text-midnight-indigo">What you appreciate:</h3>
          <p className="text-gray-700">{partner1Data.connection || "Not shared"}</p>
        </div>
        
        <div className="bg-soft-cream/30 p-5 rounded-lg">
          <h3 className="font-medium mb-3 text-midnight-indigo">What they appreciate:</h3>
          <p className="text-gray-700">{partner2Data.connection || "Not shared"}</p>
        </div>
      </div>
      
      {/* Emotional Insight Section */}
      <div className="mb-10 p-6 bg-midnight-indigo/10 rounded-lg">
        <h3 className="font-medium mb-3 text-midnight-indigo text-center">
          Here's what your emotions might be telling you...
        </h3>
        <p className="text-center text-gray-700 italic">
          {getEmotionalInsight()}
        </p>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={onContinue}
          className="bg-mauve-rose hover:bg-mauve-rose/90 text-white flex items-center gap-2"
        >
          Continue to next steps
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ReflectionSummaryStep;
