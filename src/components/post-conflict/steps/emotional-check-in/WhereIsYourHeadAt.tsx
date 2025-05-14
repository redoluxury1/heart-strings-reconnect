
import React from 'react';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { useToast } from '@/hooks/use-toast';
import { emotionCategories } from './data/emotionCategoriesData';
import EmotionCategory from './EmotionCategory';
import CustomEmotionsList from './CustomEmotionsList';
import CustomEmotionInput from './CustomEmotionInput';
import { useEmotionSelection } from './hooks/useEmotionSelection';
import EmotionHeader from './components/EmotionHeader';
import NavigationButtons from './components/NavigationButtons';
import EmotionsCounter from './components/EmotionsCounter';
import EmotionsContainer from './components/EmotionsContainer';

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
    <EmotionsContainer>
      <EmotionHeader />
      
      <EmotionsCounter count={selectedEmotions.length} maxCount={5} />

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

      <NavigationButtons onNext={handleNext} onBack={handleBack} />
    </EmotionsContainer>
  );
};

export default WhereIsYourHeadAt;
