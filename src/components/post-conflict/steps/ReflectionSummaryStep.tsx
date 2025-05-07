
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { Card, CardContent } from '@/components/ui/card';

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
  const { sessionData } = useSession();
  const partnerReady = sessionData.partner2.ready;
  
  // If partner hasn't completed the process yet
  if (!partnerReady) {
    return (
      <div className="text-center py-6">
        <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-4">
          You've completed your part
        </h2>
        
        <div className="bg-lavender-blue/10 rounded-lg p-5 mb-6 max-w-md mx-auto">
          <p className="text-midnight-indigo">
            Hang tight! We'll notify you when your partner finishes.
          </p>
        </div>
        
        <Button
          onClick={onContinue}
          className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
        >
          See what's next
        </Button>
      </div>
    );
  }

  // If both partners have completed the process
  return (
    <div className="max-w-2xl mx-auto pb-4 pt-1 px-4">
      <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-[#2e2a63] mb-1 text-center">
        You Made It Through
      </h2>
      
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/d0beec82-b078-47d6-a0db-29d862922ab2.png" 
          alt="Couple moving forward together" 
          className="h-40 object-contain" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Card className="shadow-sm border-0 overflow-hidden rounded-xl bg-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-[#2e2a63] mb-2">You Said</h3>
            <p className="text-gray-700">
              {partner1Data.perspective || "You took time to reflect."}
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-0 overflow-hidden rounded-xl bg-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-[#2e2a63] mb-2">They Said</h3>
            <p className="text-gray-700">
              {partner2Data.perspective || "Waiting for partner's perspective."}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-0 overflow-hidden rounded-xl bg-white mb-5">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-[#2e2a63] mb-2">Emotions That Came Up</h3>
          <div className="flex flex-wrap gap-2">
            {partner1Data.emotions && partner1Data.emotions.length > 0 ? (
              partner1Data.emotions.map(emotion => (
                <span
                  key={emotion}
                  className="bg-[#7b4b69] text-white px-3 py-1 rounded-full text-sm"
                >
                  {emotion}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No emotions shared</span>
            )}
            
            {partner2Data.emotions && partner2Data.emotions.length > 0 && (
              partner2Data.emotions.map(emotion => (
                <span
                  key={`partner-${emotion}`}
                  className="bg-[#E5DEFF] text-[#483D8B] px-3 py-1 rounded-full text-sm"
                >
                  {emotion}
                </span>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-0 overflow-hidden rounded-xl bg-white mb-5">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-[#2e2a63] mb-2">Repair Statements</h3>
          <p className="text-gray-700">
            {partner1Data.connection || "I appreciate when you..."}
          </p>
          
          {partner2Data.connection && (
            <>
              <div className="my-2 border-t border-gray-100"></div>
              <p className="text-gray-700">
                {partner2Data.connection}
              </p>
            </>
          )}
        </CardContent>
      </Card>
      
      <div className="mb-6 p-4 bg-[#f9f5ff] rounded-xl border border-[#e5deff] text-center">
        <p className="text-gray-700">
          This conversation helped uncover needs and emotions. You don't have to be perfect—you just have to keep trying.
        </p>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={onContinue}
          className="bg-[#2e2a63] hover:bg-[#1e1a43] text-white flex items-center gap-2 rounded-full px-6"
        >
          Continue
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ReflectionSummaryStep;
