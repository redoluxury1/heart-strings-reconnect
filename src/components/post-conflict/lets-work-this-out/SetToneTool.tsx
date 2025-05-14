
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import IntentSelectionView from './tone-tool/IntentSelectionView';
import CustomizeIntentView from './tone-tool/CustomizeIntentView';
import { intentOptions } from './tone-tool/intent-options';

interface SetToneToolProps {
  onComplete?: (selectedIntent: string) => void;
  onBack?: () => void;
}

const SetToneTool: React.FC<SetToneToolProps> = ({ onComplete, onBack }) => {
  const { toast } = useToast();
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [customIntent, setCustomIntent] = useState<string>('');
  const [intentText, setIntentText] = useState<string>('');
  const [viewState, setViewState] = useState<'select' | 'customize'>('select');
  
  const handleSelectIntent = (intentId: string) => {
    const previouslySelected = selectedIntent === intentId;
    
    // Clear the selection if already selected
    if (previouslySelected) {
      setSelectedIntent(null);
      setIntentText('');
      return;
    }
    
    setSelectedIntent(intentId);
    
    // Set the text in the input field based on selection
    if (intentId === 'custom') {
      setIntentText(customIntent);
    } else {
      const selectedOption = intentOptions.find(option => option.id === intentId);
      if (selectedOption) {
        setIntentText(selectedOption.text);
      }
    }
  };
  
  const handleCustomIntentChange = (value: string) => {
    setCustomIntent(value);
    if (selectedIntent === 'custom') {
      setIntentText(value);
    }
  };
  
  const handleIntentTextChange = (value: string) => {
    setIntentText(value);
  };
  
  const handleContinueToCustomize = () => {
    setViewState('customize');
    if (selectedIntent === 'custom') {
      setIntentText(customIntent);
    } else {
      const selectedOption = intentOptions.find(option => option.id === selectedIntent);
      setIntentText(selectedOption?.text || '');
    }
  };
  
  const handleNext = () => {
    if (onComplete) {
      onComplete(intentText);
    }
  };

  const handleBack = () => {
    if (viewState === 'customize') {
      setViewState('select');
    } else if (onBack) {
      onBack();
    }
  };
  
  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#D7B4A8] shadow-sm p-6 max-w-xl mx-auto">
      {viewState === 'select' ? (
        <IntentSelectionView 
          selectedIntent={selectedIntent}
          customIntent={customIntent}
          intentText={intentText}
          onSelectIntent={handleSelectIntent}
          onCustomIntentChange={handleCustomIntentChange}
          onIntentTextChange={handleIntentTextChange}
          onContinue={handleContinueToCustomize}
          onBack={onBack}
        />
      ) : (
        <CustomizeIntentView 
          intentText={intentText}
          onIntentTextChange={setIntentText}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default SetToneTool;
