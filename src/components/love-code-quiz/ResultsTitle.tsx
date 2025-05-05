
import React from 'react';
import { LoveCodeDescription } from '../../types/love-code-quiz';

interface ResultsTitleProps {
  primaryDesc: LoveCodeDescription;
}

// This component has been modified to not display any title text
// as per the requirements to remove "Your love code is..." text
const ResultsTitle: React.FC<ResultsTitleProps> = () => {
  // Return empty fragment as we're removing this text
  return <></>;
};

export default ResultsTitle;
