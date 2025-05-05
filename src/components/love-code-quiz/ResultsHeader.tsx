
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
  const isAffirm = results.primaryCode === 'affirm';
  const isUplift = results.primaryCode === 'uplift';
  const isTogether = results.primaryCode === 'together';
  const isSupport = results.primaryCode === 'support';
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
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
      
      {/* Display the Affirm image only for the Affirm love code */}
      {isAffirm && (
        <div className="mt-6">
          <img 
            src="/public/lovable-uploads/b1b66aa9-d1a2-4ac8-b1b7-652da0124b00.png" 
            alt="Affirm: Encouraging words" 
            className="w-full max-w-md mx-auto"
          />
        </div>
      )}

      {/* Display the Gifts image only for the Uplift love code */}
      {isUplift && (
        <div className="mt-6">
          <img 
            src="/public/lovable-uploads/12d63ddf-c8d1-4e6d-b780-c6ffcfdfd9bf.png" 
            alt="Gifts: Receiving thoughtful gifts" 
            className="w-full max-w-md mx-auto"
          />
        </div>
      )}

      {/* Display the Together image only for the Together love code */}
      {isTogether && (
        <div className="mt-6">
          <img 
            src="/public/lovable-uploads/a3c24522-77b0-46a3-a528-f7db596ba104.png" 
            alt="Together: Spending quality time" 
            className="w-full max-w-md mx-auto"
          />
        </div>
      )}

      {/* Display the Support image only for the Support love code */}
      {isSupport && (
        <div className="mt-6">
          <img 
            src="/public/lovable-uploads/ce863750-c674-4a5b-86ab-eb34017f3513.png" 
            alt="Support: Helping out" 
            className="w-full max-w-md mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ResultsHeader;
