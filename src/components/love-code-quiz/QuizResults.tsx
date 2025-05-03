
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';
import LoveCodeChart from './LoveCodeChart';
import PrimaryLoveCode from './PrimaryLoveCode';
import SecondaryLoveCode from './SecondaryLoveCode';
import HowYouLoveSection from './HowYouLoveSection';
import PartnerInviteSection from './PartnerInviteSection';
import ActionButtons from './ActionButtons';
import PartnerInvite from './PartnerInvite';
import PDFDownloadButton from './PDFDownloadButton';

interface QuizResultsProps {
  results: LoveCodeResult;
  onRestart: () => void;
  onHome: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results, onRestart, onHome }) => {
  const primaryDesc = loveCodeDescriptions[results.primaryCode];
  const secondaryDesc = loveCodeDescriptions[results.secondaryCode];
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  
  const openInviteModal = () => setIsInviteOpen(true);
  const closeInviteModal = () => setIsInviteOpen(false);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md results-container">
        <div className="flex justify-between items-center mb-6">
          <Heart className="h-12 w-12 text-mauve-rose" />
          <PDFDownloadButton results={results} />
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
        
        {/* Action Buttons */}
        <ActionButtons onHome={onHome} onRestart={onRestart} />
      </div>
      
      {/* Partner Invite Modal */}
      <PartnerInvite isOpen={isInviteOpen} onClose={closeInviteModal} />
    </div>
  );
};

export default QuizResults;
