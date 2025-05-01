
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import { toast } from '@/hooks/use-toast';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';

interface PDFDownloadButtonProps {
  results: LoveCodeResult;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ results }) => {
  const primaryDesc = loveCodeDescriptions[results.primaryCode];
  const { toPDF, targetRef } = usePDF({
    filename: `love-code-${primaryDesc.title.replace(/\s+/g, '-').toLowerCase()}.pdf`,
  });
  
  const handleDownload = async () => {
    try {
      toPDF();
      toast({
        title: "Success!",
        description: "Your Love Code results have been downloaded.",
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
    <Button 
      variant="outline" 
      className="border-mauve-rose bg-white text-mauve-rose hover:bg-mauve-rose/10 font-medium flex items-center gap-2" 
      onClick={handleDownload}
    >
      <Download size={16} />
      Download Results
    </Button>
  );
};

export default PDFDownloadButton;
