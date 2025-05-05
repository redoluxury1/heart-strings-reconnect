
import React from 'react';
import { LoveCodeDescription } from '../../types/love-code-quiz';

interface SecondaryLoveCodeProps {
  secondaryDesc: LoveCodeDescription;
}

const SecondaryLoveCode: React.FC<SecondaryLoveCodeProps> = ({ secondaryDesc }) => {
  return (
    <div className="rounded-lg p-6 mb-8 border border-lavender-blue/20">
      <h2 className="text-xl font-cormorant font-medium text-midnight-indigo mb-3">
        Your Secondary Love Code: {secondaryDesc.title}
      </h2>
      <p className="text-midnight-indigo/80">
        {secondaryDesc.secondaryDescription || secondaryDesc.shortSummary}
      </p>
    </div>
  );
};

export default SecondaryLoveCode;
