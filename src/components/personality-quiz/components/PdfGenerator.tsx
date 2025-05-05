
import React from 'react';
import { usePDF } from 'react-to-pdf';
import { toast } from '@/hooks/use-toast';
import { QuizResult } from '@/types/personality-quiz';

interface PdfGeneratorProps {
  results: QuizResult;
  children: (download: () => void) => React.ReactNode;
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ results, children }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `personality-type-${results.primaryType}.pdf`,
  });
  
  const handleDownload = async () => {
    try {
      toPDF();
      toast({
        title: "Success!",
        description: "Your Personality Blueprint results have been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was a problem downloading your results. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <div ref={targetRef} className="pdf-content">
        {/* PDF content will be captured from here */}
      </div>
      {children(handleDownload)}
    </div>
  );
};

export default PdfGenerator;
