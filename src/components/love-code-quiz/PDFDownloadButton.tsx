
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { generatePDF } from 'react-to-pdf';
import { toast } from '@/hooks/use-toast';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';

interface PDFDownloadButtonProps {
  results: LoveCodeResult;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ results }) => {
  const primaryDesc = loveCodeDescriptions[results.primaryCode];
  const secondaryDesc = loveCodeDescriptions[results.secondaryCode];
  
  const handleDownload = async () => {
    try {
      // Target the results content for PDF generation
      const options = {
        filename: `love-code-${primaryDesc.title.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        page: { 
          margin: 20,
          format: 'letter',
          orientation: 'portrait'
        }
      };
      
      // Get the element with class .results-container
      const element = document.querySelector('.results-container');
      
      if (element) {
        await generatePDF(() => element, options);
        toast({
          title: "Success!",
          description: "Your Love Code results have been downloaded.",
        });
      } else {
        throw new Error("Could not find results container element");
      }
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
