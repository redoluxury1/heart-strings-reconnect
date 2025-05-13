
import React, { useState, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { useToast } from '@/hooks/use-toast';

interface YourPerspectiveProps {
  onBack?: () => void;
  onComplete?: (perspective: string) => void;
}

const YourPerspective: React.FC<YourPerspectiveProps> = ({ onBack, onComplete }) => {
  const { toast } = useToast();
  const { setCurrentStep } = useSession();
  const [perspective, setPerspective] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sentence starter options
  const sentenceStarters = [
    "I felt like you misunderstood me when...",
    "I got really frustrated because...",
    "I didn't feel like I could explain myself...",
    "I shut down because I felt...",
    "What I was trying to say was..."
  ];

  // Handle clicking on a sentence starter chip
  const handleStarterClick = (starter: string) => {
    setPerspective(starter);
    // Focus the textarea after selecting a starter
    if (textareaRef.current) {
      textareaRef.current.focus();
      
      // Position cursor at the end of the text
      const length = starter.length;
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 10);
    }
  };

  // Handle form submission
  const handleNext = () => {
    if (!perspective.trim()) {
      toast({
        title: "Empty perspective",
        description: "Please share your perspective before continuing.",
      });
      return;
    }

    if (onComplete) {
      onComplete(perspective);
    }
    
    // Move to the next step
    setCurrentStep(4);
  };

  // Go back to the previous screen
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    setCurrentStep(2);
  };

  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <MessageSquare className="h-7 w-7 text-[#D3876A]" />
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
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {sentenceStarters.map((starter, index) => (
            <button
              key={index}
              onClick={() => handleStarterClick(starter)}
              className="rounded-full px-4 py-2 text-sm bg-[#F8F5F3] border border-[#D9B9AF] text-[#3A3A3A] hover:bg-[#F8F5F3]/80 transition-colors"
            >
              {starter.substring(0, 20)}...
            </button>
          ))}
        </div>

        {/* Text input area */}
        <div className="w-full mb-6">
          <Textarea
            ref={textareaRef}
            value={perspective}
            onChange={(e) => setPerspective(e.target.value)}
            placeholder="Write it out here in your own words..."
            className="min-h-[150px] p-4 bg-[#FAF6F4] border-[#D9B9AF] rounded-xl text-[#3A3A3A] focus:ring-[#D3876A] focus:border-[#D3876A]"
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex w-full justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
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
    </div>
  );
};

export default YourPerspective;
