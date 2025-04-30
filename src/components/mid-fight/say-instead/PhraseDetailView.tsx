import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, MessageCircle, BookmarkPlus, Journal } from 'lucide-react';
import { SayInsteadPhrase } from '@/types/say-instead';
import AlternativeOption from './AlternativeOption';
import { useToast } from '@/hooks/use-toast';
import CustomizePhraseView from '../CustomizePhraseView';
import ConversationDialog from '../ConversationDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

interface PhraseDetailViewProps {
  phrase: SayInsteadPhrase;
  onBack: () => void;
}

const PhraseDetailView: React.FC<PhraseDetailViewProps> = ({ phrase, onBack }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customPhrase, setCustomPhrase] = useState('');
  const [showWhyItWorks, setShowWhyItWorks] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCustomize = (alternative: string) => {
    setCustomPhrase(alternative);
    setIsCustomizing(true);
  };

  const handleSaveToLibrary = (text: string) => {
    // This would connect to a database in a real implementation
    // Save the custom phrase along with the original phrase
    const savedEntry = {
      originalPhrase: phrase.original,
      customPhrase: text,
      dateSaved: new Date().toISOString(),
      isFavorite: false
    };
    
    // In a real app, we would store this in a database
    // For now, we can just show the confirmation dialog
    setShowSaveConfirmation(true);
  };

  const handleStartConversation = () => {
    // Open the conversation dialog
    setIsDialogOpen(true);
  };

  const handleGoToJournal = () => {
    // Close the confirmation dialog
    setShowSaveConfirmation(false);
    
    // Navigate to journal page (would be implemented in a real app)
    // For now, we'll just show a toast message
    toast({
      title: "Journal feature",
      description: "The journal feature will be implemented in a future update.",
    });
    
    // This would navigate to the journal page in a real implementation
    // navigate('/journal');
  };

  if (isCustomizing) {
    return (
      <>
        <CustomizePhraseView 
          customPhrase={customPhrase}
          onCustomPhraseChange={setCustomPhrase}
          onBackToTopics={() => setIsCustomizing(false)}
          onStartConversation={handleStartConversation}
          onSaveToLibrary={() => handleSaveToLibrary(customPhrase)}
          showSaveOption={true}
          isFromSayThisInstead={true}
        />
        
        <ConversationDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          partnerName="Partner"
          onSendInvite={() => {}}
        />
        
        {/* Save Confirmation Dialog */}
        <Dialog open={showSaveConfirmation} onOpenChange={setShowSaveConfirmation}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center font-cormorant text-midnight-indigo text-xl">
                You're changing the way you communicate
              </DialogTitle>
              <DialogDescription className="text-center">
                —one rephrase at a time.
                <br />
                This message just got saved to your Journal for future you to come back to.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button 
                onClick={handleGoToJournal}
                className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
              >
                <Journal className="h-4 w-4 mr-1" />
                Go to My Journal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="bg-soft-blush/30 p-4 rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-lg text-midnight-indigo">"{phrase.original}"</h4>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack} 
          className="text-xs text-lavender-blue hover:text-lavender-blue/80"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to list
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {phrase.categories.map((category, index) => (
          <Badge key={index} variant="outline" className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20">
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="space-y-3 mb-3">
        <p className="font-medium text-midnight-indigo">Say this instead:</p>
        {phrase.alternatives.map((alternative, index) => (
          <AlternativeOption 
            key={index} 
            alternative={alternative}
            onCustomize={() => handleCustomize(alternative)}
            onSaveToLibrary={() => handleSaveToLibrary(alternative)}
          />
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-lavender-blue justify-center"
          onClick={() => setShowWhyItWorks(!showWhyItWorks)}
        >
          {showWhyItWorks ? "Hide explanation" : "Why this works"}
        </Button>
      </div>
      
      {showWhyItWorks && (
        <div className="bg-white/70 p-3 rounded-lg mt-2">
          <p className="text-sm text-midnight-indigo/80">
            <span className="font-medium">Why this works:</span> {phrase.whyItWorks}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhraseDetailView;
