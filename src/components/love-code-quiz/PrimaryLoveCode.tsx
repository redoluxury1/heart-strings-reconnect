
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LoveCodeDescription } from '../../types/love-code-quiz';

interface PrimaryLoveCodeProps {
  primaryDesc: LoveCodeDescription;
}

const PrimaryLoveCode: React.FC<PrimaryLoveCodeProps> = ({ primaryDesc }) => {
  const [showDetailedDescription, setShowDetailedDescription] = useState(false);

  return (
    <div className="border-t border-b border-lavender-blue/20 py-8 mb-8">
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-mauve-rose mb-4">
        Your Primary Love Code: {primaryDesc.title}
      </h2>
      
      <div className="space-y-6 text-midnight-indigo/80">
        <div>
          <h3 className="font-medium text-midnight-indigo mb-2">Emotional Core:</h3>
          <p>{primaryDesc.emotionalCore}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-midnight-indigo mb-2">How You Feel Loved:</h3>
          <p>{primaryDesc.howYouFeelLoved}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-midnight-indigo mb-2">Often Misread:</h3>
          <p>{primaryDesc.oftenMisread}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-midnight-indigo mb-2">Growth Tips:</h3>
          <p>{primaryDesc.growthTips}</p>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4 border-lavender-blue/30 text-midnight-indigo flex items-center justify-center"
          onClick={() => setShowDetailedDescription(!showDetailedDescription)}
        >
          {showDetailedDescription ? 'Show Less' : 'Read Detailed Description'} 
          {showDetailedDescription ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
        
        {showDetailedDescription && (
          <div className="mt-6 space-y-6 p-6 bg-soft-blush/20 rounded-lg">
            <div>
              <h3 className="font-medium text-midnight-indigo mb-2">1. Emotional Core – Why {primaryDesc.title} Matter to You</h3>
              <p className="whitespace-pre-line">
                {primaryDesc.detailedDescription?.emotionalCore || "Detailed description coming soon."}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-midnight-indigo mb-2">2. How You Feel Most Loved</h3>
              <p className="whitespace-pre-line">
                {primaryDesc.detailedDescription?.howYouFeelLoved || "Detailed description coming soon."}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-midnight-indigo mb-2">3. How This Can Be Misread</h3>
              <p className="whitespace-pre-line">
                {primaryDesc.detailedDescription?.oftenMisread || "Detailed description coming soon."}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-midnight-indigo mb-2">4. Relational Growth Tips</h3>
              <p className="whitespace-pre-line">
                {primaryDesc.detailedDescription?.relationalGrowthTips || "Detailed description coming soon."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryLoveCode;
