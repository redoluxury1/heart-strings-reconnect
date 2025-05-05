
import React from 'react';
import { Heart } from 'lucide-react';
import { LoveCodeDescription } from '../../types/love-code-quiz';
import { DownloadOptionsMenu } from './DownloadOptionsMenu';
import PDFDownloadButton from './PDFDownloadButton';
import { LoveCodeResult } from '../../types/love-code-quiz';

interface ResultsHeaderProps {
  results: LoveCodeResult;
  primaryDesc: LoveCodeDescription;
  handleSendToEmail: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  results,
  primaryDesc,
  handleSendToEmail,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Heart className="h-12 w-12 text-mauve-rose" />
      
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
