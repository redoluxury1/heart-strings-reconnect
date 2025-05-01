
import React from 'react';
import { LoveCodeDescription } from '../../types/love-code-quiz';

interface HowYouLoveSectionProps {
  primaryDesc: LoveCodeDescription;
}

const HowYouLoveSection: React.FC<HowYouLoveSectionProps> = ({ primaryDesc }) => {
  const getExpressionText = (title: string): string => {
    if (title === "Loving Words") return "verbally affirm them";
    if (title === "Thoughtful Gestures") return "surprise them with thoughtful gestures";
    if (title === "Intentional Time") return "give them your undivided attention";
    if (title === "Helpful Actions") return "support them through helpful actions";
    return "connect with them physically";
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-cormorant font-medium text-midnight-indigo mb-4">
        How You Love Others
      </h2>
      <p className="text-midnight-indigo/80 mb-4">
        You naturally tend to express love through {primaryDesc.title.toLowerCase()}. When you care about someone, 
        your instinct is to {getExpressionText(primaryDesc.title)}.
      </p>
      <p className="text-midnight-indigo/80">
        Understanding that others may have different Love Codes can help you express your care in ways they'll 
        most deeply appreciate. Consider adapting your natural style when loving someone whose primary Code differs from yours.
      </p>
    </div>
  );
};

export default HowYouLoveSection;
