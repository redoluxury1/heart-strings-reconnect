
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Crown } from 'lucide-react';
import { QuizResult } from '@/types/personality-quiz';
import DownloadResultsMenu from './DownloadResultsMenu';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { SubscriptionUpgradeModal } from '@/components/subscription/SubscriptionUpgradeModal';

interface ActionButtonsProps {
  results: QuizResult;
  onDownloadPdf: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ results, onDownloadPdf }) => {
  const { hasActiveSubscription } = useFeatureAccess();
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);

  const handlePartnerInvite = () => {
    if (!hasActiveSubscription) {
      setShowUpgradeModal(true);
      return;
    }
    // For now, just log
    console.log('Invite partner flow would start here');
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <DownloadResultsMenu results={results} onDownloadPdf={onDownloadPdf} />
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
        <h3 className="text-xl font-medium text-midnight-indigo mb-3">
          Continue Your Relationship Journey
        </h3>
        <p className="text-midnight-indigo/70 mb-6 max-w-2xl mx-auto">
          Deepen your connection by inviting your partner to take the quiz.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={handlePartnerInvite}
            className="bg-lavender-blue hover:bg-lavender-blue/90 text-white flex items-center gap-2"
          >
            {!hasActiveSubscription && <Crown className="h-4 w-4" />}
            <UserPlus className="h-4 w-4" />
            {hasActiveSubscription ? 'Invite Your Partner' : 'Upgrade to Invite Partner'}
          </Button>
        </div>
        
        {!hasActiveSubscription && (
          <p className="text-xs text-gray-500 mt-2">
            Premium feature - Partner sync and advanced insights
          </p>
        )}
      </div>
      
      <SubscriptionUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
};

export default ActionButtons;
