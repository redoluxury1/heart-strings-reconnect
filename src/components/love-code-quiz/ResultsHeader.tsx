
import React from 'react';
import { Check, Users, HelpingHand, Gift, Hand } from 'lucide-react';
import { LoveCodeDescription, LoveCode } from '../../types/love-code-quiz';
import { DownloadOptionsMenu } from './DownloadOptionsMenu';
import PDFDownloadButton from './PDFDownloadButton';
import { LoveCodeResult } from '../../types/love-code-quiz';

interface ResultsHeaderProps {
  results: LoveCodeResult;
  primaryDesc: LoveCodeDescription;
  handleSendToEmail: () => void;
}

// Function to get the appropriate icon based on the love code
const getLoveCodeIcon = (code: LoveCode) => {
  switch (code) {
    case 'affirm':
      return <Check className="h-12 w-12 text-mauve-rose" />;
    case 'together':
      return <Users className="h-12 w-12 text-mauve-rose" />;
    case 'support':
      return <HelpingHand className="h-12 w-12 text-mauve-rose" />;
    case 'uplift':
      return <Gift className="h-12 w-12 text-mauve-rose" />;
    case 'touch':
      return <Hand className="h-12 w-12 text-mauve-rose" />;
    default:
      return <Check className="h-12 w-12 text-mauve-rose" />;
  }
};

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  results,
  primaryDesc,
  handleSendToEmail,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Replace heart icon with love code specific icon */}
      {getLoveCodeIcon(results.primaryCode)}
      
      <DownloadOptionsMenu 
        handlePdfDownload={() => {
          const downloadBtn = document.getElementById('pdf-download-button');
          if (downloadBtn) downloadBtn.click();
        }}
        handleSendToEmail={handleSendToEmail}
      />
      
      {/* Hidden button for PDF download functionality */}
      <div className="hidden">
        <PDFDownloadButton id="pdf-download-button" results={results} />
      </div>
    </div>
  );
};

export default ResultsHeader;
