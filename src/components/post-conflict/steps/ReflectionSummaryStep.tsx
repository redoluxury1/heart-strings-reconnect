
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { Card } from '@/components/ui/card';

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
      <div className="text-center py-8">
        <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
          You've completed your part
        </h2>
        
        <div className="bg-lavender-blue/10 rounded-lg p-6 mb-8 max-w-md mx-auto">
          <p className="text-midnight-indigo mb-4">
            Hang tight! We'll send you a notification when your partner has finished the discussion.
          </p>
          <p className="text-sm text-midnight-indigo/70 italic">
            In the meantime, try to do something calming or grounding.
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
    <div className="max-w-3xl mx-auto bg-[#fafaf8] pb-8 pt-2 px-4 md:px-6 rounded-xl">
      <h2 className="text-4xl md:text-5xl font-cormorant font-semibold text-[#2e2a63] mb-2 text-center">
        You Made It Through
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
        Here's what you both shared—and what matters most as you move forward.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6 mb-10 relative">
        <div className="flex-1">
          <Card className="h-full shadow-sm border-0 overflow-hidden rounded-2xl bg-white">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#2e2a63] mb-4">What You Shared</h3>
              <p className="text-gray-800 text-lg">
                {partner1Data.perspective || "You took time to reflect."}
              </p>
            </div>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card className="h-full shadow-sm border-0 overflow-hidden rounded-2xl bg-white">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#2e2a63] mb-4">What They Shared</h3>
              <p className="text-gray-800 text-lg">
                {partner2Data.perspective || "Your partner hasn't shared anything yet."}
              </p>
            </div>
          </Card>
        </div>
        
        <div className="absolute right-0 top-1/4 -z-10 hidden md:block">
          <img 
            src="/lovable-uploads/043c78c7-7c91-426b-a0c9-60030fd66d26.png" 
            alt="Couple walking together" 
            className="h-auto w-72" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="shadow-sm border-0 overflow-hidden rounded-2xl bg-white">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-[#2e2a63] mb-4">Emotions That Came Up</h3>
            <div className="flex flex-wrap gap-2">
              {partner1Data.emotions && partner1Data.emotions.length > 0 ? (
                partner1Data.emotions.map(emotion => (
                  <span
                    key={emotion}
                    className="bg-[#FFF8C2] text-[#5a5343] px-5 py-2 rounded-full text-base"
                  >
                    {emotion}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No emotions shared</span>
              )}
              
              {partner2Data.emotions && partner2Data.emotions.length > 0 && (
                partner2Data.emotions.map(emotion => (
                  <span
                    key={`partner-${emotion}`}
                    className="bg-[#FFE9C2] text-[#5a4a33] px-5 py-2 rounded-full text-base"
                  >
                    {emotion}
                  </span>
                ))
              )}
            </div>
          </div>
        </Card>
        
        <Card className="shadow-sm border-0 overflow-hidden rounded-2xl bg-white">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-[#2e2a63] mb-4">Repair Statements</h3>
            <p className="text-gray-800 text-lg">
              {partner1Data.connection || "I appreciate when you..."}
            </p>
            
            {partner2Data.connection && (
              <>
                <div className="my-2 border-t border-gray-100"></div>
                <p className="text-gray-800 text-lg">
                  {partner2Data.connection}
                </p>
              </>
            )}
          </div>
        </Card>
      </div>
      
      {/* Emotional Insight Section */}
      <div className="mb-10 p-6 bg-[#f9f5ff] rounded-2xl border border-[#e5deff]">
        <p className="text-center text-gray-700 text-lg">
          This conversation helped uncover needs, emotions, and care. You don't have to be perfect to stay connected—you just have to keep trying.
        </p>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={() => {
            onContinue();
            // Smooth scroll to the "Okay But Now What" section
            const element = document.getElementById("okay-but-now-what");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="bg-[#2e2a63] hover:bg-[#1e1a43] text-white flex items-center gap-2 rounded-full px-6"
        >
          Continue to next steps
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ReflectionSummaryStep;
