
import React, { useState } from 'react';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';
import { moreLoveCodeDescriptions } from '../../data/love-code-quiz/more-love-code-descriptions';
import { toast } from '@/hooks/use-toast';

// Component imports
import LoveCodeChart from './LoveCodeChart';
import PrimaryLoveCode from './PrimaryLoveCode';
import SecondaryLoveCode from './SecondaryLoveCode';
import HowYouLoveSection from './HowYouLoveSection';
import PartnerInviteSection from './PartnerInviteSection';
import ActionButtons from './ActionButtons';
import PartnerInvite from './PartnerInvite';
import ResultsHeader from './ResultsHeader';
import ResultsTitle from './ResultsTitle';
import HomeButton from './HomeButton';

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
      {/* Results container - removed background and shadow */}
      <div className="p-6 md:p-10 rounded-xl results-container">
        {/* Results Header with Download Options */}
        <ResultsHeader 
          results={results}
          primaryDesc={primaryDesc}
          handleSendToEmail={handleSendToEmail}
        />
        
        {/* Results Title */}
        <ResultsTitle primaryDesc={primaryDesc} />
        
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
        
        {/* Action Buttons - Only Home button */}
        <HomeButton onHome={onHome} />
      </div>
      
      {/* Partner Invite Modal */}
      <PartnerInvite isOpen={isInviteOpen} onClose={closeInviteModal} />
    </div>
  );
};

export default QuizResults;
