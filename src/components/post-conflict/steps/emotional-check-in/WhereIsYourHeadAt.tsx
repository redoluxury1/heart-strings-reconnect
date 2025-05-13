
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { useToast } from '@/hooks/use-toast';
import { emotionCategories } from './data/emotionCategoriesData';
import EmotionCategory from './EmotionCategory';
import CustomEmotionsList from './CustomEmotionsList';
import CustomEmotionInput from './CustomEmotionInput';
import { useEmotionSelection } from './hooks/useEmotionSelection';

interface WhereIsYourHeadAtProps {
  onComplete?: () => void;
  onBack?: () => void;
}

const WhereIsYourHeadAt: React.FC<WhereIsYourHeadAtProps> = ({ onComplete, onBack }) => {
  const { toast } = useToast();
  const { setCurrentStep } = useSession();
  const { 
    selectedEmotions, 
    customEmotions,
    handleEmotionToggle,
    handleAddCustomEmotion,
    isMaxSelectionsReached
  } = useEmotionSelection(5);

  const handleNext = () => {
    if (selectedEmotions.length === 0) {
      toast({
        title: "Select at least one emotion",
        description: "Please select at least one emotion to continue.",
      });
      return;
    }

    // Here you would typically save the selected emotions to your state
    console.log("Selected emotions:", selectedEmotions);
    
    // Fixed: Now setting a fixed number instead of using a function
    setCurrentStep(3);
    
    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    setCurrentStep(1);
  };

  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <Heart className="h-7 w-7 text-[#D3876A] animate-gentle-pulse" />
        </div>

        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-3 text-center">
          Where's Your Head At?
        </h2>

        {/* Subheading */}
        <p className="text-center text-[#3A3A3A] mb-8">
          Emotions run deep—let's name what came up for you.
        </p>

        {/* Selected count */}
        <div className="text-sm text-[#555555] mb-6">
          Selected: {selectedEmotions.length}/5
        </div>

        {/* Emotion Categories */}
        <div className="w-full space-y-6">
          {emotionCategories.map((category) => (
            <EmotionCategory
              key={category.name}
              category={category.name}
              emotions={category.emotions.map(e => e.label)}
              selectedEmotions={selectedEmotions}
              onEmotionToggle={handleEmotionToggle}
            />
          ))}

          {/* Custom emotions section */}
          <CustomEmotionsList
            customEmotions={customEmotions}
            selectedEmotions={selectedEmotions}
            onEmotionToggle={handleEmotionToggle}
          />

          {/* Custom emotion input */}
          <CustomEmotionInput 
            onAddEmotion={handleAddCustomEmotion}
            disabled={isMaxSelectionsReached}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex w-full justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-[#D9B9AF] text-[#3A3A3A] hover:bg-[#F8F5F3]"
          >
            Back
          </Button>
          <Button
            className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full px-6"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhereIsYourHeadAt;
