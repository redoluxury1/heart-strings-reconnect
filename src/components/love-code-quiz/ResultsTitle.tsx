
import React from 'react';
import { LoveCodeDescription } from '../../types/love-code-quiz';

interface ResultsTitleProps {
  primaryDesc: LoveCodeDescription;
}

const ResultsTitle: React.FC<ResultsTitleProps> = ({ primaryDesc }) => {
  return (
    <h1 className="text-3xl md:text-4xl font-heading-now-medium font-medium text-midnight-indigo text-center mb-4">
      Your Love Code is <span className="text-mauve-rose font-semibold block text-4xl md:text-5xl mt-2">{primaryDesc.title}!</span>
    </h1>
  );
};

export default ResultsTitle;
