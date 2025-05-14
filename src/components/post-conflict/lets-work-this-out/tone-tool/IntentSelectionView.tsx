
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import SpeechToTextInput from '@/components/common/SpeechToTextInput';
import ToneToolHeader from './ToneToolHeader';
import { intentOptions } from './intent-options';
import { Button } from '@/components/ui/button';

interface IntentSelectionViewProps {
  selectedIntent: string | null;
  customIntent: string;
  intentText: string;
  onSelectIntent: (id: string) => void;
  onCustomIntentChange: (value: string) => void;
  onIntentTextChange: (value: string) => void;
  onContinue: () => void;
  onBack?: () => void;
}

const IntentSelectionView: React.FC<IntentSelectionViewProps> = ({
  selectedIntent,
  customIntent,
  intentText,
  onSelectIntent,
  onCustomIntentChange,
  onIntentTextChange,
  onContinue,
  onBack
}) => {
  const isNextDisabled = !selectedIntent || (selectedIntent === 'custom' && !customIntent.trim());

  return (
    <div className="flex flex-col items-center">
      <ToneToolHeader 
        title="Setting the Tone" 
        subtitle="What's one thing you want to keep in mind while talking this through?"
      />
      
      {/* Intent options */}
      <div className="flex flex-col w-full space-y-3 mb-6">
        {intentOptions.map((option) => (
          <button
            key={option.id}
            className={cn(
              "rounded-full border border-[#D3876A] py-2.5 px-5 text-center transition-colors",
              selectedIntent === option.id
                ? "bg-[#D3876A] text-white"
                : "bg-transparent text-[#2C2C2C] hover:bg-[#D3876A]/10"
            )}
            onClick={() => onSelectIntent(option.id)}
          >
            {option.text}
          </button>
        ))}
        
        {/* Custom option */}
        <button
          className={cn(
            "rounded-full border border-[#D3876A] py-2.5 px-5 text-center transition-colors",
            selectedIntent === 'custom'
              ? "bg-[#D3876A] text-white"
              : "bg-transparent text-[#2C2C2C] hover:bg-[#D3876A]/10"
          )}
          onClick={() => onSelectIntent('custom')}
        >
          Write your own...
        </button>
        
        {/* Custom input field (only shown when custom is selected) */}
        {selectedIntent === 'custom' && (
          <SpeechToTextInput
            value={customIntent}
            onChange={onCustomIntentChange}
            placeholder="Enter your intention..."
            className="rounded-full bg-[#F5F2F0] border-[#D9B9AF] px-5 py-3 mt-3"
            minHeight="60px"
          />
        )}
      </div>
      
      {/* Actions */}
      <div className="flex flex-col w-full mt-4">
        <Button 
          className="rounded-full bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white font-medium py-3 px-6 w-full"
          onClick={onContinue}
          disabled={isNextDisabled}
        >
          Continue
        </Button>
        
        {onBack && (
          <Button
            variant="outline"
            className="rounded-full mt-3 border-[#D3876A] text-[#D3876A] hover:bg-[#D3876A]/10"
            onClick={onBack}
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default IntentSelectionView;
