
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SentenceStarterChips from './SentenceStarterChips';
import { sentenceStarters } from '../data/sentenceStartersData';
import { usePerspectiveInput } from '../hooks/usePerspectiveInput';
import SpeechToTextInput from '@/components/common/SpeechToTextInput';

interface PerspectiveFormProps {
  onBack: () => void;
  onSubmit: (perspective: string) => void;
}

const PerspectiveForm: React.FC<PerspectiveFormProps> = ({ onBack, onSubmit }) => {
  const {
    perspective,
    setPerspective,
    textareaRef,
    handleStarterClick,
    validatePerspective,
    selectedStarter
  } = usePerspectiveInput();

  const handleNext = () => {
    if (validatePerspective()) {
      onSubmit(perspective);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
        <MessageSquare className="h-7 w-7 text-[#D3876A] animate-pulse" />
      </div>

      {/* Header */}
      <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-3 text-center">
        What happened from your perspective?
      </h2>

      {/* Subheading */}
      <p className="text-center text-[#3A3A3A] mb-8">
        Take a moment to share how it felt for you—no pressure to get it perfect.
      </p>

      {/* Sentence starter chips */}
      <SentenceStarterChips 
        starters={sentenceStarters} 
        onStarterClick={handleStarterClick}
        selectedStarter={selectedStarter}
      />

      {/* Text input area with speech-to-text */}
      <div className="w-full mb-6">
        <SpeechToTextInput
          value={perspective}
          onChange={setPerspective}
          placeholder="Write it out here in your own words..."
          className="min-h-[150px] p-4 bg-[#FAF6F4] border-[#D9B9AF] rounded-xl text-[#3A3A3A] focus:ring-[#D3876A] focus:border-[#D3876A]"
          minHeight="150px"
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex w-full justify-between items-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-[#D9B9AF] text-[#3A3A3A] hover:bg-[#F8F5F3]"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full px-6"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PerspectiveForm;
