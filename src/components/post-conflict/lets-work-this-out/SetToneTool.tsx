
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import SpeechToTextInput from '@/components/common/SpeechToTextInput';

interface IntentOption {
  id: string;
  text: string;
}

const intentOptions: IntentOption[] = [
  { id: 'together', text: 'I want us to work together to…' },
  { id: 'team', text: 'We\'re on the same team. Let\'s…' },
  { id: 'listen', text: 'I\'m open and willing to listen.' },
  { id: 'not-fight', text: 'I\'m here to listen, not fight.' },
  { id: 'care', text: 'I care about you, even if I\'m upset…' },
];

interface SetToneToolProps {
  onComplete?: (selectedIntent: string) => void;
  onBack?: () => void;
}

const SetToneTool: React.FC<SetToneToolProps> = ({ onComplete, onBack }) => {
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
  
  const isNextDisabled = !selectedIntent || (selectedIntent === 'custom' && !customIntent.trim());
  
  // Selection view - user picks an intent
  if (viewState === 'select') {
    return (
      <div className="bg-[#FDFBF9] rounded-xl border border-[#D7B4A8] shadow-sm p-6 max-w-xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-[#D3876A]" />
          </div>
          
          {/* Header */}
          <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-4 text-center">
            Setting the Tone
          </h2>
          
          {/* Subheading */}
          <p className="text-center text-[#3A3A3A] leading-[1.6] mb-8">
            What's one thing you want to keep in mind while talking this through?
          </p>
          
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
                onClick={() => handleSelectIntent(option.id)}
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
              onClick={() => handleSelectIntent('custom')}
            >
              Write your own...
            </button>
            
            {/* Custom input field (only shown when custom is selected) */}
            {selectedIntent === 'custom' && (
              <SpeechToTextInput
                value={customIntent}
                onChange={handleCustomIntentChange}
                placeholder="Enter your intention..."
                className="rounded-full bg-[#F5F2F0] border-[#D9B9AF] px-5 py-3 mt-3"
                minHeight="60px"
              />
            )}
          </div>
          
          {/* Text display area for selected intent */}
          {selectedIntent && selectedIntent !== 'custom' && (
            <div className="w-full mb-6">
              <SpeechToTextInput
                value={intentText}
                onChange={handleIntentTextChange}
                placeholder="Edit your intention..."
                className="w-full rounded-lg bg-[#F5F2F0] border-[#D9B9AF] p-4 text-[#2C2C2C]"
                minHeight="80px"
              />
            </div>
          )}
          
          {/* Actions */}
          <div className="flex flex-col w-full mt-4">
            <Button 
              className="rounded-full bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white font-medium py-3 px-6 w-full"
              onClick={handleContinueToCustomize}
              disabled={isNextDisabled}
            >
              Continue
            </Button>
            
            {onBack && (
              <Button
                variant="outline"
                className="rounded-full mt-3 border-[#D3876A] text-[#D3876A] hover:bg-[#D3876A]/10"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Customize view - user can edit their selection
  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#D7B4A8] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <Heart className="h-8 w-8 text-[#D3876A]" />
        </div>
        
        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-4 text-center">
          Make It Yours
        </h2>
        
        {/* Subheading */}
        <p className="text-center text-[#3A3A3A] leading-[1.6] mb-8">
          Personalize your intention in your own words.
        </p>
        
        {/* Customization textarea */}
        <div className="w-full mb-6">
          <SpeechToTextInput
            value={intentText}
            onChange={setIntentText}
            placeholder="Edit your intention..."
            className="w-full rounded-lg bg-[#F5F2F0] border-[#D9B9AF] p-4 text-[#2C2C2C]"
            minHeight="120px"
          />
        </div>
        
        {/* Actions */}
        <div className="flex flex-col w-full mt-4">
          <Button 
            className="rounded-full bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white font-medium py-3 px-6 w-full"
            onClick={handleNext}
            disabled={!intentText.trim()}
          >
            Next
          </Button>
          
          <Button
            variant="outline"
            className="rounded-full mt-3 border-[#D3876A] text-[#D3876A] hover:bg-[#D3876A]/10"
            onClick={handleBack}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetToneTool;
