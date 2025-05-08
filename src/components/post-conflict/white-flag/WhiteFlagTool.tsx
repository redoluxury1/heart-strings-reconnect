
import React, { useState } from 'react';
import { Flag as FlagIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { flagTypes, FlagType } from '@/data/white-flag-data';
import { Button } from '@/components/ui/button';
import FlagTypeCard from './FlagTypeCard';
import MessagesSelector from './MessagesSelector';
import SendConfirmationDialog from './SendConfirmationDialog';

const WhiteFlagTool = () => {
  const [selectedFlagType, setSelectedFlagType] = useState<FlagType | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [step, setStep] = useState<'select-flag' | 'select-message'>('select-flag');
  const { toast } = useToast();

  const handleSelectFlag = (flagType: FlagType) => {
    setSelectedFlagType(flagType);
    setSelectedMessage('');
    setCustomMessage('');
    setStep('select-message');
  };

  const handleSaveAsFavorite = () => {
    if (!customMessage) {
      toast({
        title: "No message selected",
        description: "Please select or write a message first.",
      });
      return;
    }
    
    toast({
      title: "Saved to favorites",
      description: "This message has been saved to your favorites.",
    });
  };

  const handleBack = () => {
    setStep('select-flag');
    setSelectedMessage('');
    setCustomMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === 'select-flag' ? (
        <>
          <div className="text-center mb-6">
            <div className="bg-[#f8f5f0] inline-block p-4 rounded-xl mb-4">
              <FlagIcon className="h-10 w-10 text-[#2e2a63]" />
            </div>
            <h2 className="text-3xl font-cormorant font-medium text-[#2e2a63] mb-2">
              Wave the White Flag
            </h2>
            <p className="text-[#1A1F2C] mb-6">
              A way to pause, reset, or say "I'm not OK"—without making it worse.
            </p>
            <h3 className="text-xl font-medium text-[#2e2a63] mb-4">
              What kind of flag do you need to send right now?
            </h3>
          </div>
    
          <div className="space-y-2 mb-6">
            {flagTypes.map((flagType) => (
              <FlagTypeCard 
                key={flagType.id}
                flagType={flagType} 
                isSelected={selectedFlagType?.id === flagType.id}
                onClick={() => handleSelectFlag(flagType)}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <button 
            onClick={handleBack} 
            className="text-[#2e2a63] flex items-center mb-4 hover:underline"
          >
            &larr; Back to flag types
          </button>
          
          <div className="text-center mb-4">
            <h2 className="text-2xl font-cormorant font-medium text-[#2e2a63] mb-2">
              {selectedFlagType?.title}
            </h2>
          </div>
          
          {selectedFlagType && (
            <>
              <MessagesSelector 
                flagType={selectedFlagType}
                onSelect={setSelectedMessage}
                onCustomChange={setCustomMessage}
                customMessage={customMessage}
              />
              
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <SendConfirmationDialog message={customMessage || selectedMessage} />
                <Button 
                  variant="outline" 
                  className="border-[#c06b6b] text-[#c06b6b]"
                  onClick={handleSaveAsFavorite}
                >
                  Save as Favorite
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WhiteFlagTool;
