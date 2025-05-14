
import React from 'react';
import SpeechToTextInput from '@/components/common/SpeechToTextInput';
import ToneToolHeader from './ToneToolHeader';
import { Button } from '@/components/ui/button';

interface CustomizeIntentViewProps {
  intentText: string;
  onIntentTextChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomizeIntentView: React.FC<CustomizeIntentViewProps> = ({
  intentText,
  onIntentTextChange,
  onNext,
  onBack
}) => {
  return (
    <div className="flex flex-col items-center">
      <ToneToolHeader 
        title="Make It Yours" 
        subtitle="Personalize your intention in your own words."
      />
      
      {/* Customization textarea */}
      <div className="w-full mb-6">
        <SpeechToTextInput
          value={intentText}
          onChange={onIntentTextChange}
          placeholder="Edit your intention..."
          className="w-full rounded-lg bg-[#F5F2F0] border-[#D9B9AF] p-4 text-[#2C2C2C]"
          minHeight="120px"
        />
      </div>
      
      {/* Actions */}
      <div className="flex flex-col w-full mt-4">
        <Button 
          className="rounded-full bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white font-medium py-3 px-6 w-full"
          onClick={onNext}
          disabled={!intentText.trim()}
        >
          Next
        </Button>
        
        <Button
          variant="outline"
          className="rounded-full mt-3 border-[#D3876A] text-[#D3876A] hover:bg-[#D3876A]/10"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default CustomizeIntentView;
