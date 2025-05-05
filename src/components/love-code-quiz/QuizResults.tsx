import React, { useState } from 'react';
import { Heart, Download, Mail } from 'lucide-react';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';
import { moreLoveCodeDescriptions } from '../../data/love-code-quiz/more-love-code-descriptions';
import LoveCodeChart from './LoveCodeChart';
import PrimaryLoveCode from './PrimaryLoveCode';
import SecondaryLoveCode from './SecondaryLoveCode';
import HowYouLoveSection from './HowYouLoveSection';
import PartnerInviteSection from './PartnerInviteSection';
import ActionButtons from './ActionButtons';
import PartnerInvite from './PartnerInvite';
import PDFDownloadButton from './PDFDownloadButton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface QuizResultsProps {
  results: LoveCodeResult;
  onRestart: () => void;
  onHome: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results, onHome }) => {
  const allDescriptions = { ...loveCodeDescriptions, ...moreLoveCodeDescriptions };
  const primaryDesc = allDescriptions[results.primaryCode];
  const secondaryDesc = allDescriptions[results.secondaryCode];
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  
  const openInviteModal = () => setIsInviteOpen(true);
  const closeInviteModal = () => setIsInviteOpen(false);
  
  const handleSendToEmail = () => {
    // In a real implementation, this would open an email modal
    toast({
      title: "Email Feature",
      description: "This would send the results to your email.",
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md results-container">
        <div className="flex justify-between items-center mb-6">
          <Heart className="h-12 w-12 text-mauve-rose" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="border-mauve-rose bg-white text-mauve-rose hover:bg-mauve-rose/10 font-medium flex items-center gap-2"
              >
                <Download size={16} />
                Download Results
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                // Use existing PDFDownloadButton functionality
                const downloadBtn = document.getElementById('pdf-download-button');
                if (downloadBtn) downloadBtn.click();
              }}>
                <Download className="mr-2 h-4 w-4" />
                <span>Save as PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSendToEmail}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Send to Email</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Hidden button for PDF download functionality */}
          <div className="hidden">
            <PDFDownloadButton id="pdf-download-button" results={results} />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-heading-now-medium font-medium text-midnight-indigo text-center mb-4">
          Your Love Code is <span className="text-mauve-rose font-semibold block text-4xl md:text-5xl mt-2">{primaryDesc.title}!</span>
        </h1>
        
        {/* Chart Section */}
        <LoveCodeChart results={results} />
        
        {/* Primary Love Code */}
        <PrimaryLoveCode primaryDesc={primaryDesc} />
        
        {/* Secondary Love Code */}
        <SecondaryLoveCode secondaryDesc={secondaryDesc} />
        
        {/* How You Love Others Section */}
        <HowYouLoveSection primaryDesc={primaryDesc} />
        
        {/* Partner Invite Section */}
        <PartnerInviteSection onOpenInvite={openInviteModal} />
        
        {/* Action Buttons - Remove Restart, keep Home */}
        <div className="mt-10 flex justify-center">
          <Button 
            variant="outline" 
            onClick={onHome}
            className="border-midnight-indigo text-midnight-indigo"
          >
            Back to Home
          </Button>
        </div>
      </div>
      
      {/* Partner Invite Modal */}
      <PartnerInvite isOpen={isInviteOpen} onClose={closeInviteModal} />
    </div>
  );
};

export default QuizResults;
